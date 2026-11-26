# Docs Sync

Keeps asksayso.com/help in step with product releases. Fully automatic when every check passes.

## Flow
1. A production release (Vercel Production deploy of Web App, Map or Composer; production Heroku deploy of the backend; stable Desktop release) reaches the organization webhook.
2. The Worker `sayso-docs-sync` (`workers/docs-sync-release`) starts `docs-sync-trigger.yml`, which waits 30 quiet minutes per product. Each new release restarts the timer, so a burst of merges becomes one update. A daily sweep (`docs-sync.yml` schedule) catches anything missed.
3. `docs-sync.yml` compares the last handled release with production, sends only interface files to Claude (`scripts/docs-sync/products.mjs`), and Claude updates articles and screenshots (`scripts/docs-sync/AGENT.md`, Stills Bot renderer).
4. The draft is checked and the site is built; Claude fixes its own draft up to twice.
5. Trusted steps re-check, open the docs PR, wait for Vercel, merge, release to main, confirm the live pages, and post in #sayso-marketing-page.

## Messages
- Channel: "new pages:" / "updated:" lists, or "<Product>: <what was merged in one plain line>. No help center updates needed." (for example "Sayso Map: small map updates. No help center updates needed."). The line is written from commit titles only (`scripts/docs-sync/summarize.mjs`); if it can't be written the post falls back to "Re: Recent merge to production (<Product>), no help center updates needed."
- Thread replies: reply under any Docs Sync post in the channel (no @mention needed) and Dash answers in plain English. Each post carries hidden Slack metadata (product, commits, summary) that the Dash Worker (`asksaysodev/sayso-stills-bot`, `worker/src/docs.js`) reads to answer. Dash only knows what the commit titles and summary say.
- Holds and failures: DM to Kuvaal only, plain English, after automatic retries.

## Switches and secrets
- `DOCS_SYNC_ENABLED=true` (repository variable) turns on the trigger and the daily sweep.
- `DOCS_SYNC_MODEL` (optional variable) overrides the model (default `claude-opus-5-5`).
- Worker secrets: `DISPATCH_TOKEN` (fine-grained token, sayso-landing Contents read/write; **expires**, renew with `npx wrangler secret put DISPATCH_TOKEN --name sayso-docs-sync`), `GITHUB_WEBHOOK_SECRET`.
- Ledger of handled releases: `ledger.json` on the `docs-sync-ledger` branch.
- Manual: Actions > Docs Sync > Run workflow (`dry-run` opens a draft PR only; `live` publishes; `dm-test` sends a test DM).

## Turn it off
Set `DOCS_SYNC_ENABLED` to `false`. Revert a published article with a normal PR and release.
