// Standalone serverless function: receives a lead from the static site and
// forwards it to the owner's Telegram. The bot token lives ONLY here as an
// env secret (never shipped to the browser), so the site can stay a static
// export on GitHub Pages while the form still delivers instantly.
//
// Deploy: `cd lead-proxy && vercel deploy --prod`
// Required env vars (set in Vercel project settings):
//   TELEGRAM_BOT_TOKEN  - from @BotFather
//   TELEGRAM_CHAT_ID    - owner's numeric chat id (from @userinfobot)
// Optional:
//   ALLOWED_ORIGIN      - comma-separated allowed origins (defaults below)

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  // Public lead form: allow any origin by default (CORS is not a security
  // boundary for an unauthenticated POST endpoint). Set ALLOWED_ORIGIN to a
  // comma-separated list to restrict which sites the browser will let call it.
  const origin = req.headers.origin;
  const allowlist = process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',').map((s) => s.trim()).filter(Boolean)
    : null;
  const allowOrigin = allowlist
    ? (allowlist.includes(origin) ? origin : allowlist[0])
    : (origin || '*');

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    // Not wired up yet — the site will fall back to opening the mail client.
    return res.status(503).json({ error: 'not_configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { name, phone, company, description, lang } = body || {};

  // Honeypot: bots fill hidden fields. Silently accept to waste their time.
  if (body && body.website) return res.status(200).json({ ok: true });

  if (!name || !phone) return res.status(400).json({ error: 'missing_fields' });

  const text =
    `🔔 <b>Cerere audit nou (${esc(lang) || 'ro'})</b>\n\n` +
    `👤 <b>Nume:</b> ${esc(name)}\n` +
    `📞 <b>Telefon:</b> ${esc(phone)}\n` +
    `🏢 <b>Companie:</b> ${esc(company) || '—'}\n\n` +
    `📝 ${esc(description) || '—'}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    if (!tg.ok) {
      const detail = await tg.text().catch(() => '');
      console.error('telegram_error', tg.status, detail);
      return res.status(502).json({ error: 'telegram_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('proxy_error', err);
    return res.status(500).json({ error: 'proxy_error' });
  }
}
