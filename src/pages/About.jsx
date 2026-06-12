import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Leaf, BookOpen, Shield } from 'lucide-react';
import { useAdmin } from '../admin/AdminContext';
import FadeInSection from '../components/FadeInSection';

const valueIcons = [Leaf, BookOpen, Heart, Shield];

export default function About() {
  const { about } = useAdmin();

  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${about.heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-l from-neutral-900/80 via-neutral-900/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <FadeInSection>
            <p className="text-xs font-sans tracking-widest text-olive-300 mb-3">قصتنا</p>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight max-w-2xl">
              {about.heroTitle}
            </h1>
            <p className="text-sm text-olive-300 font-sans mb-6">Beauty Rooted in Nature & Knowledge</p>
            <p className="text-neutral-200 text-base leading-relaxed max-w-xl">
              {about.heroSubtitle}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <p className="text-xs font-sans tracking-widest text-olive-500 mb-3">رسالتنا</p>
            <div className="text-base text-neutral-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
              {about.mission}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-50 py-24 px-6 border-y border-cream-200">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-sans tracking-widest text-olive-600 mb-3">ما نؤمن به</p>
              <h2 className="font-serif text-4xl font-semibold text-neutral-800">قيمنا</h2>
              <div className="mt-4 w-14 h-0.5 bg-olive-400 mx-auto" />
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <FadeInSection key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-olive-200 h-full hover:border-olive-400 transition-colors">
                    <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-serif text-lg text-neutral-800 mb-3">{v.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{v.description}</p>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-sans tracking-widest text-olive-500 mb-3">الرحلة</p>
              <h2 className="font-serif text-4xl font-semibold text-neutral-800">كيف بدأ كل شيء</h2>
              <div className="mt-4 w-14 h-0.5 bg-olive-400 mx-auto" />
            </div>
          </FadeInSection>
          <div className="relative pr-8 border-r-2 border-neutral-200">
            {about.timeline.map((item, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className="mb-8 relative">
                  <div className="absolute -right-[2.6rem] w-5 h-5 bg-neutral-400 rounded-full border-4 border-white shadow-sm" />
                  <p className="text-xs font-sans font-semibold text-olive-500 tracking-widest mb-1">{item.year}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.title}</p>
                  <p className="text-base text-neutral-500 leading-relaxed mt-1">{item.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FadeInSection>
        <section className="bg-neutral-800 py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-sans tracking-widest text-neutral-400 mb-4">انضمي إلى الرحلة</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-5">
              {about.ctaText}
            </h2>
            <p className="text-neutral-300 text-base mb-8 leading-relaxed">
              {about.ctaSubtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles" className="bg-white text-neutral-800 px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:bg-neutral-100 transition-colors shadow-md">
                اقرأي المقالات
              </Link>
              <Link to="/guide" className="border-2 border-white/60 text-white px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:border-white hover:bg-neutral-700 transition-all flex items-center gap-2 justify-center">
                <ArrowLeft size={15} /> دليل صانعي الجمال
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="bg-cream-50 py-6 px-6 border-t border-cream-200">
          <p className="text-xs text-neutral-500 text-center max-w-3xl mx-auto">
            <strong>إخلاء المسؤولية:</strong> جميع المحتويات على هذا الموقع لأغراض تعليمية فقط ولا تُعدّ نصيحة طبية. استشيري متخصصاً صحياً لأي مخاوف صحية.
          </p>
        </section>
      </FadeInSection>
    </main>
  );
}