import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export const SEOHead = ({ 
  title = 'Financial Empire - AI-Powered Trading Platform',
  description = 'Build your financial empire with AI-powered trading, comprehensive learning management, and wealth-building tools.',
  canonical,
  ogImage = '/og-image.png'
}: SEOHeadProps) => {
  const fullTitle = title.includes('Financial Empire') ? title : `${title} - Financial Empire`
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
    </Head>
  )
}