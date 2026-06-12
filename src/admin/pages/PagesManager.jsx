import { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { FileText, Plus, X, Eye, EyeOff, Pencil, Trash2, ChevronUp, ChevronDown, Home, Info, BookOpen, Newspaper, ChevronDown as ChevronDownIcon } from 'lucide-react';

const emptyForm = { title: '', slug: '', content: '', showInHeader: true, order: 0 };

export default function PagesManager() {
  const { pages, addPage, updatePage, deletePage, homepage, updateHomepage, about, updateAbout, articlesPage, updateArticlesPage, guidePage, updateGuidePage } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedSite, setExpandedSite] = useState(null);

  const pageList = pages || [];
  const sortedPages = [...pageList].sort((a, b) => a.order - b.order);

  const slugify = (str) =>
    str.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  const handleTitleChange = (title) => {
    const slug = slugify(title);
    setForm(prev => ({ ...prev, title, slug }));
  };

  const openNew = () => {
    setForm({ ...emptyForm, order: pageList.length });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (page) => {
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      showInHeader: page.showInHeader,
      order: page.order,
    });
    setEditingId(page.id);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return;
    if (editingId) {
      updatePage(editingId, form);
    } else {
      addPage(form);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    deletePage(id);
    setDeleteConfirm(null);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const prev = sortedPages[index - 1];
    const curr = sortedPages[index];
    updatePage(curr.id, { order: prev.order });
    updatePage(prev.id, { order: curr.order });
  };

  const moveDown = (index) => {
    if (index >= sortedPages.length - 1) return;
    const next = sortedPages[index + 1];
    const curr = sortedPages[index];
    updatePage(curr.id, { order: next.order });
    updatePage(next.id, { order: curr.order });
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";
  const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

  const sitePages = [
    {
      id: 'site-home',
      icon: Home,
      label: 'Homepage',
      description: 'Hero image, about image, titles, stats, newsletter',
      expanded: expandedSite === 'home',
      fields: [
        { key: 'heroImage', label: 'Hero Background Image', type: 'image' },
        { key: 'heroTitle', label: 'Hero Title (HTML)', type: 'text' },
        { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
        { key: 'aboutImage', label: 'About Section Image', type: 'image' },
        { key: 'aboutBadgeNumber', label: 'Badge Number', type: 'text' },
        { key: 'aboutBadgeText', label: 'Badge Text', type: 'text' },
        { key: 'aboutTitle', label: 'About Title', type: 'text' },
        { key: 'aboutText', label: 'About Text', type: 'textarea' },
      ],
      data: homepage,
      updater: updateHomepage,
    },
    {
      id: 'site-about',
      icon: Info,
      label: 'About Page',
      description: 'Hero image, mission, values, timeline, CTA',
      expanded: expandedSite === 'about',
      fields: [
        { key: 'heroImage', label: 'Hero Background Image', type: 'image' },
        { key: 'heroTitle', label: 'Hero Title', type: 'text' },
        { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
        { key: 'mission', label: 'Mission', type: 'textarea' },
      ],
      data: about,
      updater: updateAbout,
    },
    {
      id: 'site-articles',
      icon: Newspaper,
      label: 'Articles Page',
      description: 'Listing page banner, title, subtitle',
      expanded: expandedSite === 'articles',
      fields: [
        { key: 'heroImage', label: 'Banner Image', type: 'image' },
        { key: 'heroTitle', label: 'Page Title', type: 'text' },
        { key: 'heroSubtitle', label: 'Page Subtitle', type: 'textarea' },
      ],
      data: articlesPage,
      updater: updateArticlesPage,
    },
    {
      id: 'site-guide',
      icon: BookOpen,
      label: 'Beauty Guide Page',
      description: 'Listing page banner, title, subtitle',
      expanded: expandedSite === 'guide',
      fields: [
        { key: 'heroImage', label: 'Banner Image', type: 'image' },
        { key: 'heroTitle', label: 'Page Title', type: 'text' },
        { key: 'heroSubtitle', label: 'Page Subtitle', type: 'textarea' },
      ],
      data: guidePage,
      updater: updateGuidePage,
    },
  ];

  const toggleSite = (id) => {
    setExpandedSite(prev => prev === id ? null : id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-neutral-800">Pages</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Manage all site pages and photos</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-olive-500 text-white rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
          <Plus size={16} /> New Custom Page
        </button>
      </div>

      {/* Site Pages */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Site Pages</h2>
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden divide-y divide-neutral-100">
          {sitePages.map((site) => {
            const Icon = site.icon;
            return (
              <div key={site.id}>
                <button onClick={() => toggleSite(site.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors text-left">
                  <Icon size={18} className="text-olive-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800">{site.label}</p>
                    <p className="text-xs text-neutral-400">{site.description}</p>
                  </div>
                  <ChevronDownIcon size={16} className={`text-neutral-400 transition-transform ${site.expanded ? 'rotate-180' : ''}`} />
                </button>
                {site.expanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-neutral-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {site.fields.map(field => (
                        <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label className={labelClass}>{field.label}</label>
                          {field.type === 'image' ? (
                            <>
                              <input className={inputClass} value={site.data[field.key] || ''}
                                onChange={e => site.updater({ [field.key]: e.target.value })} placeholder="https://..." />
                              {site.data[field.key] && (
                                <img src={site.data[field.key]} alt=""
                                  className="mt-2 w-full h-24 object-cover rounded-lg border border-neutral-100"
                                  onError={e => e.target.style.display='none'} />
                              )}
                            </>
                          ) : field.type === 'textarea' ? (
                            <textarea className={inputClass + ' h-24'} value={site.data[field.key] || ''}
                              onChange={e => site.updater({ [field.key]: e.target.value })} />
                          ) : (
                            <input className={inputClass} value={site.data[field.key] || ''}
                              onChange={e => site.updater({ [field.key]: e.target.value })} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Pages */}
      <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Custom Pages</h2>

      {sortedPages.length === 0 && !showForm && (
        <div className="bg-white rounded-2xl p-10 border border-neutral-100 text-center">
          <FileText size={40} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-neutral-500 text-sm">No custom pages yet. Create your first page to see it in the header navigation.</p>
        </div>
      )}

      {sortedPages.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
          <div className="divide-y divide-neutral-100">
            {sortedPages.map((page, index) => (
              <div key={page.id} className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveUp(index)} className="p-0.5 text-neutral-300 hover:text-neutral-600 transition-colors disabled:opacity-30" disabled={index === 0}>
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => moveDown(index)} className="p-0.5 text-neutral-300 hover:text-neutral-600 transition-colors disabled:opacity-30" disabled={index >= sortedPages.length - 1}>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <FileText size={18} className="text-olive-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">{page.title}</p>
                  <p className="text-xs text-neutral-400 truncate">/{page.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  {page.showInHeader ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                      <Eye size={12} /> Header
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">
                      <EyeOff size={12} /> Hidden
                    </span>
                  )}
                  <button onClick={() => openEdit(page)} className="p-2 text-neutral-400 hover:text-olive-500 transition-colors rounded-lg hover:bg-olive-50">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => setDeleteConfirm(page.id)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom page form modal */}
      {showForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setShowForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl border border-neutral-100 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <h2 className="text-base font-semibold text-neutral-800">{editingId ? 'Edit Page' : 'New Page'}</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors"><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div>
                  <label className={labelClass}>Page Title</label>
                  <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)}
                    className={inputClass} placeholder="e.g. Our Story" autoFocus />
                </div>
                <div>
                  <label className={labelClass}>URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">/</span>
                    <input type="text" value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                      className={inputClass} placeholder="our-story" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Content</label>
                  <textarea value={form.content} onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={12} className={inputClass + ' resize-y font-mono'} placeholder="HTML content or text..." />
                  <p className="text-xs text-neutral-400 mt-1">You can use HTML tags for formatting (h1, h2, p, ul, etc.)</p>
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.showInHeader}
                      onChange={e => setForm(prev => ({ ...prev, showInHeader: e.target.checked }))}
                      className="w-4 h-4 rounded border-neutral-300 text-olive-500 focus:ring-olive-400" />
                    <span className="text-sm text-neutral-700">Show in header navigation</span>
                  </label>
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">Cancel</button>
                  <button type="submit"
                    className="px-5 py-2.5 bg-olive-500 text-white rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium">
                    {editingId ? 'Save Changes' : 'Create Page'}</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {deleteConfirm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setDeleteConfirm(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-neutral-100">
              <h3 className="text-base font-semibold text-neutral-800 mb-2">Delete Page</h3>
              <p className="text-sm text-neutral-500 mb-5">Are you sure you want to delete this page? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium">Delete</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}