# Paste this into the new chat

> You are the brain terminal for **A&I Automation** (`~/Projects/A&I Web`), the agency's own
> site. RapidConstruct is **on hold** — do not touch `~/Projects/rapidconstruct-web`.
>
> Read in this order and then stop and tell me the plan in under ten lines:
> `CLAUDE.md` → `docs/STATUS.md` → `docs/BACKLOG.md` → `docs/QUESTIONS.md`.
>
> Working rules for this chat, because the last one burned a week of usage in two days:
> - **Do not run the full test suite in this chat.** Queue it to a worker.
> - **Do not read images back** unless I ask you to judge one. Send me the file instead.
> - **Keep tool output small** — grep and head, never whole files or whole logs.
> - **One worker at a time**, not two.
> - When a task is finished, say so and stop. I will `/clear` and start the next one.
>
> Start with: what are the three things worth doing first, and which of them need nothing
> from me?

---

# The state of A&I Web, 2026-08-25

**Repo** `happygamer1919-tech/a-i-automation` · branch `main` was at `20cba1b`, 7 PRs merged.
Local working branch `site/board-status-md`, **clean**.
**Hosting** GitHub Pages, static export. **Build** `npm run build` (Next 15.5.20).
⚠️ **No test suite. No CI beyond the build.** `CLAUDE.md` requires automated QA; there is none.

## What is already queued to the factory and needs nothing from Max

| task | what |
|---|---|
| `200-ai-seo-foundation.md` | LocalBusiness + Service JSON-LD (the site emits **zero** structured data), a real 1200x630 OG image (today OG points at `logo.png`), plus `robots.txt` and `sitemap.xml` — **neither file exists** |
| `210-ai-hero-orphan.md` | Hero headline wrap. A fix shipped in `cb0fa3f` keeps the last two words together, but it is **only verified for RO**; RU and EN split differently and can overflow narrow screens |
| `220-ai-playwright-baseline.md` | Playwright plus a smoke suite, so owner-facing verification stops being manual |

⚠️ **Check `~/Projects/prompt-factory/queue/` before assuming these are still there** — the queue
was emptied when RapidConstruct was parked.

## Blocked on Max — chase these, they are cheap to answer

| # | What is blocked | What unblocks it |
|---|---|---|
| **Q6** | ⭐ Lead delivery. **The form is built and delivers nowhere, so every lead the site captures today is lost.** | Telegram bot token (@BotFather) + numeric chat ID (@userinfobot) |
| **Q2** | The "Rezervă un apel" CTA | The real booking URL |
| **Q3** | Contact email | Confirm `info@a-and-i-automation.com` receives mail |
| **Q4** | Hosting | Keep GitHub Pages + a Cloudflare Worker, or move to Vercel for preview URLs. Silent default: keep Pages |
| **Q7 / P3-3** | hreflang and per-service pages | One routing decision: all three languages share one URL today. Recommended: `/`, `/ru`, `/en` |
| **P2-2** | Founder faces, client logos | Real photos and permission-cleared logos |

## The big design job still ahead

**P1-2 scrollytelling hero** — the SPEC centrepiece: a real automation playing on scroll
(WhatsApp lead arrives → bot qualifies → books → writes a CRM row → invoices). It is the single
strongest demonstration of what the agency sells, and it is not started.

⚠️ Motion guardrails from `CLAUDE.md` apply to it: `prefers-reduced-motion` is mandatory, animate
transform and opacity only, the hero renders instantly and is never gated, **no scroll-jacking**,
and every animation must demonstrate the product or the data.

## Loose ends worth one line each

- `framer-motion` and `@gsap/react` are installed but **imported nowhere** in `src/`. Wire or drop.
- Only GSAP **SplitText** is genuinely missing (a paid plugin). Decide: buy, or hand-roll a
  character split.
- `docs/STATUS.md` was last reconciled **2026-08-06**. Treat anything in it as needing a check
  against `git log` before you trust it.
