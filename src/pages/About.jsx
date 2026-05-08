import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Leaf, BookOpen, Shield } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

const values = [
  {
    icon: <Leaf size={22} />,
    title: 'الطبيعة أولاً',
    desc: 'نستخدم فقط مكوّنات من الطبيعة. لا عطور صناعية، لا باراباين، لا مواد ضارة — أبداً.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'المعرفة قوة',
    desc: 'نؤمن بأن كل شخص يستحق أن يعرف ما يضعه على بشرته. التعليم هو قلب ما نقدّمه.',
  },
  {
    icon: <Heart size={22} />,
    title: 'مصنوعة بحب',
    desc: 'كل منتج يُصنع في دفعات صغيرة بنية وإتقان. الجودة فوق الكمية، دائماً.',
  },
  {
    icon: <Shield size={22} />,
    title: 'أمانة وشفافية',
    desc: 'قوائم مكونات كاملة، ادعاءات صادقة، ولا مبالغة في الوعود. نحترم ذكاءكِ.',
  },
];

const timeline = [
  { year: '2018', event: 'بدأتُ دراسة صياغة المنتجات الطبيعية وعلاجات النباتات.' },
  { year: '2019', event: 'صنعتُ أول دفعة كريم الأرغان للوجه للعائلة والأصدقاء.' },
  { year: '2021', event: 'أطلقتُ سامورا كير بـ4 منتجات أساسية وبدأتُ مشاركة المحتوى.' },
  { year: '2023', event: 'نشرتُ دليل صانعي الجمال — مرجع تعليمي مجاني للجميع.' },
  { year: '2025', event: 'توسّع خط الإنتاج ليشمل العناية بالوجه والجسم والشعر.' },
  { year: '2026', event: 'نبني مجتمعاً من محبّي الجمال الطبيعي في العالم العربي وما وراءه.' },
];

export default function About() {
  return (
    <main className="pt-24">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-cream-50/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <FadeInSection>
            <p className="text-xs font-sans tracking-widest text-olive-500 mb-3">قصتنا</p>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-neutral-800 mb-4 leading-tight max-w-2xl">
              جمال متجذّر في الطبيعة والمعرفة
            </h1>
            <p className="text-sm text-neutral-400 font-sans mb-6">Beauty Rooted in Nature & Knowledge</p>
            <p className="text-base text-neutral-600 leading-relaxed max-w-xl">
              وُلدت سامورا كير من سؤال بسيط: ماذا أضع على بشرتي حقاً؟ هذا الفضول صار شغفاً، ثم علامة تجارية، ثم رسالة.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Founder */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80" alt="سارة، مؤسسة سامورا كير" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-neutral-800 text-white rounded-2xl p-6 shadow-xl max-w-[200px]">
                <p className="font-serif text-3xl font-semibold text-olive-300">سارة</p>
                <p className="text-xs text-neutral-400 mt-1">المؤسِّسة والمصمِّمة</p>
                <p className="text-xs text-neutral-500 mt-0.5">Founder & Formulator</p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div>
              <h2 className="font-serif text-4xl font-semibold text-neutral-800 mb-6 leading-snug">
                الشخص الذي يقف<br />وراء كل منتج
              </h2>
              <div className="space-y-4 text-base text-neutral-600 leading-relaxed">
                <p>
                  اسمي سارة، وأنا مفتونة دائماً بالعلاقة بين الطبيعة والعلم. حين كنتُ أكبر، شاهدتُ نساء عائلتي يستخدمن علاجات نباتية بسيطة — زيت الزيتون، الحبة السوداء، ماء الورد — منقولة عبر الأجيال.
                </p>
                <p>
                  لاحقاً، وسط صناعة تجميل مليئة بالمكوّنات المعقّدة والادعاءات الكبيرة، عدتُ إلى الأساسيات. درستُ صياغة المنتجات الطبيعية، وقرأتُ عن أعشاب الطب التقليدي في العالم العربي وأفريقيا وما وراءهما، وبدأتُ التجريب في مطبخي.
                </p>
                <p>
                  سامورا كير ثمرة تلك الرحلة. كل منتج أصنعه، أصنعه لنفسي أولاً — ولا أشاركه إلا حين أفخر به. وكل مقال أكتبه، أكتبه لأمنحكِ المعرفة لتتخذي قراراتكِ بثقة.
                </p>
                <p>
                  هذه ليست مجرد علامة تجميلية. هي التزام بالصدق، البساطة، والعناية.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-sans tracking-widest text-olive-500 mb-3">ما نؤمن به</p>
              <h2 className="font-serif text-4xl font-semibold text-neutral-800">قيمنا</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeInSection key={v.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-cream-100 h-full">
                  <div className="w-12 h-12 bg-olive-50 rounded-full flex items-center justify-center mx-auto mb-4 text-olive-500">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-lg text-neutral-800 mb-3">{v.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="text-xs font-sans tracking-widest text-olive-500 mb-3">الرحلة</p>
            <h2 className="font-serif text-4xl font-semibold text-neutral-800">كيف بدأ كل شيء</h2>
          </div>
        </FadeInSection>
        <div className="relative pr-8 border-r-2 border-cream-200">
          {timeline.map((item, i) => (
            <FadeInSection key={item.year} delay={i * 80}>
              <div className="mb-8 relative">
                <div className="absolute -right-[2.6rem] w-5 h-5 bg-olive-300 rounded-full border-4 border-cream-50" />
                <p className="text-xs font-sans font-medium text-olive-500 tracking-widest mb-1">{item.year}</p>
                <p className="text-base text-neutral-600 leading-relaxed">{item.event}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <FadeInSection>
        <section className="bg-neutral-800 py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-sans tracking-widest text-olive-300 mb-4">انضمي إلى الرحلة</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-5">
              الجمال ممارسة، لا مجرّد منتج
            </h2>
            <p className="text-neutral-400 text-base mb-8 leading-relaxed">
              سواء كنتِ تقرأين مقالاتنا أو تتعمّقين في دليل الجمال — يسعدنا وجودكِ هنا.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles" className="bg-olive-500 text-white px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:bg-olive-600 transition-colors">
                اقرأي المقالات
              </Link>
              <Link to="/guide" className="border border-neutral-500 text-neutral-200 px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:border-olive-300 hover:text-olive-300 transition-colors flex items-center gap-2 justify-center">
                <ArrowLeft size={15} /> دليل صانعي الجمال
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="bg-cream-50 py-6 px-6 border-t border-cream-200">
          <p className="text-xs text-neutral-400 text-center max-w-3xl mx-auto">
            <strong>إخلاء المسؤولية:</strong> جميع المحتويات على هذا الموقع — بما فيها المقالات، دليل صانعي الجمال، وأوصاف المنتجات — لأغراض تعليمية فقط ولا تُعدّ نصيحة طبية. استشيري متخصصاً صحياً لأي مخاوف صحية.
          </p>
        </section>
      </FadeInSection>
    </main>
  );
}
