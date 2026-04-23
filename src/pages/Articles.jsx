import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { articles } from '../data/articles';
import FadeInSection from '../components/FadeInSection';

const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

export default function Articles() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? articles : articles.filter(a => a.category === active);
  const [featured, ...rest] = filtered;

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="bg-sage-50 py-20 px-6 text-center">
        <FadeInSection>
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-sage-500 mb-3">Beauty Knowledge</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-neutral-800 mb-4">Articles & Guides</h1>
          <p className="text-xs text-neutral-400 font-sans mb-5">مقالات وأدلة الجمال الطبيعي</p>
          <p className="text-neutral-500 max-w-xl mx-auto text-base">
            In-depth, honest content about natural beauty. Learn what ingredients do,
            how to use them, and how to build a simple, effective routine.
          </p>
        </FadeInSection>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-cream-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-neutral-800 text-white'
                  : 'bg-cream-100 text-neutral-600 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured article */}
        {featured && (
          <FadeInSection>
            <Link
              to={`/articles/${featured.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative overflow-hidden h-72 md:h-auto">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 text-blush-400 text-xs font-sans font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-xs text-sage-500 font-sans uppercase tracking-widest mb-3">{featured.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-3 leading-snug">{featured.title}</h2>
                  <p className="text-sm text-neutral-400 font-sans mb-4">{featured.arabicTitle}</p>
                  <p className="text-base text-neutral-600 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blush-400 font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock size={12} /> {featured.readTime} read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeInSection>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {rest.map((article, i) => (
            <FadeInSection key={article.id} delay={i * 80}>
              <Link
                to={`/articles/${article.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-sage-500 font-sans uppercase tracking-widest">{article.category}</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock size={11} /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-2 leading-snug">{article.title}</h3>
                  <p className="text-xs text-neutral-400 font-sans mb-3">{article.arabicTitle}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="text-sm text-blush-400 font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>
    </main>
  );
}
