# SamuraCare — Hostinger Deployment Guide (Database Version)

## Overview
This version uses **PHP + MySQL** instead of localStorage. All articles, pages, users, and settings are stored in a database.

---

## Step 1: Download the Package
- The file is at: `/home/user/app/public/samuradeploy.tar.gz`
- Download it and extract on your computer

## Step 2: Create MySQL Database in Hostinger
1. Log in to **Hostinger hPanel**
2. Go to **MySQL Databases**
3. Create a new database:
   - Database name: `samuracare` (or any name you want)
   - Create a database user with a strong password
   - Save the credentials (host, database name, username, password)

## Step 3: Configure Database Credentials
1. Extract `samuradeploy.tar.gz`
2. Open **`api/db.php`** with a text editor
3. Update the credentials:
```php
define('DB_HOST', 'localhost');          // Usually 'localhost' on Hostinger
define('DB_NAME', 'u123456789_samuracare');  // Your Hostinger database name
define('DB_USER', 'u123456789_admin');       // Your Hostinger database user
define('DB_PASS', 'YourStrongPassword');     // Your database password
```

## Step 4: Upload Files to Hostinger
1. Connect via **FTP** (FileZilla or Hostinger's File Manager)
2. Upload all files to **`public_html/`**
   - If you already have files there, **backup your existing content first**, then overwrite all files
3. Make sure the folder structure looks like:
```
public_html/
├── index.html
├── .htaccess
├── assets/
├── api/
│   ├── db.php
│   ├── index.php
│   ├── init.php
│   └── uploads/
├── robots.txt
├── sitemap.xml
├── logo-full.png
├── logo-icon.png
└── logo-text.png
```

## Step 5: Initialize the Database
1. Visit in your browser: **`https://yourdomain.com/api/init.php`**
   - Replace `yourdomain.com` with your actual domain
2. You should see a success message with green checkmarks:
   - ✓ users table created
   - ✓ content table created
   - ✓ Default admin user created
   - ✓ Default content created
3. **IMMEDIATELY DELETE `api/init.php`** from your server after it runs!

## Step 6: Login to Admin Panel
1. Visit: **`https://yourdomain.com/admin`**
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. **Change the password immediately** via the Users section in the admin panel

## Step 7: Verify Everything Works
1. Check that the public pages load correctly
2. In the admin panel, verify:
   - Articles are loaded (imported from your previous localStorage data)
   - Pages are loaded
   - Users exist
   - SEO settings are available
3. Try creating a new article to verify database storage

---

## Important Notes

### 🔴 Security
- **DELETE** `api/init.php` after first run — it's a security risk to leave it
- Change the default password immediately
- The `api/db.php` contains database credentials — keep it secure
- All passwords are stored with **bcrypt** hashing

### 🟡 Existing Data Migration
- **Your old data in localStorage is NOT automatically migrated**
- The `init.php` script seeds default content
- If you have important data, I can create a migration tool to import your localStorage data

### 🟢 What Changed
| Feature | Before (localStorage) | After (Database) |
|---------|----------------------|------------------|
| Storage | Browser localStorage | MySQL Database |
| Auth    | Plain text passwords | bcrypt hashed passwords |
| Sessions| None | PHP session with secure cookies |
| Security| None | PDO prepared statements |
| Data persistence | Per-browser only | Server-wide |

### ⚪ Updating in the Future
When you make updates to this project:
1. Run `npx vite build` locally
2. Upload only: `index.html`, `assets/`, `.htaccess` from the new `dist/` folder
3. **Do NOT overwrite** `api/db.php` or `api/uploads/` (they have your live data)
4. You don't need to re-run `init.php` — the database already exists