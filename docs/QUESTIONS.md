# Open Questions

Status legend: OPEN (awaiting owner) · ANSWERED · DEFERRED (proceeding on recommended default)

## Q1 — Where is the source code? [ANSWERED]
ANSWER: GitHub repo https://github.com/happygamer1919-tech/a-i-automation — imported into project root. Next.js 15.1.6, React 19, GSAP+Lenis+Three+framer-motion already present.

## Q2 — Real Calendly link [OPEN — blocks P0-1 final]
- Interim fix shipped: CTA no longer dead — points to the contact form + phone.
- Need: the real Calendly (or other booking) URL.
- ANSWER:

## Q3 — Correct contact email (which mailbox actually exists) [OPEN — needs verification]
- Candidates: info@a-iautomation.com (currently shown, wrong domain) vs info@a-and-i-automation.com (matches domain).
- Interim fix shipped: changed to on-domain info@a-and-i-automation.com.
- Need: confirm that mailbox actually receives mail (send a test), or give the correct address.
- ANSWER:

## Q4 — How does it deploy? [ANSWERED + follow-up]
ANSWER: GitHub Pages via `.github/workflows/deploy.yml` (static export → `out/` → Pages on push to main). NOT Hostinger.
- Follow-up (RECOMMENDED): migrate hosting to Vercel for per-PR preview URLs (matches your click-through verification workflow) + serverless functions for the form, keeping the domain. Or keep GitHub Pages + add one Cloudflare Worker for the form. Which do you prefer? Default if silent: keep GitHub Pages, add Cloudflare Worker for the form.
- ANSWER:

## Q5 — Any real client results usable as case studies? [ANSWERED]
ANSWER: None yet → use "founding client" offer in Phase 2. Replace invented stats with the offer.

## Q6 — Form backend = Telegram [ANSWERED, needs secrets]
ANSWER: Telegram webhook to owner. Static site can't hold the token, so a serverless proxy is required.
- Need from owner: (1) Telegram bot token (from @BotFather), (2) your chat ID (numeric — from @userinfobot), (3) approval of endpoint host (Cloudflare Worker vs Vercel Function — see Q4 follow-up).
- ANSWER:
