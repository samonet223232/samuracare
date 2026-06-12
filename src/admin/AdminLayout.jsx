import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, BookOpen, Tags, Home, Info, LogOut, Menu, X
} from 'lucide-react';
import { useAdmin } from './AdminContext';

const sidebarLinks = [
  { to: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard, exact: true },
  { to: '/admin/articles', label: 'المقالات', icon: FileText },
  { to: '/admin/guide', label: 'دليل الجمال', icon: BookOpen },
  { to: '/admin/categories', label: 'تصنيفات الدليل', icon: Tags },
  { to: '/admin/homepage', label: 'الصفحة الرئيسية', icon: Home },
  { to: '/admin/about', label: 'صفحة عنّا', icon: Info },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 right-0 z-50 w-72 h-screen bg-white border-l border-neutral-200 flex flex-col transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Sidebar header */}
        <div className="px-6 h-16 flex items-center justify-between border-b border-neutral-100">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-olive-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">أ</span>
            </div>
            <span className="font-semibold text-neutral-800 text-sm">الإدارة</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-neutral-400 hover:text-neutral-600">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(link)
                  ? 'bg-olive-500 text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800'
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-neutral-100 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-100 transition-all"
          >
            العودة للموقع
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-neutral-500 hover:text-neutral-700 -mr-2">
              <Menu size={20} />
            </button>
            {/* Breadcrumb / page title could go here */}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-olive-500 hover:text-olive-600 font-medium transition-colors"
            >
              عرض الموقع
            </a>
          </div>
        </header>

        {/* Content area */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}