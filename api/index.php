<?php
/**
 * SamuraCare REST API
 *
 * Handles all CRUD operations and authentication.
 * All requests return JSON responses.
 */

require_once __DIR__ . '/db.php';

// CORS headers for React SPA
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Only POST method is allowed', 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['action'])) {
    errorResponse('Missing action parameter');
}

$action = $input['action'];
$db = getDB();

// ─── AUTH ──────────────────────────────────────────────

if ($action === 'login') {
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($username) || empty($password)) {
        errorResponse('Username and password are required');
    }

    $stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        errorResponse('Invalid username or password', 401);
    }

    // Regenerate session ID for security
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['logged_in'] = true;

    jsonResponse([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
        ]
    ]);
}

if ($action === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    jsonResponse(['success' => true]);
}

if ($action === 'checkAuth') {
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        jsonResponse([
            'authenticated' => true,
            'user' => [
                'id' => (int)$_SESSION['user_id'],
                'username' => $_SESSION['username'],
                'role' => $_SESSION['role'],
            ]
        ]);
    }
    // Return 200 with authenticated:false (not 401) so the frontend can detect unauthenticated state cleanly
    jsonResponse(['authenticated' => false]);
}

// ─── ALL ROUTES BELOW REQUIRE AUTH ─────────────────────

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    errorResponse('Authentication required', 401);
}

// ─── CONTENT ────────────────────────────────────────────

if ($action === 'getAll') {
    $stmt = $db->query("SELECT content_key, content_value FROM content");
    $rows = $stmt->fetchAll();
    $data = [];
    foreach ($rows as $row) {
        $data[$row['content_key']] = json_decode($row['content_value'], true);
    }

    // Ensure defaults for missing keys
    $defaults = ['homepage', 'about', 'articlesPage', 'guidePage', 'seo', 'pages', 'articles', 'guideCategories', 'guideEntries'];
    foreach ($defaults as $key) {
        if (!isset($data[$key])) {
            $data[$key] = ($key === 'pages' || $key === 'articles' || $key === 'guideEntries' || $key === 'guideCategories') ? [] : [];
        }
    }

    jsonResponse($data);
}

if ($action === 'saveContent') {
    $key = $input['key'] ?? '';
    $value = $input['value'] ?? null;

    if (empty($key) || $value === null) {
        errorResponse('Missing key or value');
    }

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([$key, json_encode($value, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true, 'key' => $key]);
}

// ─── ARTICLES (helper: stored in content table under 'articles' key) ──

if ($action === 'saveArticle') {
    $article = $input['article'] ?? null;
    if (!$article || !isset($article['id'])) {
        errorResponse('Invalid article data');
    }

    $stmt = $db->prepare("SELECT content_value FROM content WHERE content_key = 'articles'");
    $stmt->execute();
    $row = $stmt->fetch();
    $articles = $row ? json_decode($row['content_value'], true) : [];

    // Update or add
    $found = false;
    foreach ($articles as &$a) {
        if ($a['id'] == $article['id']) {
            $a = $article;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $articles[] = $article;
    }

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES ('articles', ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([json_encode($articles, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true]);
}

if ($action === 'deleteArticle') {
    $id = $input['id'] ?? null;
    if (!$id) errorResponse('Missing article id');

    $stmt = $db->prepare("SELECT content_value FROM content WHERE content_key = 'articles'");
    $stmt->execute();
    $row = $stmt->fetch();
    if (!$row) errorResponse('No articles found');

    $articles = json_decode($row['content_value'], true);
    $articles = array_values(array_filter($articles, fn($a) => $a['id'] != $id));

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES ('articles', ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([json_encode($articles, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true]);
}

// ─── GUIDE ENTRIES ──────────────────────────────────────

if ($action === 'saveGuideEntry') {
    $entry = $input['entry'] ?? null;
    if (!$entry || !isset($entry['id'])) {
        errorResponse('Invalid guide entry data');
    }

    $stmt = $db->prepare("SELECT content_value FROM content WHERE content_key = 'guideEntries'");
    $stmt->execute();
    $row = $stmt->fetch();
    $entries = $row ? json_decode($row['content_value'], true) : [];

    $found = false;
    foreach ($entries as &$e) {
        if ($e['id'] == $entry['id']) {
            $e = $entry;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $entries[] = $entry;
    }

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES ('guideEntries', ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([json_encode($entries, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true]);
}

if ($action === 'deleteGuideEntry') {
    $id = $input['id'] ?? null;
    if (!$id) errorResponse('Missing entry id');

    $stmt = $db->prepare("SELECT content_value FROM content WHERE content_key = 'guideEntries'");
    $stmt->execute();
    $row = $stmt->fetch();
    if (!$row) errorResponse('No entries found');

    $entries = json_decode($row['content_value'], true);
    $entries = array_values(array_filter($entries, fn($e) => $e['id'] != $id));

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES ('guideEntries', ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([json_encode($entries, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true]);
}

// ─── GUIDE CATEGORIES ───────────────────────────────────

if ($action === 'saveCategory') {
    $cat = $input['category'] ?? null;
    if (!$cat || !isset($cat['id'])) {
        errorResponse('Invalid category data');
    }

    $stmt = $db->prepare("SELECT content_value FROM content WHERE content_key = 'guideCategories'");
    $stmt->execute();
    $row = $stmt->fetch();
    $cats = $row ? json_decode($row['content_value'], true) : [];

    $found = false;
    foreach ($cats as &$c) {
        if ($c['id'] == $cat['id']) {
            $c = $cat;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $cats[] = $cat;
    }

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES ('guideCategories', ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([json_encode($cats, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true]);
}

if ($action === 'deleteCategory') {
    $id = $input['id'] ?? null;
    if (!$id) errorResponse('Missing category id');

    $stmt = $db->prepare("SELECT content_value FROM content WHERE content_key = 'guideCategories'");
    $stmt->execute();
    $row = $stmt->fetch();
    if (!$row) errorResponse('No categories found');

    $cats = json_decode($row['content_value'], true);
    $cats = array_values(array_filter($cats, fn($c) => $c['id'] != $id));

    $stmt = $db->prepare("INSERT INTO content (content_key, content_value) VALUES ('guideCategories', ?)
        ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)");
    $stmt->execute([json_encode($cats, JSON_UNESCAPED_UNICODE)]);

    jsonResponse(['success' => true]);
}

// ─── USERS ───────────────────────────────────────────────

if ($action === 'getUsers') {
    $stmt = $db->query("SELECT id, username, role, created_at FROM users ORDER BY id ASC");
    jsonResponse($stmt->fetchAll());
}

if ($action === 'saveUser') {
    $userData = $input['user'] ?? null;
    if (!$userData || !isset($userData['username'])) {
        errorResponse('Invalid user data');
    }

    $id = $userData['id'] ?? null;
    $username = $userData['username'];
    $password = $userData['password'] ?? '';
    $role = $userData['role'] ?? 'admin';

    if ($id) {
        // Update existing
        if (!empty($password)) {
            $hash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $db->prepare("UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?");
            $stmt->execute([$username, $hash, $role, $id]);
        } else {
            $stmt = $db->prepare("UPDATE users SET username = ?, role = ? WHERE id = ?");
            $stmt->execute([$username, $role, $id]);
        }
    } else {
        // Create new
        if (empty($password)) errorResponse('Password is required for new users');
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
        $stmt->execute([$username, $hash, $role]);
    }

    jsonResponse(['success' => true, 'id' => $id ?: $db->lastInsertId()]);
}

if ($action === 'deleteUser') {
    $id = $input['id'] ?? null;
    if (!$id) errorResponse('Missing user id');

    // Prevent deleting your own account
    if ($id == $_SESSION['user_id']) {
        errorResponse('Cannot delete your own account');
    }

    $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(['success' => true]);
}

// ─── FILE UPLOAD ────────────────────────────────────────

if ($action === 'upload') {
    if (!isset($_FILES['file'])) {
        errorResponse('No file uploaded');
    }

    $file = $_FILES['file'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $maxSize = 5 * 1024 * 1024; // 5MB

    if (!in_array($file['type'], $allowedTypes)) {
        errorResponse('Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.');
    }

    if ($file['size'] > $maxSize) {
        errorResponse('File too large. Maximum size is 5MB.');
    }

    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Prevent directory traversal
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $safeExt = preg_replace('/[^a-zA-Z0-9]/', '', $ext);
    $filename = uniqid('img_') . '.' . $safeExt;
    $destPath = $uploadDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destPath)) {
        errorResponse('Failed to save uploaded file', 500);
    }

    // Return the URL path
    $baseUrl = rtrim((isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']), '/');
    jsonResponse([
        'success' => true,
        'url' => $baseUrl . '/uploads/' . $filename,
    ]);
}

// ─── FALLBACK ───────────────────────────────────────────

errorResponse('Unknown action: ' . $action);