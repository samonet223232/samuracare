import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Sparkles, BookOpen } from 'lucide-react';
import { articles } from '../data/articles';
import { guideCategories, guideEntries } from '../data/guide';
import FadeInSection from '../components/FadeInSection';

export default function Home() {
  const featuredArticles = articles.slice(0, 5);
  const featuredGuide = guideEntries.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-white/70 via-cream-100/50 to-blush-50/60" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <p className="text-xs font-sans font-medium tracking-widest text-blush-400 mb-4 animate-fade-in">
            طبيعي · صادق · تعليمي — SAMURACARE
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-neutral-800 leading-tight mb-6 animate-fade-up">
            جمال طبيعي،<br />
            <em className="not-italic text-blush-400">صُنع بعناية</em>
          </h1>
          <p className="text-lg text-neutral-600 font-sans font-light leading-relaxed mb-10 max-w-xl mx-auto animate-fade-up">
            اكتشفي عالم مكونات التجميل الطبيعية، ومحتوى العناية الصادق، والوصفات المصنوعة بحب.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Link to="/guide" className="bg-neutral-800 text-white px-8 py-4 rounded-full text-sm font-sans font-medium hover:bg-blush-400 transition-colors duration-300">
              استكشفي الدليل
            </Link>
            <Link to="/articles" className="border border-neutral-400 text-neutral-700 px-8 py-4 rounded-full text-sm font-sans font-medium hover:border-blush-300 hover:text-blush-400 transition-colors duration-300">
              اقرأي المقالات
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-9 rounded-full border-2 border-neutral-400 flex justify-center pt-2">
            <div className="w-1 h-2 bg-neutral-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <FadeInSection>
        <section className="bg-white border-y border-cream-200 py-8">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: <Leaf size={20} />, title: 'طبيعي 100%', sub: 'بدون إضافات ضارة' },
              { icon: <Sparkles size={20} />, title: 'مصنوع يدوياً', sub: 'بنية وإتقان' },
              { icon: <BookOpen size={20} />, title: 'تعليمي', sub: 'اعرفي ما تضعينه على بشرتك' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-center gap-3">
                <span className="text-blush-400">{item.icon}</span>
                <div className="text-right">
                  <p className="font-sans font-medium text-sm text-neutral-800">{item.title}</p>
                  <p className="text-xs text-neutral-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Articles */}
      <section className="bg-cream-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-sans tracking-widest text-sage-400 mb-3">معرفة الجمال</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-neutral-800">المقالات والأدلة</h2>
              <div className="mt-4 w-12 h-px bg-sage-300 mx-auto" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FadeInSection className="lg:col-span-2">
              <Link to={`/articles/${featuredArticles[0].slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full">
                <div className="relative overflow-hidden h-72 md:h-80">
                  <img src={featuredArticles[0].image} alt={featuredArticles[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <span className="text-xs text-blush-400 font-sans">{featuredArticles[0].category}</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-neutral-800 mt-2 mb-3 leading-snug">{featuredArticles[0].title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{featuredArticles[0].excerpt}</p>
                  <span className="text-sm text-blush-400 font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    <ArrowLeft size={14} /> اقرأي المزيد
                  </span>
                </div>
              </Link>
            </FadeInSection>

            <div className="flex flex-col gap-5">
              {featuredArticles.slice(1, 4).map((article, i) => (
                <FadeInSection key={article.id} delay={i * 80}>
                  <Link to={`/articles/${article.slug}`} className="group flex gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-28 shrink-0 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-sage-400 font-sans">{article.category}</span>
                      <h4 className="font-serif text-base text-neutral-800 mt-1 mb-2 leading-snug">{article.title}</h4>
                      <span className="text-xs text-blush-400 font-sans flex items-center gap-1 group-hover:gap-2 transition-all">
                        <ArrowLeft size={12} /> اقرأي المزيد
                      </span>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>

          <FadeInSection>
            <div className="text-center mt-12">
              <Link to="/articles" className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-8 py-3.5 rounded-full text-sm font-sans font-medium hover:border-sage-300 hover:text-sage-400 transition-colors">
                <ArrowLeft size={15} /> عرض جميع المقالات
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <FadeInSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80" alt="مؤسسة سامورا كير" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-blush-100 rounded-2xl p-5 shadow-lg max-w-[190px]">
                <p className="font-serif text-3xl font-semibold text-blush-500">+8</p>
                <p className="text-xs font-sans text-neutral-600 mt-1">سنوات في صياغة منتجات التجميل الطبيعي</p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div>
              <p className="text-xs font-sans tracking-widest text-blush-400 mb-3">قصتنا</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-neutral-800 mb-6 leading-snug">
                متجذرة في الطبيعة،<br />موجَّهة بالمعرفة
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed mb-4">
                وُلدت سامورا كير من فضول عميق حول ما نضعه على بشرتنا. أنا سارة — مُصمِّمة منتجات طبيعية ومعلّمة تجميل، أمضيت سنوات في دراسة علاجات النباتات التقليدية من العالم العربي وما وراءه.
              </p>
              <p className="text-neutral-600 text-base leading-relaxed mb-8">
                مهمتي بسيطة: منحكِ المعرفة لتعتني بنفسك بشكل طبيعي وصادق ومليء بالفرح.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 bg-cream-200 text-neutral-800 px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:bg-blush-100 transition-colors">
                <ArrowLeft size={15} /> اعرفي المزيد
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Guide */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-sans tracking-widest text-blush-300 mb-3">مكتبة المرجع</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">دليل صانعي الجمال</h2>
              <p className="mt-4 text-neutral-400 text-base max-w-xl mx-auto">
                موسوعة منسّقة لمكونات الجمال الطبيعي — أصولها، فوائدها، وطرق استخدامها.
              </p>
              <div className="mt-5 w-12 h-px bg-blush-300 mx-auto" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {guideCategories.map((cat, i) => (
              <FadeInSection key={cat.id} delay={i * 100}>
                <Link to={`/guide?category=${cat.id}`} className="group block bg-neutral-800 hover:bg-neutral-700 rounded-2xl p-8 text-center transition-colors duration-300 border border-neutral-700 hover:border-blush-400">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-2">{cat.titleAr}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{cat.descriptionAr}</p>
                </Link>
              </FadeInSection>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {featuredGuide.map((entry, i) => (
              <FadeInSection key={entry.id} delay={i * 80}>
                <Link to={`/guide/${entry.slug}`} className="group flex items-center gap-4 bg-neutral-800 rounded-xl p-4 hover:bg-neutral-700 transition-colors border border-neutral-700 hover:border-blush-300">
                  <img src={entry.image} alt={entry.nameAr} className="w-14 h-14 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="font-serif text-base text-white">{entry.nameAr}</h4>
                    <p className="text-xs text-blush-300 mt-1">{entry.taglineAr}</p>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <div className="text-center">
              <Link to="/guide" className="inline-flex items-center gap-2 border border-neutral-500 text-neutral-200 px-8 py-3.5 rounded-full text-sm font-sans font-medium hover:border-blush-300 hover:text-blush-300 transition-colors">
                <ArrowLeft size={15} /> استكشفي الدليل كاملاً
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Newsletter */}
      <FadeInSection>
        <section className="bg-blush-50 border-y border-blush-100 py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-sans tracking-widest text-blush-400 mb-3">ابقي على اطلاع</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
              حكمة الجمال، تصلكِ بشكل طبيعي
            </h2>
            <p className="text-neutral-500 text-sm mb-8">
              انضمي إلى مجتمعنا لتصلكِ المقالات الجديدة والوصفات الموسمية وأدلة العناية.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدكِ الإلكتروني"
                className="flex-1 max-w-xs px-5 py-3 rounded-full border border-cream-300 bg-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blush-200"
              />
              <button type="submit" className="bg-neutral-800 text-white px-6 py-3 rounded-full text-sm font-sans font-medium hover:bg-blush-400 transition-colors">
                اشتركي
              </button>
            </form>
            <p className="text-xs text-neutral-400 mt-3">لا رسائل مزعجة. يمكنكِ إلغاء الاشتراك في أي وقت.</p>
          </div>
        </section>
      </FadeInSection>
    </main>
  );
}
