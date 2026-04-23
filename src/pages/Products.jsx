import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import FadeInSection from '../components/FadeInSection';

const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

export default function Products() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? products : products.filter(p => p.category === active);

  return (
    <main className="pt-24">
      {/* Page header */}
      <section className="bg-cream-100 py-20 px-6 text-center">
        <FadeInSection>
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-blush-400 mb-3">Small Batches · Pure Ingredients</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-neutral-800 mb-4">Our Products</h1>
          <p className="text-xs text-neutral-400 font-sans mb-5">منتجاتنا الطبيعية</p>
          <p className="text-neutral-500 max-w-xl mx-auto text-base">
            Every product is handcrafted with carefully chosen natural ingredients.
            We believe in full transparency — you'll always know what's inside.
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

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <FadeInSection key={product.id} delay={i * 80}>
              <Link
                to={`/products/${product.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-sm text-neutral-700 text-xs font-sans px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-0.5">{product.name}</h3>
                  <p className="text-xs text-neutral-400 font-sans mb-3">{product.arabicName}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{product.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.ingredients.slice(0, 3).map((ing) => (
                      <span key={ing} className="text-xs bg-cream-100 text-neutral-600 px-2.5 py-1 rounded-full">
                        {ing}
                      </span>
                    ))}
                    {product.ingredients.length > 3 && (
                      <span className="text-xs bg-cream-100 text-neutral-400 px-2.5 py-1 rounded-full">
                        +{product.ingredients.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-blush-400 font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <FadeInSection>
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-cream-100 rounded-2xl p-6 text-center border border-cream-200">
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              <strong className="text-neutral-600">Disclaimer:</strong> All content on this site is for educational
              purposes only. Our products are handmade cosmetics and are not intended to diagnose, treat, cure,
              or prevent any medical condition. Always perform a patch test before use.
            </p>
          </div>
        </section>
      </FadeInSection>
    </main>
  );
}
