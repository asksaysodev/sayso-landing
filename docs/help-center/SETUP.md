# Docs Sync deployment checklist

This branch is a foundation, not an enabled production bot.

- Provision read-only access to five product repositories and Stills Bot via a narrowly scoped GitHub App; separate publishing identity with landing-only contents/PR permissions.
- Verify production signals per repository (stable desktop release with published assets; web, Map, Composer successful deployed SHA; backend actual production promotion). Reconcile rollbacks and missed events with a durable release ledger.
- Pin Stills Bot harness and product checkouts to released commits. Add Map and Composer adapters, browser recording, and native OS runners where necessary. Never use saved screenshots for changed workflows without verification.
- Add isolated AI analysis, full inventory coverage manifest, source evidence, restricted MDX/media output, screenshot validation, build and link checks. Untrusted product text must not control tools.
- Store DASH_SLACK_BOT_TOKEN in GitHub Actions secrets and DASH_SLACK_CHANNEL_ID in repository variables. Invite Dash to #sayso-marketing-page and grant chat:write. Never share tokens in chat.
- Notify only after verified production deployment of documentation changes; use a durable notification ledger to prevent duplicate notifications. Include affected articles and published release notes in the final implementation.
- Test in preview before enabling hybrid approval. Low-risk automatic publishing must respect existing branch protections; factual or visual changes require review.
