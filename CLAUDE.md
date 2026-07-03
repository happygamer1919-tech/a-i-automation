# A&I Automation Website — Project Guide

AI automation agency site (a-and-i-automation.com). Owner is non-technical. Trilingual RO (default) / RU / EN.

## Read first
- `docs/SPEC.md` — full spec (business context, audit, motion research, rewrite plan).
- `docs/BACKLOG.md` — phased tickets.
- `docs/QUESTIONS.md` — open questions blocking work (check before starting a blocked ticket).
- `docs/DECISIONS.md` — append-only decision log.

## Working rules
- Feature branches only, never commit to main. Branch naming: `site/<ticket-id>-<slug>`.
- Every PR: plain-language summary + click-through verification checklist for the owner on a preview URL.
- Blocked ticket protocol: write the question to `docs/QUESTIONS.md` with a recommended default, mark BLOCKED, move to the next unblocked ticket. Never idle, never guess product decisions.
- Verify behavior in a real browser (screenshots) before calling anything done. Test mobile viewport explicitly.
- Owner does not read code — all QA must be automated and machine-verifiable.

## Motion guardrails (see SPEC §4)
- prefers-reduced-motion is mandatory. Animate transform/opacity only. Hero renders instantly (no LCP gating).
- Every animation must demonstrate the product or the data. No decorative-only motion, no long preloaders, no scroll-jacking.

## Stack direction
- Next.js App Router. Target aesthetic: "engineered premium" (Linear/Vercel/Stripe). Dark theme + blue/purple gradients kept.
