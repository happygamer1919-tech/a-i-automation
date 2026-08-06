import type { MetadataRoute } from 'next';

const SITE_URL = 'https://a-and-i-automation.com';

// Required under output: 'export' -- without it the build fails collecting
// page data for /robots.txt.
export const dynamic = 'force-static';

// Next emits a static out/robots.txt from this file even under output: 'export'.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
