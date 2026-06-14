-- SamuraCare Database Schema
-- Run this on your Hostinger phpMyAdmin or via mysql CLI

CREATE DATABASE IF NOT EXISTS samuracare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE samuracare;

-- ===== Users =====
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===== Articles =====
CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content LONGTEXT,
  image VARCHAR(500),
  category VARCHAR(100),
  author VARCHAR(100),
  date VARCHAR(50),
  readTime VARCHAR(50),
  tags TEXT,
  featured TINYINT(1) DEFAULT 0,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===== Guide Categories =====
CREATE TABLE IF NOT EXISTS guide_categories (
  id VARCHAR(50) PRIMARY KEY,
  titleAr VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  icon VARCHAR(100),
  descriptionAr TEXT,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- ===== Guide Entries =====
CREATE TABLE IF NOT EXISTS guide_entries (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(255),
  categoryId VARCHAR(50),
  nameAr VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  benefits TEXT,
  uses TEXT,
  scientificName VARCHAR(255),
  image VARCHAR(500),
  sort_order INT DEFAULT 0,
  INDEX idx_category (categoryId)
);

-- ===== Custom Pages =====
CREATE TABLE IF NOT EXISTS pages (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  content LONGTEXT,
  image VARCHAR(500),
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===== Settings (key-value store for homepage, about, seo, etc.) =====
CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) PRIMARY KEY,
  `value` LONGTEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);