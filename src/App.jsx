import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AdminProvider, useAdmin } from './admin/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Guide from './pages/Guide';
import GuideDetail from './pages/GuideDetail';
import About from './pages/About';
import PageDetail from './pages/PageDetail';
import MaintenancePage from './pages/MaintenancePage';

// Admin imports
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ArticlesManager, { ArticleEditor } from './admin/pages/ArticlesManager';
import GuideManager, { GuideEntryEditor } from './admin/pages/GuideManager';
import CategoriesManager from './admin/pages/CategoriesManager';
import HomepageManager from './admin/pages/HomepageManager';
import AboutManager from './admin/pages/AboutManager';
import UsersManager from './admin/pages/UsersManager';
import PagesManager from './admin/pages/PagesManager';
import Login from './admin/pages/Login';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) {
    return <Login />;
  }
  return children;
}

function AdminRoutes() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/articles" element={<ArticlesManager />} />
          <Route path="/articles/:id" element={<ArticleEditor />} />
          <Route path="/guide" element={<GuideManager />} />
          <Route path="/guide/:id" element={<GuideEntryEditor />} />
          <Route path="/categories" element={<CategoriesManager />} />
          <Route path="/homepage" element={<HomepageManager />} />
          <Route path="/about" element={<AboutManager />} />
          <Route path="/users" element={<UsersManager />} />
          <Route path="/pages" element={<PagesManager />} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
}

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { maintenanceMode } = useAdmin();

  if (maintenanceMode && location.pathname !== '/maintenance') {
    return <MaintenancePage />;
  }

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:slug" element={<GuideDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/page/:slug" element={<PageDetail />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </AdminProvider>
  );
}