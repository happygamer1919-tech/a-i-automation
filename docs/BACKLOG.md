# Backlog

Ticket format: `[id] title — status — branch`
Status: TODO · BLOCKED · IN PROGRESS · IN REVIEW · DONE
Branch naming: `site/<ticket-id>-<slug>`

> **Reconciled against the source tree and `git log` on 2026-08-06** (PURPLE). Before that
> pass this file listed shipped work as TODO — P0-4 had been done since `cb0fa3f` on
> 2026-07-03 and the backlog never learned. Statuses below carry the **commit or PR that
> proves them**; anything without evidence is genuinely not started.
>
> `docs/STATUS.md` is the board the owner reads. **This file must agree with it** — when
> they disagree, STATUS wins and this file gets fixed in the same change as the work.

---

## Phase 0 — Hotfixes (ship immediately, no design decisions needed)

- **[P0-1] Fix dead Calendly CTA** — **PARTIALLY DONE** (`cb0fa3f`, PR #1) — BLOCKED (Q2) for the rest
  The dead bare `https://calendly.com/` link is gone; the CTA falls back to `tel:` and
  auto-switches to the booking page once a real `CALENDLY_URL` exists. **Remaining:** the
  owner's real booking URL.
- **[P0-2] Fix contact email domain** — **DONE** (`cb0fa3f`, PR #1) — verification BLOCKED (Q3)
  `info@a-iautomation.com` → `info@a-and-i-automation.com` everywhere. **Deliverability is
  still unverified** — nobody has confirmed the mailbox receives mail.
- **[P0-3] Wire contact form to a real backend** — **DONE** (`7245e42`, PR #2) — delivery BLOCKED (Q6)
  Submissions post to Telegram via the standalone `lead-proxy/` (a static export cannot
  hold a token). **It delivers nowhere until the owner supplies the bot token + chat ID**,
  so leads captured today are lost.
- **[P0-4] Remove/shorten boot screen** — **DONE** (`cb0fa3f`, PR #1)
  Verified in `src/components/BootScreen.tsx`: ~1s total (5 lines × 90ms + 200ms hold +
  400ms fade), skippable on any key or tap, skipped entirely on repeat visits
  (`sessionStorage 'boot_done'`) and under `prefers-reduced-motion`. The hero is not gated
  on it. *This ticket sat as TODO for a month after shipping — the stale entry that
  triggered this reconciliation.*
- **[P0-5] Fix hero headline wrap** — **PARTIALLY DONE** (`cb0fa3f`, PR #1) — IN PROGRESS as `210-ai-hero-orphan`
  `Hero.tsx` now keeps the **last two words** of `hero_title` together as one unit so a
  short word cannot orphan. The mechanism is language-agnostic, so it is **only verified
  for RO**; RU and EN split differently and a forced two-word unit can itself overflow on
  narrow screens. Remaining work: verify and tune per language at 375px and 1440px.

## Phase 1 — Motion architecture

- **[P1-1] Install motion stack** — **MOSTLY DONE** — decision needed on SplitText
  Installed **and wired**: `gsap` 3.12.5 + `gsap/ScrollTrigger` (`SmoothScroll.tsx`,
  `Process.tsx`, `Hero.tsx`), `lenis` 1.1.18 (`SmoothScroll.tsx`, `Navbar`, `Footer`,
  `Hero`, `WhyUs`). reduced-motion fallbacks exist in the components that animate.
  Two gaps, both real:
  - **GSAP SplitText is absent** — it is a **paid** GSAP plugin. Open question: buy it, or
    do a manual character/word split? A manual split is enough for the kinetic-type work
    in P1-5. **Owner decision (money).**
  - `framer-motion` 12.0.0 and `@gsap/react` 2.1.1 are in `dependencies` but **imported
    nowhere in `src/`** — see [P4-2].
- **[P1-2] Scrollytelling hero** — TODO — *not started*
  Real automation plays on scroll: WhatsApp lead arrives → bot qualifies → books meeting →
  writes CRM row → sends invoice. The SPEC centrepiece and the biggest job left.
- **[P1-3] Rework process rail** — **DONE** (`7a4ed79`, PR #4)
  Pinned horizontal rail kept, scroll distance cut to 0.6×.
- **[P1-4] Node graph interactivity** — **DONE** (`1ae7b10`, PR #3)
  Hovering a tool node highlights its category cluster and live connections;
  `prefers-reduced-motion` respected.
- **[P1-5] Kinetic type + magnetic CTAs + view transitions** — TODO — *not started*
  Gated on the SplitText decision in P1-1 (or a manual split).

## Phase 2 — Trust layer

- **[P2-1] Case studies with real numbers** — BLOCKED (Q5) — *the removal half is done*
  The **fabricated** stats are gone (`d17b3cc`, PR #7), replaced by an honest
  founding-client offer in RO/RU/EN. Real case studies still need real client numbers
  from the owner. **Invent nothing here — this site has had fabricated figures stripped
  out once already as a trust liability (`docs/SPEC.md`).**
- **[P2-2] Founder faces + client logos** — BLOCKED
  Needs real photos of the two founders and permission-cleared client logos. **Owner.**
- **[P2-3] Honest counters or removal** — **DONE** (`56fe5f1`, PR #5)
  Invented telemetry decorations removed (ERR·137ms, TIME_LOSS %, NEW_TRANSMISSION.exe,
  SYSTEM_STATUS). Nothing fake remains on screen.

## Phase 3 — Structure & SEO

- **[P3-1] Real anchor routes + per-service pages** — **PARTIALLY DONE** (`8b286d2`, PR #6)
  - **P3-1a nav anchors — DONE.** Nav items are real anchor links, so sections are
    shareable and indexable.
  - **P3-1b per-service pages — TODO.** Gated on the same routing decision as P3-3.
- **[P3-2] schema.org (LocalBusiness + Service)** — TODO — IN PROGRESS as `200-ai-seo-foundation`
  Verified by grep: the site emits **zero** structured data today — no `application/ld+json`
  anywhere in `src/`.
- **[P3-3] hreflang RO/RU/EN + per-language metadata** — BLOCKED (routing decision)
  hreflang needs one URL per language, but all three currently share one URL via
  `LangProvider` client-side switching. Recommended default: `/`, `/ru`, `/en` route
  segments. **Owner, one word.**
- **[P3-4] Proper OG images** — TODO — IN PROGRESS as `200-ai-seo-foundation`
  `src/app/layout.tsx` declares `openGraph` but points at `logo.png`; no 1200×630 image
  exists.
- **[P3-5] robots.txt + sitemap.xml** — TODO — IN PROGRESS as `200-ai-seo-foundation`
  *New ticket, 2026-08-06.* Neither exists — `src/app/` contains only `layout.tsx` and
  `page.tsx`. Was inside the queued SEO task but had no backlog entry.

## Phase 4 — Engineering hygiene *(new section, 2026-08-06)*

- **[P4-1] Automated QA baseline** — TODO — IN PROGRESS as `220-ai-playwright-baseline`
  *New ticket.* The site has **no test suite and no CI check beyond the build**, which
  directly contradicts `CLAUDE.md` ("all QA must be automated and machine-verifiable").
  Playwright + a smoke suite. Until this lands, every "done" here rests on manual checks.
- **[P4-2] Drop or use the unused motion dependencies** — TODO
  *New ticket, found during this reconciliation.* `framer-motion` 12.0.0 and
  `@gsap/react` 2.1.1 are declared in `dependencies` but imported nowhere in `src/`.
  Either wire them (P1-5 is the natural consumer) or remove them so the bundle and the
  dependency surface stop carrying weight nothing uses. Low priority, but it is why
  "the motion stack is installed" read as more finished than it was.

---

## Not tickets — owner questions that gate the above

Tracked in `docs/QUESTIONS.md`; repeated here only as the reason a ticket is BLOCKED.

| # | Gates | Needs from the owner |
|---|---|---|
| **Q2** | P0-1 | The real Calendly (or other) booking URL |
| **Q3** | P0-2 | Confirm `info@a-and-i-automation.com` receives mail, or give the right address |
| **Q4** | hosting | Keep GitHub Pages + a Cloudflare Worker for the form, or migrate to Vercel for per-PR previews. Default if silent: keep Pages + Worker. |
| **Q5** | P2-1 | Real client numbers for case studies |
| **Q6** | P0-3 | Telegram bot token (@BotFather) + numeric chat ID (@userinfobot) |
| **—** | P1-1 / P1-5 | Buy GSAP SplitText, or accept a manual character split? |
| **—** | P3-3 / P3-1b | Per-language routes `/`, `/ru`, `/en`? |
