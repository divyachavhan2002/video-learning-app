import Head from 'next/head';

/**
 * SEO Component - Reusable Head component for meta tags
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} keywords - SEO keywords (optional)
 * @param {string} ogImage - Open Graph image URL (optional)
 * @param {string} canonicalUrl - Canonical URL (optional)
 */
export default function SEO({ 
  title = 'LearnHub',
  description = 'Free video courses on web development, programming, and design',
  keywords = 'online learning, free courses, video tutorials, web development, programming',
  ogImage = '/og-image.jpg',
  canonicalUrl = '',
}) {
  const siteTitle = title === 'LearnHub' ? title : `${title} - LearnHub`;
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
