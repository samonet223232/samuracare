import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { articles } from '../data/articles';
import { products } from '../data/products';
import { guideEntries } from '../data/guide';
import FadeInSection from '../components/FadeInSection';

function renderMarkdown(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <h4 key={i} className="font-sans font-semibold text-neutral-800 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h4>;
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="text-neutral-600 text-base leading-relaxed ml-4 list-disc">{line.slice(2)}</li>;
    }
    if (line.startsWith('*') && line.endsWith('*')) {
      return <p key={i} className="text-neutral-400 text-sm italic mt-4 border-l-2 border-cream-300 pl-4">{line.replace(/\*/g, '')}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-neutral-600 text-base leading-relaxed">{line}</p>;
  });
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <main className="pt-32 text-center">
        <p className="text-neutral-500">Article not found.</p>
        <Link to="/articles" className="text-blush-400 mt-4 inline-block">← Back to Articles</Link>
      </main>
    );
  }

  const relatedProducts = products.filter(p => article.relatedProducts?.includes(p.slug));
  const relatedGuide = guideEntries.filter(e => article.relatedGuide?.includes(e.id));
  const moreArticles = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-4xl mx-auto">
          <span className="bg-blush-400 text-white text-xs font-sans px-3 py-1 rounded-full uppercase tracking-widest">
            {article.category}
          </span>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back */}
        <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-blush-400 transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Articles
        </Link>

        {/* Title */}
        <FadeInSection>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-neutral-800 mb-2 leading-snug">{article.title}</h1>
          <p className="text-sm text-neutral-400 font-sans mb-4">{article.arabicTitle}</p>
          <div className="flex items-center gap-5 text-xs text-neutral-400 mb-10">
            <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime} read</span>
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-neutral-500 italic border-l-4 border-blush-200 pl-5 mb-10 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="prose-custom space-y-1">
            {renderMarkdown(article.content)}
          </div>
        </FadeInSection>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeInSection>
            <div className="mt-16 pt-12 border-t border-cream-200">
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-100"
                  >
                    <img src={p.image} alt={p.name} className="w-24 h-24 object-cover shrink-0" />
                    <div className="p-4">
                      <h4 className="font-serif text-base text-neutral-800 mb-1">{p.name}</h4>
                      <p className="text-sm text-neutral-500 leading-snug mb-2">{p.tagline}</p>
                      <span className="text-xs text-blush-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Product <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Related Guide */}
        {relatedGuide.length > 0 && (
          <FadeInSection>
            <div className="mt-12 pt-12 border-t border-cream-200">
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">In the Beauty Makers Guide</h2>
              <div className="flex flex-wrap gap-4">
                {relatedGuide.map(entry => (
                  <Link
                    key={entry.id}
                    to={`/guide/${entry.slug}`}
                    className="group flex items-center gap-3 bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 hover:border-blush-300 transition-colors"
                  >
                    <img src={entry.image} alt={entry.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-sans font-medium text-neutral-700 group-hover:text-blush-400 transition-colors">{entry.name}</p>
                      <p className="text-xs text-neutral-400">{entry.tagline}</p>
                    </div>
                    <ArrowRight size={13} className="text-neutral-400 ml-2 group-hover:text-blush-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* More articles */}
        {moreArticles.length > 0 && (
          <FadeInSection>
            <div className="mt-16 pt-12 border-t border-cream-200">
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">More in {article.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {moreArticles.map(a => (
                  <Link
                    key={a.id}
                    to={`/articles/${a.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img src={a.image} alt={a.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-4">
                      <h4 className="font-serif text-base text-neutral-800 mb-2 leading-snug">{a.title}</h4>
                      <span className="text-xs text-blush-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Disclaimer */}
        <FadeInSection>
          <div className="mt-16 bg-cream-50 border border-cream-200 rounded-xl p-5">
            <p className="text-xs text-neutral-500 text-center">
              <strong>Disclaimer:</strong> This article is for educational purposes only.
              It does not constitute medical advice. Consult a healthcare professional before
              making changes to your skin or health routine.
            </p>
          </div>
        </FadeInSection>
      </article>
    </main>
  );
}
