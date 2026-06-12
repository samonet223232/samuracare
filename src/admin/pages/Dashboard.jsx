import { Link } from 'react-router-dom';
import { FileText, BookOpen, Tags, Home, Info } from 'lucide-react';
import { useAdmin } from '../AdminContext';

export default function Dashboard() {
  const { articles, guideEntries, guideCategories } = useAdmin();

  const stats = [
    { label: 'المقالات', count: articles.length, icon: FileText, to: '/admin/articles', color: 'text-blue-600 bg-blue-50' },
    { label: 'مداخل الدليل', count: guideEntries.length, icon: BookOpen, to: '/admin/guide', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'تصنيفات الدليل', count: guideCategories.length, icon: Tags, to: '/admin/categories', color: 'text-amber-600 bg-amber-50' },
    { label: 'الصفحة الرئيسية', count: '—', icon: Home, to: '/admin/homepage', color: 'text-olive-600 bg-olive-50' },
    { label: 'صفحة عنّا', count: '—', icon: Info, to: '/admin/about', color: 'text-purple-600 bg-purple-50' },
  ];

  const recentArticles = articles.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800 mb-1">لوحة التحكم</h1>
      <p className="text-sm text-neutral-500 mb-8">نظرة عامة على محتوى الموقع</p>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {stats.map((s, i) => (
          <Link key={i} to={s.to} className="block bg-white rounded-2xl p-5 border border-neutral-100 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-neutral-800">{s.count}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent articles */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-neutral-800">أحدث المقالات</h2>
          <Link to="/admin/articles" className="text-sm text-olive-500 font-medium hover:text-olive-600">
            عرض الكل
          </Link>
        </div>
        {recentArticles.length === 0 ? (
          <p className="text-sm text-neutral-400 py-6 text-center">لا توجد مقالات بعد</p>
        ) : (
          <div className="space-y-3">
            {recentArticles.map(a => (
              <div key={a.id} className="flex items-center gap-3 py-2 border-b border-neutral-50 last:border-0">
                <img src={a.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-800 truncate">{a.title}</p>
                  <p className="text-xs text-neutral-400">{a.category} · {a.readTime}</p>
                </div>
                <Link to={`/admin/articles/${a.id}`} className="text-xs text-olive-500 hover:text-olive-600 shrink-0">
                  تعديل
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}