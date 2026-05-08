import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { guideCategories, guideEntries } from '../data/guide';
import FadeInSection from '../components/FadeInSection';

export default function Guide() {
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
    <main className="pt-24">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1400&q=80)' }} />
        <div className="absolute inset-0 bg-neutral-900/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeInSection>
            <p className="text-xs font-sans tracking-widest text-olive-300 mb-3">مكتبة المرجع</p>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mb-4">دليل صانعي الجمال</h1>
            <p className="text-sm text-neutral-400 font-sans mb-3">Beauty Makers Guide</p>
            <p className="text-neutral-300 max-w-xl mx-auto text-base mb-8">
              موسوعة حيّة لمكونات الجمال الطبيعي. اعرفي ما تستخدمينه — أصله، فوائده، طريقة استخدامه، وأي تحذيرات ضرورية.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="ابحثي عن زيت، مكوّن، أو وصفة..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pr-11 pl-5 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-neutral-400 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-olive-300"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-cream-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
              categoryParam === 'all' ? 'bg-olive-500 text-white' : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
            }`}
          >
            جميع المداخل
          </button>
          {guideCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                categoryParam === cat.id ? 'bg-olive-500 text-white' : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
              }`}
            >
              {cat.icon} {cat.titleAr}
            </button>
          ))}
        </div>
      </section>

      {categoryParam === 'all' && !query && (
        <FadeInSection>
          <section className="bg-cream-50 border-b border-cream-200 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {guideCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="group text-right bg-white rounded-2xl p-6 border border-cream-200 hover:border-olive-200 hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-2">{cat.titleAr}</h3>
                  <p className="text-sm text-neutral-500">{cat.descriptionAr}</p>
                </button>
              ))}
            </div>
          </section>
        </FadeInSection>
      )}

      <section className="max-w-7xl mx-auto px-6 py-14">
        {filteredEntries.length === 0 ? (
          <p className="text-center text-neutral-400 py-20">لا توجد نتائج لـ "{query}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredEntries.map((entry, i) => (
              <FadeInSection key={entry.id} delay={i * 60}>
                <Link to={`/guide/${entry.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden h-52">
                    <img src={entry.image} alt={entry.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-sans px-2.5 py-1 rounded-full font-medium ${
                        entry.category === 'oils' ? 'bg-olive-100 text-olive-600' :
                        entry.category === 'ingredients' ? 'bg-olive-100 text-olive-600' :
                        'bg-cream-200 text-neutral-600'
                      }`}>
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
                        <span key={b} className="text-xs bg-cream-100 text-neutral-500 px-2 py-0.5 rounded-full">{b}</span>
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
