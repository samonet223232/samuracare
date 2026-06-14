import { Helmet } from 'react-helmet-async';
import { useAdmin } from '../admin/AdminContext';

const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

export default function SeoMeta({ title, description, ogImage, ogType, jsonLd, canonical }) {
  const { seo } = useAdmin();
  const siteTitle = seo?.siteTitle || 'SamuraCare | سامورا كير';
  const siteDesc = seo?.siteDescription || 'موسوعة المكونات الطبيعية للعناية بالبشرة والشعر';
  const defaultOg = seo?.ogImage || '';
  const twitterHandle = seo?.twitterHandle || '';

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const desc = description || siteDesc;
  const image = ogImage || defaultOg;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && (
        <>
          <meta property="og:image" content={image.startsWith('http') ? image : siteUrl + image} />
          <meta name="twitter:image" content={image.startsWith('http') ? image : siteUrl + image} />
        </>
      )}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {canonical && <link rel="canonical" href={canonical.startsWith('http') ? canonical : siteUrl + canonical} />}
      <html lang="ar" dir="rtl" />
      {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}