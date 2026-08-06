import type { MetadataRoute } from 'next';

const SITE_URL = 'https://a-and-i-automation.com';

// Required under output: 'export'. lastModified is therefore stamped at build
// time, which is what we want for a statically exported site.
export const dynamic = 'force-static';

// One entry: the site is a single page. The nav targets (#services, #process,
// #contact, ...) are anchors on that same page, not separate URLs, so they are
// deliberately NOT listed here. When real per-service routes land (SPEC Phase 3),
// add them then.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
