import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { guideEntries, guideCategories } from '../data/guide';
import { articles } from '../data/articles';
import FadeInSection from '../components/FadeInSection';

export default function GuideDetail() {
  const { slug } = useParams();
  const entry = guideEntries.find(e => e.slug === slug);

  if (!entry) {
    return (
      <main className="pt-32 text-center">
        <p className="text-neutral-500">المدخل غير موجود.</p>
        <Link to="/guide" className="text-olive-500 mt-4 inline-block">← العودة إلى الدليل</Link>
      </main>
    );
  }

  const category = guideCategories.find(c => c.id === entry.category);
  const relatedArticles = articles.filter(a => entry.relatedArticles?.includes(a.slug));
  const moreEntries = guideEntries.filter(e => e.id !== entry.id && e.category === entry.category).slice(0, 3);

  return (
    <main className="pt-24">
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={entry.image} alt={entry.nameAr} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 px-6 pb-8 max-w-5xl mx-auto">
          <span className="inline-block bg-white/20 backdrop-blur text-white text-xs font-sans px-3 py-1 rounded-full mb-3 border border-white/30">
            {category?.icon} {category?.titleAr}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">{entry.nameAr}</h1>
          <p className="text-sm text-white/70 mt-1">{entry.name}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/guide" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-olive-500 transition-colors mb-10">
          <ArrowRight size={15} /> العودة إلى دليل صانعي الجمال
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <FadeInSection>
              <p className="font-serif text-xl italic text-olive-500 mb-6">"{entry.taglineAr}"</p>

              <div className="mb-8">
                <h2 className="font-serif text-2xl text-neutral-800 mb-4">الفوائد</h2>
                <ul className="space-y-2.5">
                  {entry.benefits.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm text-neutral-600">
                      <CheckCircle size={15} className="text-olive-400 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cream-50 border border-cream-200 rounded-xl p-6 mb-6">
                <h3 className="font-serif text-lg text-neutral-800 mb-3">طريقة الاستخدام</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{entry.usage}</p>
              </div>

              <div className="bg-olive-50 border border-olive-100 rounded-xl p-6 mb-6">
                <h3 className="font-serif text-lg text-neutral-800 mb-3">مناسب لـ</h3>
                <p className="text-sm text-neutral-600">{entry.suitability}</p>
              </div>

              {entry.warnings && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-amber-700 mb-1">ملاحظات مهمة</h3>
                      <p className="text-sm text-amber-700 leading-relaxed">{entry.warnings}</p>
                    </div>
                  </div>
                </div>
              )}
            </FadeInSection>
          </div>

          <FadeInSection delay={100}>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-cream-100 p-6">
                <h3 className="font-serif text-lg text-neutral-800 mb-4">معلومات سريعة</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs font-sans tracking-widest text-neutral-400 mb-1">الموطن الأصلي</dt>
                    <dd className="text-sm text-neutral-700">{entry.origin}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-sans tracking-widest text-neutral-400 mb-1">الفئة</dt>
                    <dd className="text-sm text-neutral-700">{category?.titleAr}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-sans tracking-widest text-neutral-400 mb-1">الاسم بالإنجليزية</dt>
                    <dd className="text-sm text-neutral-700 font-sans">{entry.name}</dd>
                  </div>
                </dl>
              </div>

              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-cream-100 p-6">
                  <h3 className="font-serif text-lg text-neutral-800 mb-4">مقالات ذات صلة</h3>
                  <div className="space-y-3">
                    {relatedArticles.map(a => (
                      <Link key={a.id} to={`/articles/${a.slug}`} className="group block hover:bg-cream-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                        <p className="text-sm font-serif text-neutral-700 group-hover:text-olive-500 transition-colors leading-snug">{a.title}</p>
                        <span className="text-xs text-neutral-400 flex items-center gap-1 mt-1 group-hover:gap-1.5 transition-all">
                          <ArrowLeft size={10} /> اقرأي
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeInSection>
        </div>

        {moreEntries.length > 0 && (
          <FadeInSection>
            <div className="mt-16 pt-12 border-t border-cream-200">
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">المزيد من {category?.titleAr}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {moreEntries.map(e => (
                  <Link key={e.id} to={`/guide/${e.slug}`} className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-100">
                    <img src={e.image} alt={e.nameAr} className="w-20 h-20 object-cover shrink-0" />
                    <div className="p-3">
                      <h4 className="font-serif text-base text-neutral-800">{e.nameAr}</h4>
                      <p className="text-xs text-olive-500 mt-1">{e.taglineAr}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}
      </div>
    </main>
  );
}
