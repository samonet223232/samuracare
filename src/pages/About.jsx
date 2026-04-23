import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, BookOpen, Shield } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';

const values = [
  {
    icon: <Leaf size={22} />,
    title: 'Natural First',
    ar: 'الطبيعة أولاً',
    desc: 'We only use ingredients that come from nature. No synthetic fragrances, no parabens, no harmful additives — ever.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Knowledge is Power',
    ar: 'المعرفة قوة',
    desc: 'We believe every person should understand what they put on their skin. Education is the heart of what we do.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Handmade with Love',
    ar: 'مصنوعة بحب',
    desc: 'Every product is crafted in small batches with intention. Quality over quantity, always.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Honest & Transparent',
    ar: 'أمانة وشفافية',
    desc: 'Full ingredient lists, honest claims, and no overpromising. We respect your intelligence.',
  },
];

const timeline = [
  { year: '2018', event: 'Started studying natural formulation and plant-based remedies.' },
  { year: '2019', event: 'Made the first batch of argan face cream for family and friends.' },
  { year: '2021', event: 'Launched SamuraCare with 4 core products and began sharing content.' },
  { year: '2023', event: 'Published the Beauty Makers Guide — a free educational reference for all.' },
  { year: '2025', event: 'Expanded the product line to cover face, body, and hair care.' },
  { year: '2026', event: 'Growing a community of natural beauty enthusiasts across the Arab world and beyond.' },
];

export default function About() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1400&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-cream-50/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <FadeInSection>
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-blush-400 mb-3">Our Story</p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-neutral-800 mb-4 leading-tight max-w-2xl">
              Beauty Rooted in Nature & Knowledge
            </h1>
            <p className="text-sm text-neutral-400 font-sans mb-6">جمال متجذر في الطبيعة والمعرفة</p>
            <p className="text-base text-neutral-600 leading-relaxed max-w-xl">
              SamuraCare was born from a simple question: what am I really putting on my skin?
              That curiosity became a passion, a brand, and a mission.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Founder story */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80"
                  alt="Sara, founder of SamuraCare"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-neutral-800 text-white rounded-2xl p-6 shadow-xl max-w-[200px]">
                <p className="font-serif text-3xl font-light text-blush-300">Sara</p>
                <p className="text-xs text-neutral-400 mt-1">Founder & Formulator</p>
                <p className="text-xs text-neutral-500 mt-0.5">مؤسسة ومُصمِّمة</p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={150}>
            <div>
              <h2 className="font-serif text-4xl font-light text-neutral-800 mb-6 leading-snug">
                The Person Behind<br />Every Product
              </h2>
              <div className="space-y-4 text-base text-neutral-600 leading-relaxed">
                <p>
                  My name is Sara, and I've always been fascinated by the intersection of nature and science.
                  Growing up, I watched the women in my family use simple, plant-based remedies — olive oil,
                  black seed, rose water — that had been passed down through generations.
                </p>
                <p>
                  Years later, surrounded by a beauty industry filled with complex ingredient lists
                  and bold claims, I went back to basics. I studied natural formulation, read about
                  traditional herbalism from across the Arab world, Africa, and beyond, and began
                  experimenting in my kitchen.
                </p>
                <p>
                  SamuraCare is the result of that journey. Every product I make, I make for myself
                  first — and only share it when I'm proud of it. Every article I write, I write to
                  give you the knowledge to make your own informed choices.
                </p>
                <p>
                  This isn't just a beauty brand. It's a commitment to honesty, simplicity, and care.
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
              <p className="text-xs font-sans tracking-[0.3em] uppercase text-blush-400 mb-3">What We Stand For</p>
              <h2 className="font-serif text-4xl font-light text-neutral-800">Our Values</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeInSection key={v.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-cream-100 h-full">
                  <div className="w-12 h-12 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blush-400">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-lg text-neutral-800 mb-1">{v.title}</h3>
                  <p className="text-xs text-neutral-400 font-sans mb-3">{v.ar}</p>
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
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-blush-400 mb-3">The Journey</p>
            <h2 className="font-serif text-4xl font-light text-neutral-800">How It All Began</h2>
          </div>
        </FadeInSection>
        <div className="relative pl-8 border-l-2 border-cream-200">
          {timeline.map((item, i) => (
            <FadeInSection key={item.year} delay={i * 80}>
              <div className="mb-8 relative">
                <div className="absolute -left-[2.6rem] w-5 h-5 bg-blush-300 rounded-full border-4 border-cream-50" />
                <p className="text-xs font-sans font-medium text-blush-400 tracking-widest uppercase mb-1">{item.year}</p>
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
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-blush-300 mb-4">Join the Journey</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-5">
              Beauty is a Practice, Not a Product
            </h2>
            <p className="text-neutral-400 text-base mb-8 leading-relaxed">
              Whether you're exploring our products, reading our articles, or diving into the
              Beauty Makers Guide — we're glad you're here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-blush-400 text-white px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:bg-blush-500 transition-colors"
              >
                Explore Products
              </Link>
              <Link
                to="/guide"
                className="border border-neutral-500 text-neutral-200 px-7 py-3.5 rounded-full text-sm font-sans font-medium hover:border-blush-300 hover:text-blush-300 transition-colors flex items-center gap-2 justify-center"
              >
                Beauty Makers Guide <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Disclaimer */}
      <FadeInSection>
        <section className="bg-cream-50 py-6 px-6 border-t border-cream-200">
          <p className="text-xs text-neutral-400 text-center max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> SamuraCare products are handmade cosmetics. All content on this website
            — including articles, the Beauty Makers Guide, and product descriptions — is for educational purposes only
            and does not constitute medical advice. Consult a healthcare professional for any health concerns.
          </p>
        </section>
      </FadeInSection>
    </main>
  );
}
