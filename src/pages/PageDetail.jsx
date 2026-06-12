import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../admin/AdminContext';
import { ArrowRight } from 'lucide-react';

export default function PageDetail() {
  const { slug } = useParams();
  const { pages } = useAdmin();
  const page = pages.find(p => p.slug === slug);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-800 mb-2">Page not found</h1>
          <p className="text-neutral-500 mb-4">The page you're looking for doesn't exist.</p>
          <Link to="/" className="text-olive-500 hover:text-olive-600 font-medium text-sm inline-flex items-center gap-1">
            <ArrowRight size={16} />
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-olive-500 transition-colors mb-4"
          >
            <ArrowRight size={14} />
            Back to home
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-800 leading-tight">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div
          className="prose prose-lg max-w-none"
          dir="rtl"
          style={{
            color: '#404040',
            lineHeight: '1.9',
            fontSize: '17px',
          }}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}