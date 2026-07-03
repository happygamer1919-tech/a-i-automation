# Decisions Log (append-only)

Each entry: date · decision · why · alternatives considered.

## 2026-07-03 — Project docs scaffolding created
Created SPEC.md (sections 1–5 of handoff), DECISIONS.md, QUESTIONS.md, BACKLOG.md, CLAUDE.md.
Why: working rules require these before execution.

## 2026-07-03 — Deploy is GitHub Pages, NOT Hostinger (handoff was wrong)
Source repo: https://github.com/happygamer1919-tech/a-i-automation (cloned into project root).
`.github/workflows/deploy.yml` builds `next build` (static export, `output: 'export'`) and publishes `out/` to GitHub Pages on push to `main`. `public/CNAME` = a-and-i-automation.com.
Implication: the site is 100% static — no server runtime. A Telegram-webhook form (Q6 = Telegram) CANNOT run on GitHub Pages without exposing the bot token client-side (unacceptable). Requires a small serverless proxy (Cloudflare Worker or Vercel Function) that holds the token as a secret.
Recommendation to surface: either (a) add a single Cloudflare Worker for the form and keep the site on GitHub Pages, or (b) migrate hosting to Vercel (gives per-PR preview URLs, which the owner's click-through verification workflow wants) and keep the domain. Leaning Vercel long-term; not blocking the no-secret Phase 0 fixes.

## 2026-07-03 — Owner answers to open questions
- Q1 source: GitHub repo above (imported).
- Q4 deploy: "suggest better" → discovered GitHub Pages today; recommending Vercel migration (see above).
- Q5 case studies: none → use "founding client" offer in Phase 2.
- Q6 form backend: Telegram webhook → needs serverless proxy (see above).
Still needed from owner: Q2 real Calendly URL, Q3 which mailbox is real, plus Telegram bot token + chat ID for the form.

## 2026-07-03 — Motion stack already present
package.json already includes gsap 3.12.5, @gsap/react, lenis 1.1.18, three, @react-three/fiber, framer-motion 12. Phase 1 stack is largely in place; no new install needed to start.

## 2026-07-03 — Phase 0 safe hotfixes shipped (branch site/p0-hotfixes-safe)
No-secret Phase 0 items, verified in-browser (desktop 1280 + mobile 375):
- P0-4 boot screen: was ~4s blocking. Now <1s total, skippable (any key/tap), and fully skipped under prefers-reduced-motion. Only shows once per tab (kept). CSS fade cut 0.9s→0.4s.
- P0-5 hero headline: trailing gradient phrase (last two words) grouped into one nowrap unit so a short word like "ta" can no longer orphan on its own line. Verified RO desktop + mobile.
- P0-1 booking CTA: dead https://calendly.com/ removed. CALENDLY_URL now '' → button falls back to tel:+37368872444 (a real, working action). When a real URL is set, it auto-switches to opening the booking page in a new tab.
- P0-2 email: info@a-iautomation.com (wrong domain) → info@a-and-i-automation.com everywhere (display + mailto). DELIVERABILITY STILL UNVERIFIED — owner must confirm the mailbox receives mail (Q3).
Still blocked: P0-3 (Telegram form) needs a serverless proxy + bot token/chat ID; P0-1 final needs the real booking URL.
Interim form behavior unchanged: submit opens the visitor's mail client (mailto) to the corrected on-domain address — acceptable stopgap until the Telegram proxy is wired.
`/Users/sm33xy/Projects/A&I Web` contains no source and is not a git repo.
Implication: source code location (Open Question 1) is the gating input. If no source is provided, rebuild from scratch on Next.js App Router per the plan.
