import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import { guideEntries } from '../data/guide';
import FadeInSection from '../components/FadeInSection';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <main className="pt-32 text-center">
        <p className="text-neutral-500">Product not found.</p>
        <Link to="/products" className="text-blush-400 mt-4 inline-block">← Back to Products</Link>
      </main>
    );
  }

  const relatedGuide = guideEntries.filter(e => product.relatedIngredients?.includes(e.id));
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back */}
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-blush-400 transition-colors mb-10">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Main product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-20">
          <FadeInSection>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div>
              <span className="text-xs font-sans tracking-widest uppercase text-blush-400">{product.category}</span>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-neutral-800 mt-2 mb-1">{product.name}</h1>
              <p className="text-sm text-neutral-400 font-sans mb-6">{product.arabicName}</p>
              <p className="text-base text-neutral-600 leading-relaxed mb-8">{product.description}</p>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="font-serif text-lg text-neutral-700 mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-neutral-600">
                      <CheckCircle size={15} className="text-sage-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skin type */}
              <div className="bg-cream-50 border border-cream-200 rounded-xl p-5 mb-6">
                <p className="text-xs font-sans font-medium uppercase tracking-widest text-neutral-500 mb-1">Best For</p>
                <p className="text-sm text-neutral-700">{product.skinType}</p>
              </div>

              {/* Usage */}
              <div className="bg-sage-50 border border-sage-100 rounded-xl p-5">
                <p className="text-xs font-sans font-medium uppercase tracking-widest text-sage-500 mb-1">How to Use</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{product.usage}</p>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Ingredients */}
        <FadeInSection>
          <div className="mb-16">
            <h2 className="font-serif text-2xl text-neutral-800 mb-5">Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ing => (
                <span key={ing} className="bg-cream-100 text-neutral-700 text-sm px-4 py-2 rounded-full border border-cream-200">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Related Guide Entries */}
        {relatedGuide.length > 0 && (
          <FadeInSection>
            <div className="mb-16">
              <h2 className="font-serif text-2xl text-neutral-800 mb-2">Learn About the Ingredients</h2>
              <p className="text-sm text-neutral-500 mb-6">Explore these entries in our Beauty Makers Guide</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedGuide.map((entry) => (
                  <Link
                    key={entry.id}
                    to={`/guide/${entry.slug}`}
                    className="group flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-cream-100"
                  >
                    <img src={entry.image} alt={entry.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div>
                      <h4 className="font-serif text-base text-neutral-800">{entry.name}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 mb-2">{entry.tagline}</p>
                      <span className="text-xs text-blush-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View in Guide <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeInSection>
            <div>
              <h2 className="font-serif text-2xl text-neutral-800 mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-neutral-800 mb-1">{p.name}</h3>
                      <p className="text-sm text-neutral-500">{p.tagline}</p>
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
