import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { articles } from '../data/articles';
import FadeInSection from '../components/FadeInSection';

const categories = ['الكل', ...Array.from(new Set(articles.map(a => a.category)))];

export default function Articles() {
  const [active, setActive] = useState('الكل');
  const filtered = active === 'الكل' ? articles : articles.filter(a => a.category === active);
  const [featured, ...rest] = filtered;

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="bg-olive-100 py-20 px-6 text-center border-b border-olive-200">
        <FadeInSection>
          <p className="text-xs font-sans tracking-widest text-olive-600 mb-3">معرفة الجمال</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-neutral-800 mb-4">المقالات والأدلة</h1>
          <p className="text-xs text-olive-500 font-sans mb-5">Articles & Beauty Guides</p>
          <p className="text-neutral-600 max-w-xl mx-auto text-base">
            محتوى عميق وصادق عن الجمال الطبيعي. تعرّفي على ما تفعله المكونات، وكيف تستخدمينها، وكيف تبنين روتيناً بسيطاً وفعّالاً.
          </p>
        </FadeInSection>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 bg-olive-50/95 backdrop-blur-sm border-b border-olive-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 ${
                active === cat ? 'bg-olive-500 text-white shadow-sm' : 'bg-white text-neutral-600 border border-olive-200 hover:border-olive-400 hover:text-olive-600'
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
            <Link to={`/articles/${featured.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all mb-12 border border-olive-100 hover:border-olive-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative overflow-hidden h-72 md:h-auto">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 bg-olive-500 text-white text-xs font-sans font-medium px-3 py-1 rounded-full">مميّز</span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-xs text-olive-600 font-sans bg-olive-50 border border-olive-200 px-2.5 py-1 rounded-full inline-block mb-4 w-fit">{featured.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-3 leading-snug">{featured.title}</h2>
                  <p className="text-base text-neutral-600 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-olive-500 font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      <ArrowLeft size={14} /> اقرأي المزيد
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock size={12} /> {featured.readTime}
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
              <Link to={`/articles/${article.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full border border-olive-100 hover:border-olive-300">
                <div className="relative overflow-hidden h-52">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-olive-600 bg-olive-50 border border-olive-200 px-2.5 py-0.5 rounded-full font-sans">{article.category}</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-3 leading-snug">{article.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="text-sm text-olive-500 font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    <ArrowLeft size={14} /> اقرأي المزيد
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
