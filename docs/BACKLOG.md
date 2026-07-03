# Backlog

Ticket format: `[id] title — status — branch`
Status: TODO · BLOCKED · IN PROGRESS · IN REVIEW · DONE
Branch naming: `site/<ticket-id>-<slug>`

---

## Phase 0 — Hotfixes (ship immediately, no design decisions needed)

- **[P0-1] Fix dead Calendly CTA** — BLOCKED (Q2)
  "Rezerva un apel" points to bare https://calendly.com/. Wire to real booking URL.
- **[P0-2] Fix contact email domain** — BLOCKED (Q3)
  info@a-iautomation.com → correct on-domain mailbox. Verify deliverability.
- **[P0-3] Wire contact form to a real backend** — BLOCKED (Q6)
  Form has no action/endpoint. Route submissions to a real destination + verify arrival.
- **[P0-4] Remove/shorten boot screen** — TODO (no blocker)
  4s blocking preloader → removed or <1s and skippable. Hero renders instantly.
- **[P0-5] Fix hero headline wrap** — TODO (no blocker)
  Orphan word "ta" on its own line; improve scannability.

## Phase 1 — Motion architecture

- **[P1-1] Install motion stack** — TODO
  Lenis + GSAP ScrollTrigger + SplitText; Motion for micro-interactions. reduced-motion fallbacks.
- **[P1-2] Scrollytelling hero** — TODO
  Real automation plays on scroll: WhatsApp lead arrives → bot qualifies → books meeting → writes CRM row → sends invoice.
- **[P1-3] Rework process rail** — TODO
  Keep pinned horizontal rail, shorten scroll distance.
- **[P1-4] Node graph interactivity** — TODO
  Keep node graph, add hover interactivity.
- **[P1-5] Kinetic type + magnetic CTAs + view transitions** — TODO

## Phase 2 — Trust layer

- **[P2-1] Case studies with real numbers** — BLOCKED (Q5)
- **[P2-2] Founder faces + client logos** — TODO
- **[P2-3] Honest counters or removal** — TODO (depends on P2-1)

## Phase 3 — Structure & SEO

- **[P3-1] Real anchor routes + per-service pages** — TODO
- **[P3-2] schema.org (LocalBusiness + Service)** — TODO
- **[P3-3] hreflang RO/RU/EN + per-language metadata** — TODO
- **[P3-4] Proper OG images** — TODO
