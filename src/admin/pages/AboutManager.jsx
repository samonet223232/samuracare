import { useState, useEffect } from 'react';
import { useAdmin } from '../AdminContext';

export default function AboutManager() {
  const { about, updateAbout } = useAdmin();
  const [form, setForm] = useState({ ...about });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm({ ...about }); }, [about]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleValueChange = (index, field, value) => {
    setForm(prev => {
      const values = [...prev.values];
      values[index] = { ...values[index], [field]: value };
      return { ...prev, values };
    });
  };

  const addValue = () => {
    setForm(prev => ({ ...prev, values: [...prev.values, { title: '', description: '' }] }));
  };

  const removeValue = (index) => {
    setForm(prev => ({ ...prev, values: prev.values.filter((_, i) => i !== index) }));
  };

  const handleTimelineChange = (index, field, value) => {
    setForm(prev => {
      const timeline = [...prev.timeline];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...prev, timeline };
    });
  };

  const addTimeline = () => {
    setForm(prev => ({ ...prev, timeline: [...prev.timeline, { year: '', title: '', text: '' }] }));
  };

  const removeTimeline = (index) => {
    setForm(prev => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    updateAbout(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">About Page Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage about page content</p>
        </div>
        <button onClick={handleSave} className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-green-500 text-white' : 'bg-olive-500 text-white hover:bg-olive-600'}`}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Title</label>
              <input className={inputClass} value={form.heroTitle} onChange={e => handleChange('heroTitle', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <textarea className={inputClass + ' h-20'} value={form.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">Mission</h2>
          <div>
            <label className={labelClass}>Text</label>
            <textarea className={inputClass + ' h-28'} value={form.mission} onChange={e => handleChange('mission', e.target.value)} />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">Values</h2>
          <div className="space-y-4">
            {form.values.map((v, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1 space-y-3">
                  <input className={inputClass} value={v.title} onChange={e => handleValueChange(i, 'title', e.target.value)} placeholder="Value title" />
                  <textarea className={inputClass + ' h-16'} value={v.description} onChange={e => handleValueChange(i, 'description', e.target.value)} placeholder="Description" />
                </div>
                <button onClick={() => removeValue(i)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
              </div>
            ))}
            <button onClick={addValue} className="text-sm text-olive-500 font-medium hover:text-olive-600">+ Add value</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">Timeline</h2>
          <div className="space-y-4">
            {form.timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input className={inputClass} value={t.year} onChange={e => handleTimelineChange(i, 'year', e.target.value)} placeholder="Year" />
                  <input className={inputClass} value={t.title} onChange={e => handleTimelineChange(i, 'title', e.target.value)} placeholder="Title" />
                  <input className={inputClass} value={t.text} onChange={e => handleTimelineChange(i, 'text', e.target.value)} placeholder="Description" />
                </div>
                <button onClick={() => removeTimeline(i)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
              </div>
            ))}
            <button onClick={addTimeline} className="text-sm text-olive-500 font-medium hover:text-olive-600">+ Add event</button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">CTA Section</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input className={inputClass} value={form.ctaText} onChange={e => handleChange('ctaText', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Subtext</label>
              <textarea className={inputClass + ' h-16'} value={form.ctaSubtext} onChange={e => handleChange('ctaSubtext', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}