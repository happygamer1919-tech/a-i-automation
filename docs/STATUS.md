# STATUS — A&I Automation website

Living board for `a-and-i-automation.com`. Served on **:4304**, aggregated on the
multi-project dashboard (**:4302**). Background lives in `docs/SPEC.md`, tickets in
`docs/BACKLOG.md`, owner questions in `docs/QUESTIONS.md`, decisions in `docs/DECISIONS.md`.

**Last updated: 2026-08-06** — reconciled against git and the source tree, not recalled.

| | |
|---|---|
| **Repo** | `happygamer1919-tech/a-i-automation` · local `~/Projects/A&I Web` |
| **Branch** | `main` @ `20cba1b` — clean, 7 PRs merged |
| **Hosting** | **GitHub Pages** via `.github/workflows/deploy.yml` (static export → `out/`). Vercel migration is an open owner question (Q4). |
| **Build** | `npm run build` (Next 15.5.20, `output: 'export'`, `trailingSlash: true`) |
| **Form backend** | Telegram via the standalone `lead-proxy/` (needs bot token + chat ID — Q6) |
| **Languages** | RO (default) / RU / EN, switched client-side by `LangProvider` — one URL for all three |
| **Automated QA** | **NONE.** No test suite, no CI check beyond the build. Contradicts CLAUDE.md ("all QA must be automated and machine-verifiable"). |

## Done

- **P0-1 dead Calendly CTA — interim fix shipped** [#1]. "Rezervă un apel" no longer
  points at bare calendly.com; it routes to the contact form + phone. Final wiring still
  needs the real booking URL from the owner (Q2).
- **P0-2 contact email moved on-domain** [#1] — `info@a-iautomation.com` →
  `info@a-and-i-automation.com`. Deliverability unverified (Q3).
- **P0-3 contact form wired to a real backend** [#2] (`7245e42`) — submissions go to
  Telegram through `lead-proxy/`, a standalone serverless proxy (a static export cannot
  hold the token). Needs the owner's bot token + chat ID before it delivers (Q6).
- **P0-4 boot screen fixed** — verified in `src/components/BootScreen.tsx`: total run is
  ~1s (5 lines × 90ms + 200ms hold + 400ms fade), skippable on any key or tap, skipped
  entirely on repeat visits (`sessionStorage`) and under `prefers-reduced-motion`. The
  hero is not gated on it. **BACKLOG still lists this as TODO — stale.**
- **P1-3 process rail shortened** [#4] (`7a4ed79`) — pinned horizontal rail kept, scroll
  distance cut to 0.6×.
- **P1-4 node graph hover** [#3] (`1ae7b10`) — hovering a tool node highlights its
  category cluster and live connections, `prefers-reduced-motion` respected.
- **P2-1 / P2-3 fake numbers removed** [#5, #7] (`56fe5f1`, `d17b3cc`) — the invented
  telemetry decorations (ERR·137ms, TIME_LOSS %, NEW_TRANSMISSION.exe, SYSTEM_STATUS) and
  the fabricated stat counters are gone, replaced by an honest founding-client offer in
  RO/RU/EN. This was a trust liability per SPEC.
- **P3-1a nav anchors** [#6] (`8b286d2`) — nav items are real anchor links, so sections
  are shareable and indexable.
- **Security** — Next.js bumped 15.1.6 → 15.5.20 (`a21f29e`).

## In Progress

- **SEO foundation** — queued to the factory 2026-08-06 as `200-ai-seo-foundation.md`.
  Covers P3-2 (LocalBusiness + Service JSON-LD — the site currently emits **zero**
  structured data), P3-4 (a real 1200×630 OG image; today OG points at `logo.png`), plus
  `robots.txt` and `sitemap.xml`, neither of which exists.
- **P0-5 hero headline wrap** — queued as `210-ai-hero-orphan.md`. A first fix already
  shipped in `cb0fa3f`: `Hero.tsx` keeps the last two words of `hero_title` together. That
  mechanism is language-agnostic and is **only verified for RO** — RU and EN split
  differently and a forced two-word unit can overflow on narrow screens. 210 finishes it.
- **Automated QA baseline** — queued as `220-ai-playwright-baseline.md`. Playwright +
  a smoke suite, so owner-facing verification stops being manual.

## Blocked

| # | Blocked item | What unblocks it | Owner |
|---|---|---|---|
| **Q2** | P0-1 final booking wiring | The real Calendly (or other booking) URL | **Max** |
| **Q3** | P0-2 email deliverability | Confirm `info@a-and-i-automation.com` actually receives mail, or give the correct address | **Max** |
| **Q6** | P0-3 lead delivery going live | Telegram bot token (@BotFather) + numeric chat ID (@userinfobot) | **Max** |
| **Q4** | Hosting decision | Keep GitHub Pages + a Cloudflare Worker for the form, or migrate to Vercel for per-PR preview URLs. Default if silent: keep Pages + Worker. | **Max** |
| **P2-2** | Founder faces + client logos | Real photos of the two founders and permission-cleared client logos | **Max** |
| **P3-3** | hreflang RO/RU/EN | Needs a routing decision first: hreflang requires one URL per language, but all three languages currently share one URL via client-side switching. Recommended default: `/`, `/ru`, `/en` route segments. | **Max** (one-word answer) |

## Next

1. **SEO foundation, hero wrap, QA baseline** — the three tasks already queued; no owner
   input needed for any of them.
2. **P3-1 per-service pages** — anchors shipped; real routes per service are the SEO win.
   Gated on the same routing decision as P3-3.
3. **P1-2 scrollytelling hero** — the SPEC centrepiece: a real automation playing on
   scroll (WhatsApp lead arrives → bot qualifies → books → writes CRM row → invoices).
   Biggest single design job left, and the strongest demo of the product.
4. **P1-1 motion stack** — gsap + ScrollTrigger and lenis are installed **and wired**
   (`SmoothScroll.tsx`, `Process.tsx`, `Hero.tsx`, `Navbar`, `Footer`, `WhyUs`).
   `framer-motion` and `@gsap/react` are installed but **imported nowhere in `src/`** —
   either wire or drop them (BACKLOG P4-2). Only SplitText is truly missing (a GSAP paid
   plugin). Confirm whether it is worth buying or whether a manual character split is
   enough.
5. **P1-5 kinetic type + magnetic CTAs + view transitions.**
6. **Chase Q6 then Q2/Q3** — the form is built but delivers nowhere until the token lands,
   so every lead the site captures today is lost.

## Rule

> Update this file in the same change as the work, never as a follow-up. The owner does
> not read code — this board and the automated checks are the only proof a task is done.
