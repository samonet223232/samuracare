import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
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
      entry.name.toLowerCase().includes(query.toLowerCase()) ||
      entry.arabicName.includes(query) ||
      entry.tagline.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const setCategory = (id) => {
    setSearchParams(id === 'all' ? {} : { category: id });
  };

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1400&q=80)' }}
        />
        <div className="absolute inset-0 bg-neutral-900/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeInSection>
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-blush-300 mb-3">Reference Library</p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-white mb-4">
              Beauty Makers Guide
            </h1>
            <p className="text-sm text-neutral-400 font-sans mb-3">دليل صانعي الجمال</p>
            <p className="text-neutral-300 max-w-xl mx-auto text-base mb-8">
              A living encyclopedia of natural beauty ingredients. Understand what you use
              — its origins, benefits, proper usage, and any warnings.
            </p>
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search oils, ingredients, recipes..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-neutral-400 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blush-300"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-cream-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
              categoryParam === 'all' ? 'bg-neutral-800 text-white' : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
            }`}
          >
            All Entries
          </button>
          {guideCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                categoryParam === cat.id ? 'bg-neutral-800 text-white' : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
              }`}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>
      </section>

      {/* Category overview cards */}
      {categoryParam === 'all' && !query && (
        <FadeInSection>
          <section className="bg-cream-50 border-b border-cream-200 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
              {guideCategories.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="group text-left bg-white rounded-2xl p-6 border border-cream-200 hover:border-blush-200 hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-1">{cat.title}</h3>
                  <p className="text-xs text-neutral-400 mb-2">{cat.arabicTitle}</p>
                  <p className="text-sm text-neutral-500">{cat.description}</p>
                </button>
              ))}
            </div>
          </section>
        </FadeInSection>
      )}

      {/* Entries */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {filteredEntries.length === 0 ? (
          <p className="text-center text-neutral-400 py-20">No entries found matching "{query}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredEntries.map((entry, i) => (
              <FadeInSection key={entry.id} delay={i * 60}>
                <Link
                  to={`/guide/${entry.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={entry.image}
                      alt={entry.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-sans px-2.5 py-1 rounded-full font-medium ${
                        entry.category === 'oils' ? 'bg-sage-100 text-sage-600' :
                        entry.category === 'ingredients' ? 'bg-blush-100 text-blush-500' :
                        'bg-cream-200 text-neutral-600'
                      }`}>
                        {guideCategories.find(c => c.id === entry.category)?.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-neutral-800 mb-0.5">{entry.name}</h3>
                    <p className="text-xs text-neutral-400 font-sans mb-2">{entry.arabicName}</p>
                    <p className="text-sm text-blush-400 italic mb-3">{entry.tagline}</p>
                    <p className="text-xs text-neutral-400 mb-1">Origin: <span className="text-neutral-600">{entry.origin}</span></p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {entry.benefits.slice(0, 2).map(b => (
                        <span key={b} className="text-xs bg-cream-100 text-neutral-500 px-2 py-0.5 rounded-full">{b}</span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-blush-400 font-sans font-medium group-hover:gap-2 transition-all">
                      Read Entry <ArrowRight size={14} />
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
