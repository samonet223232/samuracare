import bcrypt from 'bcryptjs';
import pool from './db.js';
import { articles as defaultArticles } from '../src/data/articles.js';
import { guideCategories as defaultCategories, guideEntries as defaultEntries } from '../src/data/guide.js';

const defaultHomepage = {
  heroTitle: 'اكتشفي جمالاً طبيعياً،<br/>صُنع بعناية',
  heroSubtitle: 'موسوعة المكونات الطبيعية، أدلة الجمال، وعناية مصنوعة بالحب',
  heroImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80',
  trustBarText: 'طبيعي ١٠٠٪ • خالٍ من القسوة • مكوّنات نظيفة',
  aboutTitle: 'عناية بسيطة، مكوّنات حقيقية',
  aboutText: 'نؤمن بأن الجمال الحقيقي يبدأ بالمكونات الطبيعية النقية.',
  aboutImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80',
  aboutBadgeNumber: '+8',
  aboutBadgeText: 'سنوات في صياغة منتجات التجميل الطبيعي',
  stats: [
    { number: '٤٠+', label: 'مكوناً موثّقاً' },
    { number: '١٥+', label: 'مصدراً علمياً' },
    { number: '١٠٠٪', label: 'طبيعي وخالٍ من القسوة' },
  ],
  newsletterTitle: 'انضمي إلى مجتمع الجمال الطبيعي',
  newsletterText: 'أول من يعلم بكل جديد — مقالات، أدلة، واكتشافات.',
};

const defaultAbout = {
  heroTitle: 'جمال طبيعي بقلب عربي',
  heroSubtitle: 'موسوعة حيّة لكل ما يخص الجمال الطبيعي',
  heroImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80',
  mission: 'نحو عالمٍ تعرف فيه كل امرأة ما تضعه على بشرتها وشعرها.',
  values: [
    { title: 'الشفافية', description: 'لا أسرار، لا مبالغات. نشرح كل مكون بوضوح.' },
    { title: 'الجودة', description: 'نعتمد على معلومات علمية موثوقة ومصادر موثّقة.' },
    { title: 'التمكين', description: 'نمنحكِ المعرفة لتختاري بثقة.' },
    { title: 'البساطة', description: 'جمال فعّال لا يحتاج إلى تعقيد.' },
    { title: 'الطبيعة', description: 'نحتفي بقوة المكونات الطبيعية النقية.' },
  ],
  timeline: [
    { year: '٢٠٢٥', title: 'انطلاقة سامورا كير', text: 'بدأنا كمساحة مشاركة معرفة عن المكونات الطبيعية.' },
    { year: '٢٠٢٦', title: 'دليل صانعي الجمال', text: 'أطلقنا أول موسوعة شاملة لمكونات الجمال الطبيعي.' },
  ],
  ctaText: 'جاهزتان لاستكشاف الجمال الطبيعي معنا؟',
  ctaSubtext: 'انضمي إلى آلاف السيدات اللواتي يثقن بمعرفتنا.',
};

const defaultArticlesPage = {
  heroImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80',
  heroTitle: 'المقالات',
  heroSubtitle: 'موسوعة من المقالات التعليمية حول مكونات التجميل الطبيعية.',
};

const defaultGuidePage = {
  heroImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1400&q=80',
  heroTitle: 'دليل صانعي الجمال',
  heroSubtitle: 'موسوعة منسّقة لمكونات الجمال الطبيعي',
};

const defaultSEO = {
  siteTitle: 'SamuraCare | سامورا كير',
  siteDescription: 'موسوعة المكونات الطبيعية للعناية بالبشرة والشعر.',
  ogImage: '',
  twitterHandle: '',
  pageMeta: {},
};

export async function seedDatabase() {
  // Check if already seeded
  const [existing] = await pool.query('SELECT COUNT(*) AS cnt FROM users');
  if (existing[0].cnt > 0) {
    console.log('Database already contains data, skipping seed.');
    return;
  }

  console.log('Seeding database with default data...');

  // Insert default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await pool.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    ['admin', hashedPassword, 'admin']
  );

  // Insert articles
  for (const article of defaultArticles) {
    await pool.query(
      `INSERT INTO articles (id, title, slug, excerpt, content, image, category, author, date, readTime, tags, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(article.id), article.title, article.slug, article.excerpt,
        article.content, article.image, article.category || null,
        article.author || null, article.date || null, article.readTime || null,
        article.tags ? (Array.isArray(article.tags) ? JSON.stringify(article.tags) : article.tags) : null,
        article.featured ? 1 : 0,
      ]
    );
  }

  // Insert guide categories
  for (const cat of defaultCategories) {
    await pool.query(
      `INSERT INTO guide_categories (id, titleAr, title, icon, descriptionAr, description, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [cat.id, cat.titleAr, cat.title || null, cat.icon || null, cat.descriptionAr || null, cat.description || null, cat.sort_order || 0]
    );
  }

  // Insert guide entries
  for (const entry of defaultEntries) {
    await pool.query(
      `INSERT INTO guide_entries (id, slug, categoryId, nameAr, name, description, benefits, uses, scientificName, image, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.id, entry.slug || null, entry.categoryId || null,
        entry.nameAr, entry.name || null, entry.description || null,
        entry.benefits ? JSON.stringify(entry.benefits) : null,
        entry.uses ? JSON.stringify(entry.uses) : null,
        entry.scientificName || null, entry.image || null, entry.sort_order || 0,
      ]
    );
  }

  // Insert settings
  const settings = [
    ['homepage', JSON.stringify(defaultHomepage)],
    ['about', JSON.stringify(defaultAbout)],
    ['articlesPage', JSON.stringify(defaultArticlesPage)],
    ['guidePage', JSON.stringify(defaultGuidePage)],
    ['seo', JSON.stringify(defaultSEO)],
    ['maintenanceMode', 'false'],
  ];

  for (const [key, value] of settings) {
    await pool.query(
      'INSERT INTO settings (`key`, `value`) VALUES (?, ?)',
      [key, value]
    );
  }

  console.log('Database seeded successfully!');
  console.log('Default admin login: admin / admin123');
}