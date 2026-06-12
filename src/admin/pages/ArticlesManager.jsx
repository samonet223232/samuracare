import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../AdminContext';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || 'untitled';
}

function ArticleForm({ article, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    category: article?.category || 'المكونات',
    readTime: article?.readTime || '5 دقائق',
    date: article?.date || new Date().toISOString().split('T')[0],
    image: article?.image || '',
    featured: article?.featured || false,
    relatedGuide: article?.relatedGuide || [],
  });

  const handleChange = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'title') next.slug = slugify(value);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    onSave(form);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">العنوان</label>
            <input className={inputClass} value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="عنوان المقال" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الرابط (Slug)</label>
            <input className={inputClass} value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="article-slug" dir="ltr" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الملخص</label>
            <textarea className={inputClass + ' h-20'} value={form.excerpt} onChange={e => handleChange('excerpt', e.target.value)} placeholder="نبذة قصيرة عن المقال" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">المحتوى (يدعم Markdown)</label>
            <textarea className={inputClass + ' h-64'} value={form.content} onChange={e => handleChange('content', e.target.value)} placeholder="محتوى المقال..." required />
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">التصنيف</label>
            <select className={inputClass} value={form.category} onChange={e => handleChange('category', e.target.value)}>
              <option value="المكونات">المكونات</option>
              <option value="وصفات منزلية">وصفات منزلية</option>
              <option value="أدلة">أدلة</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">وقت القراءة</label>
            <input className={inputClass} value={form.readTime} onChange={e => handleChange('readTime', e.target.value)} placeholder="مثال: 5 دقائق" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">التاريخ</label>
            <input className={inputClass} type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">رابط الصورة</label>
            <input className={inputClass} value={form.image} onChange={e => handleChange('image', e.target.value)} placeholder="https://..." dir="ltr" />
            {form.image && <img src={form.image} alt="" className="mt-2 w-full h-32 rounded-xl object-cover" />}
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => handleChange('featured', e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-olive-500 focus:ring-olive-400" />
            <span className="text-sm text-neutral-700">مقال مميّز</span>
          </label>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <button type="submit" className="px-6 py-2.5 bg-olive-500 text-white rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          {article ? 'حفظ التغييرات' : 'إضافة المقال'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 transition-colors text-sm font-medium">
          إلغاء
        </button>
      </div>
    </form>
  );
}

export default function ArticlesManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useAdmin();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteArticle(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">إدارة المقالات</h1>
          <p className="text-sm text-neutral-500 mt-1">{articles.length} مقال</p>
        </div>
        <Link to="/admin/articles/new" className="flex items-center gap-2 bg-olive-500 text-white px-5 py-2.5 rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          <Plus size={16} /> مقال جديد
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {articles.length === 0 ? (
          <p className="text-center text-neutral-400 py-12">لا توجد مقالات. أضف مقالك الأول!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">المقال</th>
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">التصنيف</th>
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">التاريخ</th>
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">مميّز</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500 text-xs">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(a => (
                  <tr key={a.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={a.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-800 truncate max-w-[300px]">{a.title}</p>
                          <p className="text-xs text-neutral-400 mt-0.5">{a.readTime}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">{a.category}</span>
                    </td>
                    <td className="px-5 py-4 text-neutral-500">{a.date}</td>
                    <td className="px-5 py-4">
                      {a.featured ? <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full">مميّز</span> : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/articles/${a.id}`} className="p-2 rounded-lg text-neutral-400 hover:text-olive-500 hover:bg-olive-50 transition-all">
                          <Edit3 size={15} />
                        </Link>
                        <button onClick={() => setDeleteConfirm(a.id)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm mx-4 w-full">
            <h3 className="text-lg font-bold text-neutral-800 mb-2">تأكيد الحذف</h3>
            <p className="text-sm text-neutral-500 mb-6">هل أنت متأكدة من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 text-sm font-medium">
                إلغاء
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm font-medium">
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ArticleEditor() {
  const { id } = useParams();
  const { articles, addArticle, updateArticle } = useAdmin();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const article = isNew ? null : articles.find(a => String(a.id) === id);

  if (!isNew && !article) {
    return <p className="text-neutral-400 py-10 text-center">المقال غير موجود</p>;
  }

  const handleSave = (data) => {
    if (isNew) {
      addArticle(data);
    } else {
      updateArticle(article.id, data);
    }
    navigate('/admin/articles');
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/articles" className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-neutral-800">{isNew ? 'مقال جديد' : 'تعديل المقال'}</h1>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <ArticleForm article={article} onSave={handleSave} onCancel={() => navigate('/admin/articles')} />
      </div>
    </div>
  );
}