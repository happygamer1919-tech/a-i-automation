# A&I Automation — Website Rewrite Spec

Live domain: a-and-i-automation.com
Owner: non-technical. All QA must be automated and machine-verifiable.

## 1. Business context

- A&I Automation: AI automation agency selling to SMBs in Moldova (clinics, restaurants, logistics, retail). Buyers are non-technical business owners.
- Languages: RO (default), RU, EN.
- Positioning: 3 tiers.
  - Tier 01 — Strategy & Tools (audit + tool setup)
  - Tier 02 — Chatbots & Automations (most popular)
  - Tier 03 — AI Agents (24/7, replaces 1–2 FTE workload) + optimization retainer
- Primary CTA: free audit.
- Contact: phone 068 872 444, address Constantin Brincusi 112, Chisinau.

## 2. Current site (as of 2026-07-03)

- Stack: custom Next.js App Router (webpack build, CSS Modules). Client components: BootScreen, SmoothScroll, Navbar, Hero, Problems, Services, Process, Stack, WhyUs, Contact, Footer. Hosted on Hostinger. Single page + anchors.
- Design: cyberpunk/terminal theme. 4s fake "boot" screen before content, katakana decorative columns, HUD-framed cards with fake telemetry (ERR · 137ms, TIME_LOSS 65%), pinned horizontal scroll rail for the 5-step process, animated node graph (WhatsApp, Telegram, Slack, Notion, Claude, OpenAI, Gemini, n8n, Make, Zapier, Airtable) in an "Arsenal" section, count-up stats panel, contact form + Calendly button.

## 3. Audit findings

### Critical bugs (fix first — costing leads today)
1. "Rezerva un apel" button links to bare https://calendly.com/ (placeholder, dead CTA).
2. Email shown is info@a-iautomation.com but domain is a-and-i-automation.com. Leads may be bouncing.
3. Contact form has no visible action/endpoint in markup. Submissions may not arrive.
4. "Impact cuantificabil" stats counter animates to invented values (2,381+ hours saved, etc.). Trust liability.
5. 4-second boot screen blocks all content. Conversion-hostile, wrecks LCP.

### Design weaknesses
- Theme optimized for developers, not SMB buyers (fake ERR tags, NEW_TRANSMISSION.exe, pseudo-metrics, irrelevant katakana).
- Zero social proof: no case studies, testimonials, client logos, or founder faces.
- Hero headline wraps badly (orphan word "ta"); techno display font hard to scan.
- Large dead vertical gaps between sections.
- SEO thin: nav items are <button> (no anchor URLs), no schema.org, no hreflang, OG image is just the logo, single page only.
- No pricing anchors.
- Mobile rendering not verified.

### What is good and stays
- Dark theme + blue/purple gradient accents.
- Trilingual RO/RU/EN setup.
- Section narrative: problem, services, process, stack, why us, contact.
- Next.js as base stack.

## 4. Motion/scroll research (2025–2026, verified July 2026)

- Canonical premium stack: Lenis smooth scroll + GSAP ScrollTrigger (+ SplitText) + optional Three.js. GSAP fully free incl. former Club plugins.
- Motion (ex-Framer Motion) is the React-native default for component-level animation.
- CSS scroll-driven animations: Chrome/Edge 115+, Safari 26; Firefox behind flag. Use only as progressive enhancement inside @supports.
- View Transitions API: same-document broad; cross-document Chrome 126+/Safari 18.2+; degrade gracefully.
- Award-level patterns: scrollytelling, pinned staged reveals, horizontal rails driven by vertical scroll, kinetic typography, motion that demonstrates the product.
- Dated/conversion-hostile: long preloaders, scroll-jacking, heavy parallax, autoplay video backgrounds, decorative-only animation. Rule: every animation must demonstrate the product or the data.
- Guardrails: prefers-reduced-motion mandatory; animate transform/opacity only; hero renders instantly (no LCP gating); lazy-load heavy scenes; test mid-range Android.

## 5. Rewrite plan

Direction: from "cyberpunk terminal" to "engineered premium" (Linear/Vercel/Stripe school). Keep dark + gradients; drop boot screen, katakana, fake telemetry.

- **Phase 0 — hotfixes (ship before redesign):** real Calendly URL, correct email, wire contact form to a real backend, boot screen removed or <1s and skippable, fix hero headline wrap.
- **Phase 1 — motion architecture:** Lenis + GSAP ScrollTrigger + SplitText; Motion for micro-interactions. Centerpiece: scrollytelling hero where a real automation plays as you scroll. Keep pinned horizontal process rail (shorter scroll distance); keep node graph + hover interactivity. Kinetic type, magnetic CTAs, view transitions. prefers-reduced-motion fallbacks everywhere.
- **Phase 2 — trust layer:** case studies with real numbers (2–3 pilots), founder faces, client logos, honest counters or none. If no clients: "founding client" offer.
- **Phase 3 — structure & SEO:** real anchor routes + per-service pages, schema.org (LocalBusiness + Service), hreflang RO/RU/EN, per-language metadata, proper OG images.
