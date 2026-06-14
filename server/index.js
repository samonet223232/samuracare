import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from './config.js';
import pool from './db.js';
import { seedDatabase } from './seed.js';

const app = express();
app.use(express.json({ limit: '50mb' }));

// ─── AUTH MIDDLEWARE ──────────────────────────────────

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(auth.split(' ')[1], config.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ─── POST /api — main handler matching AdminContext's apiCall pattern ──

app.post('/api', async (req, res) => {
  try {
    const { action } = req.body;
    switch (action) {

      // ── Auth ───────────────────────────────────────
      case 'login': {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          config.JWT_SECRET,
          { expiresIn: config.JWT_EXPIRES_IN }
        );
        return res.json({
          success: true,
          user: { id: user.id, username: user.username, role: user.role },
          token,
        });
      }

      case 'logout': {
        return res.json({ success: true });
      }

      case 'checkAuth': {
        const auth = req.headers.authorization;
        if (!auth) return res.json({ authenticated: false });
        try {
          const decoded = jwt.verify(auth.split(' ')[1], config.JWT_SECRET);
          return res.json({
            authenticated: true,
            user: { id: decoded.id, username: decoded.username, role: decoded.role },
          });
        } catch {
          return res.json({ authenticated: false });
        }
      }

      // ── Content (getAll / saveContent) ────────────

      case 'getAll': {
        const [settings] = await pool.query('SELECT `key`, `value` FROM settings');
        const [articles] = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
        const [categories] = await pool.query('SELECT * FROM guide_categories ORDER BY sort_order');
        const [entries] = await pool.query('SELECT * FROM guide_entries ORDER BY sort_order');
        const [pages] = await pool.query('SELECT * FROM pages ORDER BY created_at DESC');

        const result = {
          articles,
          guideCategories: categories,
          guideEntries: entries,
          pages,
        };

        for (const s of settings) {
          try { result[s.key] = JSON.parse(s.value); } catch { result[s.key] = s.value; }
        }

        return res.json(result);
      }

      case 'saveContent': {
        const { key, value } = req.body;
        const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
        await pool.query(
          'INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)',
          [key, jsonValue]
        );
        return res.json({ success: true });
      }

      // ── Users ──────────────────────────────────────

      case 'getUsers': {
        const [rows] = await pool.query('SELECT id, username, role, created_at FROM users');
        return res.json(rows);
      }

      case 'saveUser': {
        const { id, username, password, role } = req.body.user;
        if (id) {
          if (password && password !== '') {
            const hashed = await bcrypt.hash(password, 10);
            await pool.query('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, hashed, role || 'admin', id]);
          } else {
            await pool.query('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role || 'admin', id]);
          }
        } else {
          const hashed = await bcrypt.hash(password || 'password123', 10);
          const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, role || 'admin']);
          return res.json({ success: true, id: result.insertId });
        }
        return res.json({ success: true });
      }

      case 'deleteUser': {
        await pool.query('DELETE FROM users WHERE id = ?', [req.body.id]);
        return res.json({ success: true });
      }

      // ── Articles ───────────────────────────────────

      case 'saveArticle': {
        const a = req.body.article;
        await pool.query(
          `INSERT INTO articles (id, title, slug, excerpt, content, image, category, author, date, readTime, tags, featured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             title=VALUES(title), slug=VALUES(slug), excerpt=VALUES(excerpt),
             content=VALUES(content), image=VALUES(image), category=VALUES(category),
             author=VALUES(author), date=VALUES(date), readTime=VALUES(readTime),
             tags=VALUES(tags), featured=VALUES(featured)`,
          [
            String(a.id), a.title, a.slug, a.excerpt || '',
            a.content || '', a.image || '', a.category || '',
            a.author || '', a.date || '', a.readTime || '',
            a.tags ? (Array.isArray(a.tags) ? JSON.stringify(a.tags) : a.tags) : null,
            a.featured ? 1 : 0,
          ]
        );
        return res.json({ success: true });
      }

      case 'deleteArticle': {
        await pool.query('DELETE FROM articles WHERE id = ?', [String(req.body.id)]);
        return res.json({ success: true });
      }

      // ── Guide Entries ──────────────────────────────

      case 'saveGuideEntry': {
        const e = req.body.entry;
        await pool.query(
          `INSERT INTO guide_entries (id, slug, categoryId, nameAr, name, description, benefits, uses, scientificName, image, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             slug=VALUES(slug), categoryId=VALUES(categoryId), nameAr=VALUES(nameAr),
             name=VALUES(name), description=VALUES(description), benefits=VALUES(benefits),
             uses=VALUES(uses), scientificName=VALUES(scientificName), image=VALUES(image),
             sort_order=VALUES(sort_order)`,
          [
            e.id, e.slug || '', e.categoryId || '',
            e.nameAr, e.name || '', e.description || '',
            e.benefits ? (Array.isArray(e.benefits) ? JSON.stringify(e.benefits) : e.benefits) : null,
            e.uses ? (Array.isArray(e.uses) ? JSON.stringify(e.uses) : e.uses) : null,
            e.scientificName || '', e.image || '', e.sort_order || 0,
          ]
        );
        return res.json({ success: true });
      }

      case 'deleteGuideEntry': {
        await pool.query('DELETE FROM guide_entries WHERE id = ?', [req.body.id]);
        return res.json({ success: true });
      }

      // ── Guide Categories ───────────────────────────

      case 'saveCategory': {
        const c = req.body.category;
        await pool.query(
          `INSERT INTO guide_categories (id, titleAr, title, icon, descriptionAr, description, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             titleAr=VALUES(titleAr), title=VALUES(title), icon=VALUES(icon),
             descriptionAr=VALUES(descriptionAr), description=VALUES(description),
             sort_order=VALUES(sort_order)`,
          [c.id, c.titleAr, c.title || '', c.icon || '', c.descriptionAr || '', c.description || '', c.sort_order || 0]
        );
        return res.json({ success: true });
      }

      case 'deleteCategory': {
        await pool.query('DELETE FROM guide_categories WHERE id = ?', [req.body.id]);
        return res.json({ success: true });
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// ─── Serve static files in production ────────────────
// In production, serve the Vite build from dist/
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Catch-all: serve index.html for SPA routing
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });
}

// ─── Start Server ────────────────────────────────────

async function start() {
  try {
    // Test DB connection
    await pool.query('SELECT 1');
    console.log('Database connected successfully.');

    // Auto-seed if tables are empty
    await seedDatabase();

    app.listen(config.PORT, () => {
      console.log(`Server running at http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();