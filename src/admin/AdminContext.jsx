import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { articles as defaultArticles } from '../data/articles';
import { guideCategories as defaultCategories, guideEntries as defaultEntries } from '../data/guide';

const API_URL = '/api/index.php';
const ADMIN_KEY = 'samura-admin-auth';

const defaultHomepage = {
  heroTitle: 'اكتشفي جمالاً طبيعياً،<br/>صُنع بعناية',
  heroSubtitle: 'موسوعة المكونات الطبيعية، أدلة الجمال، وعناية مصنوعة بالحب — كل ما تحتاجينه لرحلة جمالكِ الطبيعية',
  heroImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80',
  trustBarText: 'طبيعي ١٠٠٪ • خالٍ من القسوة • مكوّنات نظيفة',
  aboutTitle: 'عناية بسيطة، مكوّنات حقيقية',
  aboutText: 'نؤمن بأن الجمال الحقيقي يبدأ بالمكونات الطبيعية النقية. كل زيت، زبدة، ومستخلص في موقعنا تم اختياره بعناية بناءً على صفاته الطبيعية وفوائده المثبتة.',
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
  heroSubtitle: 'موسوعة حيّة لكل ما يخص الجمال الطبيعي — مكونات، وصفات، ومعرفة.',
  heroImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80',
  mission: 'نحو عالمٍ تعرف فيه كل امرأة ما تضعه على بشرتها وشعرها. نُبسّط علم المكونات الطبيعية لتكون العناية واعية، بسيطة، وجميلة.',
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
  heroSubtitle: 'موسوعة من المقالات التعليمية حول مكونات التجميل الطبيعية، العناية بالبشرة والشعر.',
};

const defaultGuidePage = {
  heroImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1400&q=80',
  heroTitle: 'دليل صانعي الجمال',
  heroSubtitle: 'موسوعة منسّقة لمكونات الجمال الطبيعي — أصولها، فوائدها، وطرق استخدامها.',
};

const defaultSEO = {
  siteTitle: 'SamuraCare | سامورا كير',
  siteDescription: 'موسوعة المكونات الطبيعية للعناية بالبشرة والشعر. أدلة جمال، مقالات، ووصفات طبيعية.',
  ogImage: '',
  twitterHandle: '',
  pageMeta: {},
};

const defaults = {
  articles: defaultArticles,
  guideCategories: defaultCategories,
  guideEntries: defaultEntries,
  homepage: defaultHomepage,
  about: defaultAbout,
  articlesPage: defaultArticlesPage,
  guidePage: defaultGuidePage,
  pages: [],
  seo: defaultSEO,
  maintenanceMode: false,
};

// ─── API HELPER ─────────────────────────────────────────

async function apiCall(action, extra = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...extra }),
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API request failed');
  return data;
}

// ─── LOCALSTORAGE FALLBACK ─────────────────────────────

const STORE_KEY = 'samura-content';
const USERS_KEY = 'samura-users';

function loadLocalStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveLocalStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function loadLocalUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [{ id: 1, username: 'admin', password: 'admin123', role: 'admin' }];
}

function saveLocalUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [data, setData] = useState(defaults);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(ADMIN_KEY) === 'true';
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  // ─── INIT: Load from API or localStorage ──────────────

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Try API first
        const check = await apiCall('checkAuth');
        if (check.authenticated) {
          setCurrentUser(check.user);
          setIsAuthenticated(true);
          sessionStorage.setItem(ADMIN_KEY, 'true');
        }

        const content = await apiCall('getAll');
        if (!cancelled) {
          setData(prev => ({
            ...prev,
            ...content,
            homepage: { ...prev.homepage, ...(content.homepage || {}) },
            about: { ...prev.about, ...(content.about || {}) },
            articlesPage: { ...prev.articlesPage, ...(content.articlesPage || {}) },
            guidePage: { ...prev.guidePage, ...(content.guidePage || {}) },
            seo: { ...prev.seo, ...(content.seo || {}) },
          }));
          setApiAvailable(true);
        }
      } catch {
        // API unavailable — fall back to localStorage
        const saved = loadLocalStore();
        if (saved && !cancelled) {
          setData(prev => ({
            ...prev,
            ...saved,
            homepage: { ...prev.homepage, ...(saved.homepage || {}) },
            about: { ...prev.about, ...(saved.about || {}) },
            articlesPage: { ...prev.articlesPage, ...(saved.articlesPage || {}) },
            guidePage: { ...prev.guidePage, ...(saved.guidePage || {}) },
            seo: { ...prev.seo, ...(saved.seo || {}) },
          }));
        }
        if (!cancelled) {
          setUsers(loadLocalUsers());
        }
      }

      if (!cancelled) setLoading(false);
    }

    init();
    return () => { cancelled = true; };
  }, []);

  // ─── FALLBACK PERSISTENCE ─────────────────────────────

  useEffect(() => {
    if (!apiAvailable) saveLocalStore(data);
  }, [data, apiAvailable]);

  useEffect(() => {
    if (!apiAvailable) saveLocalUsers(users);
  }, [users, apiAvailable]);

  // ─── API PERSISTENCE HELPERS ──────────────────────────

  const apiSave = useCallback((key, value) => {
    if (apiAvailable) {
      apiCall('saveContent', { key, value }).catch(() => {});
    }
  }, [apiAvailable]);

  // ─── AUTH ─────────────────────────────────────────────

  const login = useCallback(async (username, password) => {
    if (apiAvailable) {
      try {
        const res = await apiCall('login', { username, password });
        setCurrentUser(res.user);
        setIsAuthenticated(true);
        sessionStorage.setItem(ADMIN_KEY, 'true');
        sessionStorage.setItem('samura-current-user', JSON.stringify(res.user));
        return true;
      } catch {
        return false;
      }
    }

    // Fallback: localStorage auth
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_KEY, 'true');
      sessionStorage.setItem('samura-current-user', JSON.stringify(user));
      return true;
    }
    return false;
  }, [apiAvailable, users]);

  const logout = useCallback(() => {
    if (apiAvailable) {
      apiCall('logout').catch(() => {});
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem('samura-current-user');
  }, [apiAvailable]);

  // ─── RESET ────────────────────────────────────────────

  const resetData = useCallback(() => {
    setData(defaults);
    if (apiAvailable) {
      Object.entries(defaults).forEach(([key, value]) => {
        apiCall('saveContent', { key, value }).catch(() => {});
      });
    }
  }, [apiAvailable]);

  // ─── USERS ────────────────────────────────────────────

  const addUser = useCallback(async (userData) => {
    if (apiAvailable) {
      try {
        const res = await apiCall('saveUser', { user: { ...userData, id: Date.now() } });
        const fresh = await apiCall('getUsers');
        setUsers(fresh);
        return;
      } catch {}
    }
    setUsers(prev => [...prev, { ...userData, id: Date.now() }]);
  }, [apiAvailable]);

  const updateUser = useCallback(async (id, updates) => {
    if (apiAvailable) {
      try {
        await apiCall('saveUser', { user: { id, ...updates } });
        const fresh = await apiCall('getUsers');
        setUsers(fresh);
        if (currentUser && currentUser.id === id) {
          const updated = fresh.find(u => u.id === id);
          if (updated) {
            setCurrentUser(updated);
            sessionStorage.setItem('samura-current-user', JSON.stringify(updated));
          }
        }
        return;
      } catch {}
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentUser && currentUser.id === id) {
      const synced = { ...currentUser, ...updates };
      setCurrentUser(synced);
      sessionStorage.setItem('samura-current-user', JSON.stringify(synced));
    }
  }, [apiAvailable, currentUser]);

  const deleteUser = useCallback(async (id) => {
    if (apiAvailable) {
      try {
        await apiCall('deleteUser', { id });
        const fresh = await apiCall('getUsers');
        setUsers(fresh);
        if (currentUser && currentUser.id === id) {
          logout();
        }
        return;
      } catch {}
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    if (currentUser && currentUser.id === id) logout();
  }, [apiAvailable, currentUser, logout]);

  // ─── ARTICLES ─────────────────────────────────────────

  const addArticle = useCallback((article) => {
    const newArticle = { ...article, id: Date.now() };
    setData(prev => ({ ...prev, articles: [newArticle, ...prev.articles] }));
    if (apiAvailable) {
      apiCall('saveArticle', { article: newArticle }).catch(() => {});
    }
  }, [apiAvailable]);

  const updateArticle = useCallback((id, updates) => {
    setData(prev => {
      const articles = prev.articles.map(a => a.id === id ? { ...a, ...updates } : a);
      if (apiAvailable) {
        const updated = articles.find(a => a.id === id);
        if (updated) apiCall('saveArticle', { article: updated }).catch(() => {});
      }
      return { ...prev, articles };
    });
  }, [apiAvailable]);

  const deleteArticle = useCallback((id) => {
    setData(prev => ({ ...prev, articles: prev.articles.filter(a => a.id !== id) }));
    if (apiAvailable) {
      apiCall('deleteArticle', { id }).catch(() => {});
    }
  }, [apiAvailable]);

  // ─── GUIDE ENTRIES ────────────────────────────────────

  const addGuideEntry = useCallback((entry) => {
    setData(prev => ({ ...prev, guideEntries: [...prev.guideEntries, entry] }));
    if (apiAvailable) {
      apiCall('saveGuideEntry', { entry }).catch(() => {});
    }
  }, [apiAvailable]);

  const updateGuideEntry = useCallback((id, updates) => {
    setData(prev => {
      const entries = prev.guideEntries.map(e => e.id === id ? { ...e, ...updates } : e);
      if (apiAvailable) {
        const updated = entries.find(e => e.id === id);
        if (updated) apiCall('saveGuideEntry', { entry: updated }).catch(() => {});
      }
      return { ...prev, guideEntries: entries };
    });
  }, [apiAvailable]);

  const deleteGuideEntry = useCallback((id) => {
    setData(prev => ({ ...prev, guideEntries: prev.guideEntries.filter(e => e.id !== id) }));
    if (apiAvailable) {
      apiCall('deleteGuideEntry', { id }).catch(() => {});
    }
  }, [apiAvailable]);

  // ─── GUIDE CATEGORIES ─────────────────────────────────

  const addCategory = useCallback((cat) => {
    setData(prev => ({ ...prev, guideCategories: [...prev.guideCategories, cat] }));
    if (apiAvailable) {
      apiCall('saveCategory', { category: cat }).catch(() => {});
    }
  }, [apiAvailable]);

  const updateCategory = useCallback((id, updates) => {
    setData(prev => {
      const cats = prev.guideCategories.map(c => c.id === id ? { ...c, ...updates } : c);
      if (apiAvailable) {
        const updated = cats.find(c => c.id === id);
        if (updated) apiCall('saveCategory', { category: updated }).catch(() => {});
      }
      return { ...prev, guideCategories: cats };
    });
  }, [apiAvailable]);

  const deleteCategory = useCallback((id) => {
    setData(prev => ({ ...prev, guideCategories: prev.guideCategories.filter(c => c.id !== id) }));
    if (apiAvailable) {
      apiCall('deleteCategory', { id }).catch(() => {});
    }
  }, [apiAvailable]);

  // ─── SITE PAGES ───────────────────────────────────────

  const updateHomepage = useCallback((updates) => {
    setData(prev => {
      const homepage = { ...prev.homepage, ...updates };
      apiSave('homepage', homepage);
      return { ...prev, homepage };
    });
  }, [apiSave]);

  const updateAbout = useCallback((updates) => {
    setData(prev => {
      const about = { ...prev.about, ...updates };
      apiSave('about', about);
      return { ...prev, about };
    });
  }, [apiSave]);

  const updateArticlesPage = useCallback((updates) => {
    setData(prev => {
      const articlesPage = { ...prev.articlesPage, ...updates };
      apiSave('articlesPage', articlesPage);
      return { ...prev, articlesPage };
    });
  }, [apiSave]);

  const updateGuidePage = useCallback((updates) => {
    setData(prev => {
      const guidePage = { ...prev.guidePage, ...updates };
      apiSave('guidePage', guidePage);
      return { ...prev, guidePage };
    });
  }, [apiSave]);

  // ─── CUSTOM PAGES ─────────────────────────────────────

  const addPage = useCallback((page) => {
    setData(prev => {
      const pages = [...(prev.pages || []), { ...page, id: Date.now() }];
      apiSave('pages', pages);
      return { ...prev, pages };
    });
  }, [apiSave]);

  const updatePage = useCallback((id, updates) => {
    setData(prev => {
      const pages = (prev.pages || []).map(p => p.id === id ? { ...p, ...updates } : p);
      apiSave('pages', pages);
      return { ...prev, pages };
    });
  }, [apiSave]);

  const deletePage = useCallback((id) => {
    setData(prev => {
      const pages = (prev.pages || []).filter(p => p.id !== id);
      apiSave('pages', pages);
      return { ...prev, pages };
    });
  }, [apiSave]);

  // ─── SEO ──────────────────────────────────────────────

  const updateSEO = useCallback((updates) => {
    setData(prev => {
      const seo = { ...prev.seo, ...updates };
      apiSave('seo', seo);
      return { ...prev, seo };
    });
  }, [apiSave]);

  // ─── MAINTENANCE MODE ─────────────────────────────────

  const toggleMaintenance = useCallback(() => {
    setData(prev => {
      const maintenanceMode = !prev.maintenanceMode;
      if (apiAvailable) {
        apiCall('saveContent', { key: 'maintenanceMode', value: maintenanceMode }).catch(() => {});
      }
      return { ...prev, maintenanceMode };
    });
  }, [apiAvailable]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-olive-200 border-t-olive-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{
      ...data,
      users,
      currentUser,
      isAuthenticated,
      login,
      logout,
      resetData,
      apiAvailable,
      addUser,
      updateUser,
      deleteUser,
      addArticle,
      updateArticle,
      deleteArticle,
      addGuideEntry,
      updateGuideEntry,
      deleteGuideEntry,
      addCategory,
      updateCategory,
      deleteCategory,
      updateHomepage,
      updateAbout,
      updateArticlesPage,
      updateGuidePage,
      addPage,
      updatePage,
      deletePage,
      toggleMaintenance,
      updateSEO,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
}