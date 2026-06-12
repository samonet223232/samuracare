import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { articles as defaultArticles } from '../data/articles';
import { guideCategories as defaultCategories, guideEntries as defaultEntries } from '../data/guide';

const ADMIN_KEY = 'samura-admin-auth';
const STORE_KEY = 'samura-content';
const USERS_KEY = 'samura-users';

const defaultHomepage = {
  heroTitle: 'اكتشفي جمالاً طبيعياً،<br/>صُنع بعناية',
  heroSubtitle: 'موسوعة المكونات الطبيعية، أدلة الجمال، وعناية مصنوعة بالحب — كل ما تحتاجينه لرحلة جمالكِ الطبيعية',
  trustBarText: 'طبيعي ١٠٠٪ • خالٍ من القسوة • مكوّنات نظيفة',
  aboutTitle: 'عناية بسيطة، مكوّنات حقيقية',
  aboutText: 'نؤمن بأن الجمال الحقيقي يبدأ بالمكونات الطبيعية النقية. كل زيت، زبدة، ومستخلص في موقعنا تم اختياره بعناية بناءً على صفاته الطبيعية وفوائده المثبتة.',
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

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [{ id: 1, username: 'admin', password: 'admin123', role: 'admin' }];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getInitialState() {
  const saved = loadStore();
  const defaults = {
    articles: defaultArticles,
    guideCategories: defaultCategories,
    guideEntries: defaultEntries,
    homepage: defaultHomepage,
    about: defaultAbout,
    pages: [],
  };
  if (saved) {
    return { ...defaults, ...saved };
  }
  return defaults;
}

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [data, setData] = useState(getInitialState);
  const [users, setUsers] = useState(loadUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(ADMIN_KEY) === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const raw = sessionStorage.getItem('samura-current-user');
    return raw ? JSON.parse(raw) : null;
  });

  // Persist
  useEffect(() => { saveStore(data); }, [data]);
  useEffect(() => { saveUsers(users); }, [users]);

  const login = useCallback((username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      sessionStorage.setItem(ADMIN_KEY, 'true');
      sessionStorage.setItem('samura-current-user', JSON.stringify(user));
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem('samura-current-user');
  }, []);

  const resetData = useCallback(() => {
    const fresh = {
      articles: defaultArticles,
      guideCategories: defaultCategories,
      guideEntries: defaultEntries,
      homepage: defaultHomepage,
      about: defaultAbout,
      pages: [],
    };
    setData(fresh);
    saveStore(fresh);
  }, []);

  // ---- User Management ----
  const addUser = useCallback((user) => {
    setUsers(prev => [...prev, { ...user, id: Date.now() }]);
  }, []);

  const updateUser = useCallback((id, updates) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    // If updating current user's own record, sync session
    if (currentUser && currentUser.id === id) {
      const updated = users.find(u => u.id === id);
      if (updated) {
        const synced = { ...updated, ...updates };
        setCurrentUser(synced);
        sessionStorage.setItem('samura-current-user', JSON.stringify(synced));
      }
    }
  }, [currentUser, users]);

  const deleteUser = useCallback((id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    // Log out if deleting own account
    if (currentUser && currentUser.id === id) {
      logout();
    }
  }, [currentUser, logout]);

  // ---- Articles ----
  const addArticle = useCallback((article) => {
    setData(prev => ({
      ...prev,
      articles: [{ ...article, id: Date.now() }, ...prev.articles],
    }));
  }, []);

  const updateArticle = useCallback((id, updates) => {
    setData(prev => ({
      ...prev,
      articles: prev.articles.map(a => a.id === id ? { ...a, ...updates } : a),
    }));
  }, []);

  const deleteArticle = useCallback((id) => {
    setData(prev => ({
      ...prev,
      articles: prev.articles.filter(a => a.id !== id),
    }));
  }, []);

  // ---- Guide Entries ----
  const addGuideEntry = useCallback((entry) => {
    setData(prev => ({
      ...prev,
      guideEntries: [...prev.guideEntries, entry],
    }));
  }, []);

  const updateGuideEntry = useCallback((id, updates) => {
    setData(prev => ({
      ...prev,
      guideEntries: prev.guideEntries.map(e => e.id === id ? { ...e, ...updates } : e),
    }));
  }, []);

  const deleteGuideEntry = useCallback((id) => {
    setData(prev => ({
      ...prev,
      guideEntries: prev.guideEntries.filter(e => e.id !== id),
    }));
  }, []);

  // ---- Guide Categories ----
  const addCategory = useCallback((cat) => {
    setData(prev => ({
      ...prev,
      guideCategories: [...prev.guideCategories, cat],
    }));
  }, []);

  const updateCategory = useCallback((id, updates) => {
    setData(prev => ({
      ...prev,
      guideCategories: prev.guideCategories.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
  }, []);

  const deleteCategory = useCallback((id) => {
    setData(prev => ({
      ...prev,
      guideCategories: prev.guideCategories.filter(c => c.id !== id),
    }));
  }, []);

  // ---- Homepage ----
  const updateHomepage = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      homepage: { ...prev.homepage, ...updates },
    }));
  }, []);

  // ---- About ----
  const updateAbout = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, ...updates },
    }));
  }, []);

  // ---- Custom Pages ----
  const addPage = useCallback((page) => {
    setData(prev => ({
      ...prev,
      pages: [...(prev.pages || []), { ...page, id: Date.now() }],
    }));
  }, []);

  const updatePage = useCallback((id, updates) => {
    setData(prev => ({
      ...prev,
      pages: (prev.pages || []).map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  }, []);

  const deletePage = useCallback((id) => {
    setData(prev => ({
      ...prev,
      pages: (prev.pages || []).filter(p => p.id !== id),
    }));
  }, []);

  return (
    <AdminContext.Provider value={{
      ...data,
      users,
      currentUser,
      isAuthenticated,
      login,
      logout,
      resetData,
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
      pages,
      addPage,
      updatePage,
      deletePage,
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