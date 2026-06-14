<?php
/**
 * Database initialization script
 *
 * Run this ONCE after creating the MySQL database on Hostinger:
 * 1. Visit: https://yourdomain.com/api/init.php
 * 2. Then DELETE or password-protect this file for security
 */

require_once __DIR__ . '/db.php';

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    die('Use GET to run initialization.');
}

echo "<h1>SamuraCare Database Initialization</h1>";

try {
    $db = getDB();

    // Create tables
    $db->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "<p>✓ 'users' table created</p>";

    $db->exec("CREATE TABLE IF NOT EXISTS content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content_key VARCHAR(100) UNIQUE NOT NULL,
        content_value LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "<p>✓ 'content' table created</p>";

    // Seed default admin user (if not exists)
    $stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->execute(['admin']);
    if ($stmt->fetchColumn() == 0) {
        $hash = password_hash('admin123', PASSWORD_BCRYPT);
        $stmt = $db->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
        $stmt->execute(['admin', $hash, 'admin']);
        echo "<p>✓ Default admin user created (admin / admin123)</p>";
        echo "<p style='color:orange;'>⚠ Change the password immediately after first login!</p>";
    } else {
        echo "<p>✓ Admin user already exists</p>";
    }

    // Seed default content (if not exists)
    $defaults = [
        'homepage' => [
            'heroTitle' => 'اكتشفي جمالاً طبيعياً،<br/>صُنع بعناية',
            'heroSubtitle' => 'موسوعة المكونات الطبيعية، أدلة الجمال، وعناية مصنوعة بالحب — كل ما تحتاجينه لرحلة جمالكِ الطبيعية',
            'heroImage' => 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80',
            'trustBarText' => 'طبيعي ١٠٠٪ • خالٍ من القسوة • مكوّنات نظيفة',
            'aboutTitle' => 'عناية بسيطة، مكوّنات حقيقية',
            'aboutText' => 'نؤمن بأن الجمال الحقيقي يبدأ بالمكونات الطبيعية النقية.',
            'aboutImage' => 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80',
            'aboutBadgeNumber' => '+8',
            'aboutBadgeText' => 'سنوات في صياغة منتجات التجميل الطبيعي',
            'stats' => [
                ['number' => '٤٠+', 'label' => 'مكوناً موثّقاً'],
                ['number' => '١٥+', 'label' => 'مصدراً علمياً'],
                ['number' => '١٠٠٪', 'label' => 'طبيعي وخالٍ من القسوة'],
            ],
            'newsletterTitle' => 'انضمي إلى مجتمع الجمال الطبيعي',
            'newsletterText' => 'أول من يعلم بكل جديد — مقالات، أدلة، واكتشافات.',
        ],
        'about' => [
            'heroTitle' => 'جمال طبيعي بقلب عربي',
            'heroSubtitle' => 'موسوعة حيّة لكل ما يخص الجمال الطبيعي — مكونات، وصفات، ومعرفة.',
            'heroImage' => 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80',
            'mission' => 'نحو عالمٍ تعرف فيه كل امرأة ما تضعه على بشرتها وشعرها.',
        ],
        'articlesPage' => [
            'heroImage' => 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80',
            'heroTitle' => 'المقالات',
            'heroSubtitle' => 'موسوعة من المقالات التعليمية حول مكونات التجميل الطبيعية.',
        ],
        'guidePage' => [
            'heroImage' => 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1400&q=80',
            'heroTitle' => 'دليل صانعي الجمال',
            'heroSubtitle' => 'موسوعة منسّقة لمكونات الجمال الطبيعي — أصولها، فوائدها، وطرق استخدامها.',
        ],
        'seo' => [
            'siteTitle' => 'SamuraCare | سامورا كير',
            'siteDescription' => 'موسوعة المكونات الطبيعية للعناية بالبشرة والشعر. أدلة جمال، مقالات، ووصفات طبيعية.',
            'ogImage' => '',
            'twitterHandle' => '',
            'pageMeta' => [],
        ],
        'pages' => [],
        'maintenanceMode' => false,
    ];

    $stmt = $db->prepare("SELECT COUNT(*) FROM content WHERE content_key = ?");
    foreach ($defaults as $key => $value) {
        $stmt->execute([$key]);
        if ($stmt->fetchColumn() == 0) {
            $insert = $db->prepare("INSERT INTO content (content_key, content_value) VALUES (?, ?)");
            $insert->execute([$key, json_encode($value, JSON_UNESCAPED_UNICODE)]);
            echo "<p>✓ Default '{$key}' content created</p>";
        } else {
            echo "<p>• '{$key}' content already exists</p>";
        }
    }

    echo "<h2 style='color:green;'>✓ Initialization complete!</h2>";
    echo "<p><strong>Next steps:</strong></p>";
    echo "<ol>";
    echo "<li>Delete this file (<code>api/init.php</code>) from your server for security</li>";
    echo "<li>Configure <code>api/db.php</code> with your actual MySQL credentials</li>";
    echo "<li>Visit your admin panel at <code>/admin</code> and login with: <strong>admin / admin123</strong></li>";
    echo "</ol>";

} catch (Exception $e) {
    echo "<p style='color:red;'>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}