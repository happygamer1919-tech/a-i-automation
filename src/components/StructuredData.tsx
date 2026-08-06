// Server component (no 'use client') so the JSON-LD is in the static HTML that
// crawlers see, not injected after hydration.
//
// HONESTY RULE: every value below is copied from somewhere that already exists
// in this repo. Nothing is invented. No rating, no review count, no founding
// year, no price, no opening hours -- those are not published anywhere, so the
// fields are simply absent. SPEC.md records that invented numbers were already
// removed from this site once as a trust liability; do not reintroduce them here.
//
// Organization, not LocalBusiness: LocalBusiness expects published opening hours
// and a price range, which this business has not published.
//
// Copy is the RO variant, matching <html lang="ro"> in layout.tsx.

const SITE_URL = 'https://a-and-i-automation.com';
const ORG_ID = `${SITE_URL}/#organization`;

// [src/lib/i18n.ts:152/154, 160/162, 166/168] -- the three service tiers the
// site actually sells, rendered by src/components/sections/Services.tsx.
const SERVICES = [
  {
    name: 'Strategie & Instrumente',
    description:
      'Audităm fluxurile tale de lucru, identificăm ineficiențele și configurăm instrumentele potrivite (Notion, Slack, Trello, Miro sau ce se potrivește operațiunii tale).',
  },
  {
    name: 'Chatboți & Automatizări',
    description:
      'Construim și implementăm boți și automatizări: boți de onboarding, programări, FAQ, calificare lead-uri. Toate adaptate procesului tău specific.',
  },
  {
    name: 'Agenți AI',
    description:
      'Implementăm un agent AI antrenat pe datele și procesele tale, care preia volumul de muncă al 1-2 angajați, funcționând non-stop, fără pauze.',
  },
];

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'A&I Automation',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        'A&I Automation ajută afacerile din Moldova să elimine munca repetitivă cu instrumente AI, chatboți și agenți inteligenți.',
      email: 'info@a-and-i-automation.com',
      telephone: '+37368872444',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Constantin Brîncuși 112',
        addressLocality: 'Chișinău',
        addressCountry: 'Moldova',
      },
      areaServed: { '@type': 'Country', name: 'Moldova' },
      // sameAs omitted on purpose: this repo contains no social profile links.
    },
    ...SERVICES.map((service) => ({
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'Moldova' },
    })),
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
