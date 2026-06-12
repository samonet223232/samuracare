import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../AdminContext';

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() || 'untitled';
}

function GuideForm({ entry, onSave, onCancel }) {
  const { guideCategories } = useAdmin();
  const [form, setForm] = useState({
    id: entry?.id || '',
    slug: entry?.slug || '',
    nameAr: entry?.nameAr || '',
    name: entry?.name || '',
    category: entry?.category || '',
    taglineAr: entry?.taglineAr || '',
    origin: entry?.origin || '',
    image: entry?.image || '',
    benefits: entry?.benefits?.join('\n') || '',
    usage: entry?.usage || '',
    suitability: entry?.suitability || '',
    warnings: entry?.warnings || '',
    relatedArticles: entry?.relatedArticles?.join('\n') || '',
  });

  const benefitsArr = form.benefits.split('\n').filter(Boolean);

  const handleChange = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'name') next.slug = slugify(value);
      if (field === 'nameAr') next.id = slugify(value);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nameAr.trim()) return;
    onSave({
      ...form,
      benefits: benefitsArr,
      relatedArticles: form.relatedArticles.split('\n').filter(Boolean),
    });
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الاسم (عربي)</label>
            <input className={inputClass} value={form.nameAr} onChange={e => handleChange('nameAr', e.target.value)} placeholder="زيت الأرغان" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الاسم (إنجليزي)</label>
            <input className={inputClass} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Argan Oil" dir="ltr" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">المعرف (ID)</label>
            <input className={inputClass} value={form.id} onChange={e => handleChange('id', e.target.value)} dir="ltr" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الرابط (Slug)</label>
            <input className={inputClass} value={form.slug} onChange={e => handleChange('slug', e.target.value)} dir="ltr" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">التصنيف</label>
            <select className={inputClass} value={form.category} onChange={e => handleChange('category', e.target.value)}>
              <option value="">اختر تصنيفاً</option>
              {guideCategories.map(c => (
                <option key={c.id} value={c.id}>{c.titleAr}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الموطن الأصلي</label>
            <input className={inputClass} value={form.origin} onChange={e => handleChange('origin', e.target.value)} placeholder="المغرب" />
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الوصف</label>
            <textarea className={inputClass + ' h-20'} value={form.taglineAr} onChange={e => handleChange('taglineAr', e.target.value)} placeholder="الذهب السائل من المغرب" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">الفوائد (سطر واحد لكل فائدة)</label>
            <textarea className={inputClass + ' h-28'} value={form.benefits} onChange={e => handleChange('benefits', e.target.value)} placeholder="غني بفيتامين E والأحماض الدهنية&#10;يُرطّب البشرة بعمق&#10;..." />
            {benefitsArr.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {benefitsArr.map((b, i) => <span key={i} className="text-xs bg-olive-50 text-olive-600 px-2 py-0.5 rounded-full">{b}</span>)}
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">طريقة الاستخدام</label>
            <textarea className={inputClass + ' h-20'} value={form.usage} onChange={e => handleChange('usage', e.target.value)} placeholder="..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">مناسب لـ</label>
            <textarea className={inputClass + ' h-16'} value={form.suitability} onChange={e => handleChange('suitability', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">تحذيرات</label>
            <textarea className={inputClass + ' h-16'} value={form.warnings} onChange={e => handleChange('warnings', e.target.value)} />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5">رابط الصورة</label>
        <input className={inputClass} value={form.image} onChange={e => handleChange('image', e.target.value)} placeholder="https://..." dir="ltr" />
        {form.image && <img src={form.image} alt="" className="mt-2 h-28 rounded-xl object-cover" />}
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1.5">المقالات المرتبطة (slug واحد لكل سطر)</label>
        <input className={inputClass} value={form.relatedArticles} onChange={e => handleChange('relatedArticles', e.target.value)} placeholder="benefits-of-argan-oil-for-skin" dir="ltr" />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <button type="submit" className="px-6 py-2.5 bg-olive-500 text-white rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          {entry ? 'حفظ التغييرات' : 'إضافة المدخل'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 transition-colors text-sm font-medium">
          إلغاء
        </button>
      </div>
    </form>
  );
}

export default function GuideManager() {
  const { guideEntries, deleteGuideEntry } = useAdmin();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteGuideEntry(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">إدارة دليل الجمال</h1>
          <p className="text-sm text-neutral-500 mt-1">{guideEntries.length} مدخل</p>
        </div>
        <Link to="/admin/guide/new" className="flex items-center gap-2 bg-olive-500 text-white px-5 py-2.5 rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          <Plus size={16} /> مدخل جديد
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {guideEntries.length === 0 ? (
          <p className="text-center text-neutral-400 py-12">لا توجد مدخلات بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">المدخل</th>
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">التصنيف</th>
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">ID</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500 text-xs">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {guideEntries.map(e => (
                  <tr key={e.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={e.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-800">{e.nameAr}</p>
                          <p className="text-xs text-neutral-400">{e.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-500">{e.category}</td>
                    <td className="px-5 py-4 text-neutral-400 text-xs font-mono">{e.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/guide/${e.id}`} className="p-2 rounded-lg text-neutral-400 hover:text-olive-500 hover:bg-olive-50 transition-all">
                          <Edit3 size={15} />
                        </Link>
                        <button onClick={() => setDeleteConfirm(e.id)} className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all">
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

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm mx-4 w-full">
            <h3 className="text-lg font-bold text-neutral-800 mb-2">تأكيد الحذف</h3>
            <p className="text-sm text-neutral-500 mb-6">هل أنت متأكد من حذف هذا المدخل؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 text-sm font-medium">إلغاء</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm font-medium">حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GuideEntryEditor() {
  const { id } = useParams();
  const { guideEntries, addGuideEntry, updateGuideEntry } = useAdmin();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const entry = isNew ? null : guideEntries.find(e => e.id === id);

  if (!isNew && !entry) {
    return <p className="text-neutral-400 py-10 text-center">المدخل غير موجود</p>;
  }

  const handleSave = (data) => {
    if (isNew) {
      addGuideEntry(data);
    } else {
      updateGuideEntry(id, data);
    }
    navigate('/admin/guide');
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/guide" className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-neutral-800">{isNew ? 'مدخل جديد' : 'تعديل المدخل'}</h1>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <GuideForm entry={entry} onSave={handleSave} onCancel={() => navigate('/admin/guide')} />
      </div>
    </div>
  );
}