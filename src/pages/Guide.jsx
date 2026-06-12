import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useAdmin } from '../admin/AdminContext';
import FadeInSection from '../components/FadeInSection';

export default function Guide() {
  const { guideCategories, guideEntries, guidePage } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const categoryParam = searchParams.get('category') || 'all';

  const filteredEntries = guideEntries.filter(entry => {
    const matchCat = categoryParam === 'all' || entry.category === categoryParam;
    const matchQuery =
      !query ||
      entry.nameAr.includes(query) ||
      entry.name.toLowerCase().includes(query.toLowerCase()) ||
      entry.taglineAr.includes(query);
    return matchCat && matchQuery;
  });

  const setCategory = (id) => setSearchParams(id === 'all' ? {} : { category: id });

  return (
    <main>
      {/* Header */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${guidePage.heroImage})` }} />
        <div className="absolute inset-0 bg-neutral-900/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeInSection>
            <p className="text-xs font-sans tracking-widest text-olive-300 mb-3">مكتبة المرجع</p>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mb-4">{guidePage.heroTitle}</h1>
            <p className="text-sm text-olive-300 font-sans mb-3">Beauty Makers Guide</p>
            <p className="text-neutral-200 max-w-xl mx-auto text-base">{guidePage.heroSubtitle}</p>
          </FadeInSection>
        </div>
      </section>

      {/* Sticky filter + search bar */}
      <section className="sticky top-20 z-30 bg-white shadow-md border-b border-neutral-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="بحث"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 36px 7px 16px',
                fontSize: '15px',
                borderRadius: '999px',
                background: '#f2f2f2',
                border: '1px solid #e0e0e0',
                color: '#1a1a1a',
                outline: 'none',
                boxShadow: 'none',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(77,92,74,0.15)'; e.target.style.borderColor = '#4D5C4A'; }}
              onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#e0e0e0'; }}
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all ${
                categoryParam === 'all'
                  ? 'bg-olive-600 text-white shadow-sm ring-2 ring-olive-300'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              جميع المداخل
            </button>
            {guideCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all ${
                  categoryParam === cat.id
                    ? 'bg-olive-600 text-white shadow-sm ring-2 ring-olive-300'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.icon} {cat.titleAr}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category overview */}
      {categoryParam === 'all' && !query && (
        <FadeInSection>
          <section className="bg-cream-50 border-b border-cream-200 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {guideCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="group text-right bg-white rounded-2xl p-6 border border-neutral-100 hover:border-neutral-300 hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-2 group-hover:text-olive-600 transition-colors">{cat.titleAr}</h3>
                  <p className="text-sm text-neutral-500">{cat.descriptionAr}</p>
                </button>
              ))}
            </div>
          </section>
        </FadeInSection>
      )}

      {/* Entries */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {filteredEntries.length === 0 ? (
          <p className="text-center text-neutral-400 py-20">لا توجد نتائج لـ "{query}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredEntries.map((entry, i) => (
              <FadeInSection key={entry.id} delay={i * 60}>
                <Link to={`/guide/${entry.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-olive-100 hover:border-olive-400">
                  <div className="relative overflow-hidden h-52">
                    <img src={entry.image} alt={entry.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-sans px-2.5 py-1 rounded-full font-medium bg-neutral-900 text-white">
                        {guideCategories.find(c => c.id === entry.category)?.titleAr}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-neutral-800 mb-0.5">{entry.nameAr}</h3>
                    <p className="text-xs text-neutral-400 font-sans mb-2">{entry.name}</p>
                    <p className="text-sm text-olive-500 italic mb-3">{entry.taglineAr}</p>
                    <p className="text-xs text-neutral-400 mb-3">الموطن الأصلي: <span className="text-neutral-600">{entry.origin}</span></p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {entry.benefits.slice(0, 2).map(b => (
                        <span key={b} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">{b}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-olive-500 font-sans font-medium group-hover:gap-2 transition-all">
                      <ArrowLeft size={14} /> اقرأي المدخل
                    </span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
