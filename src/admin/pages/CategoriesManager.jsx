import { useState } from 'react';
import { Plus, Trash2, Edit3, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../AdminContext';

export default function CategoriesManager() {
  const { guideCategories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [editing, setEditing] = useState(null); // null | 'new' | object
  const [form, setForm] = useState({ id: '', titleAr: '', title: '', icon: '', descriptionAr: '' });

  const openNew = () => {
    setForm({ id: '', titleAr: '', title: '', icon: '', descriptionAr: '' });
    setEditing('new');
  };

  const openEdit = (cat) => {
    setForm({ ...cat });
    setEditing(cat.id);
  };

  const closeForm = () => {
    setEditing(null);
    setForm({ id: '', titleAr: '', title: '', icon: '', descriptionAr: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titleAr.trim() || !form.id.trim()) return;
    if (editing === 'new') {
      addCategory({ ...form });
    } else {
      updateCategory(editing, form);
    }
    closeForm();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">تصنيفات الدليل</h1>
          <p className="text-sm text-neutral-500 mt-1">{guideCategories.length} تصنيف</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-olive-500 text-white px-5 py-2.5 rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          <Plus size={16} /> تصنيف جديد
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-neutral-800">{editing === 'new' ? 'تصنيف جديد' : 'تعديل التصنيف'}</h2>
            <button onClick={closeForm} className="text-neutral-400 hover:text-neutral-600"><ArrowLeft size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">المعرف (ID)</label>
                <input className={inputClass} value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} placeholder="oils" dir="ltr" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">الإيكون (رمز تعبيري)</label>
                <input className={inputClass} value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="🌿" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">الاسم (عربي)</label>
                <input className={inputClass} value={form.titleAr} onChange={e => setForm(f => ({ ...f, titleAr: e.target.value }))} placeholder="الزيوت الطبيعية" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">الاسم (إنجليزي)</label>
                <input className={inputClass} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Natural Oils" dir="ltr" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5">الوصف</label>
              <input className={inputClass} value={form.descriptionAr} onChange={e => setForm(f => ({ ...f, descriptionAr: e.target.value }))} placeholder="وصف التصنيف..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-5 py-2.5 bg-olive-500 text-white rounded-xl hover:bg-olive-600 text-sm font-medium">حفظ</button>
              <button type="button" onClick={closeForm} className="px-5 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 text-sm font-medium">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Categories list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guideCategories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{cat.icon}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg text-neutral-400 hover:text-olive-500 hover:bg-olive-50 transition-all">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => deleteCategory(cat.id)} className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-neutral-800 text-sm mb-0.5">{cat.titleAr}</h3>
            <p className="text-xs text-neutral-400 mb-1">{cat.title}</p>
            <p className="text-xs text-neutral-500">{cat.descriptionAr}</p>
            <p className="text-xs text-neutral-300 mt-2 font-mono">/{cat.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}