# Lead proxy (website form → Telegram)

Tiny serverless function so the static site can deliver contact-form leads to
Telegram instantly. The bot token stays here as a secret and never reaches the
browser.

## One-time setup

1. Create a Telegram bot: message **@BotFather** → `/newbot` → copy the token.
2. Get your chat id: message **@userinfobot** → copy the numeric `Id`.
   (For a group, add the bot to the group and use the group's chat id.)
3. Deploy this folder:
   ```bash
   cd lead-proxy
   vercel deploy --prod
   ```
4. In the Vercel project settings → Environment Variables, add:
   - `TELEGRAM_BOT_TOKEN` = the BotFather token
   - `TELEGRAM_CHAT_ID`   = your numeric chat id
   - (optional) `ALLOWED_ORIGIN` = `https://a-and-i-automation.com`
5. Redeploy so the env vars take effect.
6. Point the website at it: set `NEXT_PUBLIC_LEAD_ENDPOINT` to
   `https://<your-proxy>.vercel.app/api/lead` in the site's build env
   (GitHub Actions workflow env, or Vercel project env once the site moves there).

Until step 6 is done, the site form gracefully falls back to opening the
visitor's email app addressed to info@a-and-i-automation.com.

## Test it

```bash
curl -X POST https://<your-proxy>.vercel.app/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","phone":"069000000","company":"ACME","description":"hi"}'
```
A configured proxy replies `{"ok":true}` and you get a Telegram message.
Before env vars are set it replies `{"error":"not_configured"}` (503).
