import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { useAdmin } from '../admin/AdminContext';
import FadeInSection from '../components/FadeInSection';

function renderContent(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <h4 key={i} className="font-sans font-semibold text-neutral-800 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h4>;
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="text-neutral-600 text-base leading-relaxed mr-4 list-disc">{line.slice(2)}</li>;
    }
    if (line.startsWith('*') && line.endsWith('*')) {
      return <p key={i} className="text-neutral-400 text-sm italic mt-4 border-r-2 border-cream-300 pr-4">{line.replace(/\*/g, '')}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-neutral-600 text-base leading-relaxed">{line}</p>;
  });
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const { articles, guideEntries } = useAdmin();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <main className="pt-32 text-center">
        <p className="text-neutral-500">المقال غير موجود.</p>
        <Link to="/articles" className="text-olive-500 mt-4 inline-block">← العودة إلى المقالات</Link>
      </main>
    );
  }

  const relatedGuide = guideEntries.filter(e => article.relatedGuide?.includes(e.id));
  const moreArticles = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <main>
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 px-6 pb-8 max-w-4xl mx-auto">
          <span className="bg-olive-500 text-white text-xs font-sans px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-olive-500 transition-colors mb-8">
          <ArrowRight size={15} /> العودة إلى المقالات
        </Link>

        <FadeInSection>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-neutral-800 mb-4 leading-snug">{article.title}</h1>
          <div className="flex items-center gap-5 text-xs text-neutral-400 mb-10">
            <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(article.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <p className="text-lg text-neutral-500 italic border-r-4 border-olive-200 pr-5 mb-10 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="space-y-1">
            {renderContent(article.content)}
          </div>
        </FadeInSection>

        {relatedGuide.length > 0 && (
          <FadeInSection>
            <div className="mt-16 pt-12 border-t border-cream-200">
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">في دليل صانعي الجمال</h2>
              <div className="flex flex-wrap gap-4">
                {relatedGuide.map(entry => (
                  <Link key={entry.id} to={`/guide/${entry.slug}`} className="group flex items-center gap-3 bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 hover:border-olive-300 transition-colors">
                    <img src={entry.image} alt={entry.nameAr} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-sans font-medium text-neutral-700 group-hover:text-olive-500 transition-colors">{entry.nameAr}</p>
                      <p className="text-xs text-neutral-400">{entry.taglineAr}</p>
                    </div>
                    <ArrowLeft size={13} className="text-neutral-400 mr-2 group-hover:text-olive-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {moreArticles.length > 0 && (
          <FadeInSection>
            <div className="mt-16 pt-12 border-t border-cream-200">
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">مزيد من {article.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {moreArticles.map(a => (
                  <Link key={a.id} to={`/articles/${a.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={a.image} alt={a.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-4">
                      <h4 className="font-serif text-base text-neutral-800 mb-2 leading-snug">{a.title}</h4>
                      <span className="text-xs text-olive-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                        <ArrowLeft size={11} /> اقرأي المزيد
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        <FadeInSection>
          <div className="mt-16 bg-cream-50 border border-cream-200 rounded-xl p-5">
            <p className="text-xs text-neutral-500 text-center">
              <strong>إخلاء المسؤولية:</strong> هذا المقال لأغراض تعليمية فقط ولا يُعدّ نصيحة طبية.
              استشيري متخصصاً في الرعاية الصحية قبل إجراء أي تغييرات على روتين عنايتكِ.
            </p>
          </div>
        </FadeInSection>
      </article>
    </main>
  );
}
