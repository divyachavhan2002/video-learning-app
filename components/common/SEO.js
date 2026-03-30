import Head from 'next/head';
import { getString } from '@/config';

/**
 * SEO Component - Reusable Head component for meta tags
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - SEO keywords (optional)
 * @param {string} ogImage - Open Graph image URL (optional)
 * @param {string} canonicalUrl - Canonical URL (optional)
 */
export default function SEO({ 
  title = '',
  description = '',
  keywords = '',
  ogImage = '/og-image.jpg',
  canonicalUrl = '',
}) {
  const finalTitle = title || getString('seo.defaultTitle');
  const finalDescription = description || getString('seo.defaultDescription');
  const finalKeywords = keywords || getString('seo.defaultKeywords');
  const appName = getString('appName');
  const siteTitle = finalTitle.includes(appName) ? finalTitle : `${finalTitle} - ${appName}`;
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
