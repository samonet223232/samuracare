import { useState, useEffect } from 'react';
import { useAdmin } from '../AdminContext';

export default function HomepageManager() {
  const { homepage, updateHomepage } = useAdmin();
  const [form, setForm] = useState({ ...homepage });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm({ ...homepage }); }, [homepage]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleStatsChange = (index, field, value) => {
    setForm(prev => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  const addStat = () => {
    setForm(prev => ({ ...prev, stats: [...prev.stats, { number: '', label: '' }] }));
  };

  const removeStat = (index) => {
    setForm(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    updateHomepage(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">إدارة الصفحة الرئيسية</h1>
          <p className="text-sm text-neutral-500 mt-1">تعديل محتوى الصفحة الرئيسية</p>
        </div>
        <button onClick={handleSave} className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-green-500 text-white' : 'bg-olive-500 text-white hover:bg-olive-600'}`}>
          {saved ? '✓ تم الحفظ' : 'حفظ التغييرات'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">قسم الهيرو (Hero)</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>العنوان الرئيسي (يدعم HTML)</label>
              <input className={inputClass} value={form.heroTitle} onChange={e => handleChange('heroTitle', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>النص الفرعي</label>
              <textarea className={inputClass + ' h-20'} value={form.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">شريط الثقة (Trust Bar)</h2>
          <div>
            <label className={labelClass}>النص</label>
            <input className={inputClass} value={form.trustBarText} onChange={e => handleChange('trustBarText', e.target.value)} />
          </div>
        </div>

        {/* About preview section */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">معاينة قسم "عنا"</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>العنوان</label>
              <input className={inputClass} value={form.aboutTitle} onChange={e => handleChange('aboutTitle', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>النص</label>
              <textarea className={inputClass + ' h-24'} value={form.aboutText} onChange={e => handleChange('aboutText', e.target.value)} />
            </div>
          </div>

          {/* Stats */}
          <h3 className="font-semibold text-neutral-700 mt-6 mb-3 text-sm">الإحصائيات</h3>
          <div className="space-y-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <input className={inputClass + ' flex-1'} value={stat.number} onChange={e => handleStatsChange(i, 'number', e.target.value)} placeholder="الرقم (مثال: ٤٠+)" />
                <input className={inputClass + ' flex-1'} value={stat.label} onChange={e => handleStatsChange(i, 'label', e.target.value)} placeholder="التصنيف" />
                <button onClick={() => removeStat(i)} className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
              </div>
            ))}
            <button onClick={addStat} className="text-sm text-olive-500 font-medium hover:text-olive-600">+ إضافة إحصائية</button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">قسم النشرة البريدية</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>العنوان</label>
              <input className={inputClass} value={form.newsletterTitle} onChange={e => handleChange('newsletterTitle', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>النص</label>
              <textarea className={inputClass + ' h-16'} value={form.newsletterText} onChange={e => handleChange('newsletterText', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}