import { useAdmin } from '../AdminContext';

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";
const labelClass = "block text-xs font-medium text-neutral-500 mb-1.5";

export default function SEOManager() {
  const { seo, updateSEO } = useAdmin();

  const handleChange = (field, value) => {
    updateSEO({ [field]: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800 mb-1">SEO Settings</h1>
      <p className="text-sm text-neutral-500 mb-8">Manage search engine optimization for your website</p>

      <div className="space-y-6">
        {/* Global SEO */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-5">Global Settings</h2>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Site Title</label>
              <input className={inputClass} value={seo.siteTitle || ''}
                onChange={e => handleChange('siteTitle', e.target.value)}
                placeholder="SamuraCare | سامورا كير" />
              <p className="text-[11px] text-neutral-400 mt-1">Used as the default title in search results and browser tabs</p>
            </div>
            <div>
              <label className={labelClass}>Site Description</label>
              <textarea className={inputClass + ' h-20'} value={seo.siteDescription || ''}
                onChange={e => handleChange('siteDescription', e.target.value)}
                placeholder="موسوعة المكونات الطبيعية للعناية بالبشرة والشعر" />
              <p className="text-[11px] text-neutral-400 mt-1">Default meta description shown in search results (150-160 chars recommended)</p>
            </div>
            <div>
              <label className={labelClass}>Default OG Image URL</label>
              <input className={inputClass} value={seo.ogImage || ''}
                onChange={e => handleChange('ogImage', e.target.value)}
                placeholder="https://yourdomain.com/og-image.png" dir="ltr" />
              <p className="text-[11px] text-neutral-400 mt-1">Image shown when your site is shared on social media (1200×630px recommended)</p>
              {seo.ogImage && (
                <img src={seo.ogImage} alt="" className="mt-2 h-24 rounded-xl object-cover border border-neutral-100"
                  onError={e => e.target.style.display = 'none'} />
              )}
            </div>
            <div>
              <label className={labelClass}>Twitter Handle</label>
              <input className={inputClass} value={seo.twitterHandle || ''}
                onChange={e => handleChange('twitterHandle', e.target.value)}
                placeholder="@samuracare" dir="ltr" />
            </div>
          </div>
        </div>

        {/* Per-page SEO */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-5">Per-Page Meta Overrides</h2>
          <p className="text-sm text-neutral-500 mb-5">Customize title and description for each main page. Leave blank to use global defaults.</p>
          <div className="space-y-6">
            {[
              { key: 'home', label: 'Home Page', path: '/' },
              { key: 'articles', label: 'Articles Page', path: '/articles' },
              { key: 'guide', label: 'Beauty Guide Page', path: '/guide' },
              { key: 'about', label: 'About Page', path: '/about' },
            ].map(page => (
              <div key={page.key} className="pt-5 first:pt-0 border-t first:border-t-0 border-neutral-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-neutral-800 text-sm">{page.label}</h3>
                  <code className="text-xs text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded">{page.path}</code>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Custom Title</label>
                    <input className={inputClass} value={seo.pageMeta?.[page.key]?.title || ''}
                      onChange={e => handleChange('pageMeta', {
                        ...seo.pageMeta,
                        [page.key]: { ...(seo.pageMeta?.[page.key] || {}), title: e.target.value }
                      })}
                      placeholder={`${page.label} - SamuraCare`} />
                  </div>
                  <div>
                    <label className={labelClass}>Custom Description</label>
                    <textarea className={inputClass + ' h-20'} value={seo.pageMeta?.[page.key]?.description || ''}
                      onChange={e => handleChange('pageMeta', {
                        ...seo.pageMeta,
                        [page.key]: { ...(seo.pageMeta?.[page.key] || {}), description: e.target.value }
                      })}
                      placeholder="Custom meta description for this page..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <h2 className="font-bold text-neutral-800 mb-4">Search Result Preview</h2>
          <div className="bg-white rounded-xl border border-neutral-200 p-4 max-w-lg">
            <p className="text-xs text-green-700 mb-1">{window.location.hostname}</p>
            <p className="text-blue-700 text-lg font-medium leading-tight hover:underline cursor-pointer mb-1">
              {seo.siteTitle || 'SamuraCare | سامورا كير'}
            </p>
            <p className="text-sm text-neutral-600 leading-snug">
              {seo.siteDescription ? seo.siteDescription.substring(0, 160) : 'موسوعة المكونات الطبيعية للعناية بالبشرة والشعر'}
            </p>
          </div>
          <p className="text-xs text-neutral-400 mt-2">This is approximately how your site appears in Google search results</p>
        </div>
      </div>
    </div>
  );
}