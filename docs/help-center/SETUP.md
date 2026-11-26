# Sayso Docs Sync

## What runs on GitHub

The PR check installs locked dependencies, tests the integration, inventories Help Center articles and builds the website. The historical dry run verifies the stable Desktop v1.3.5 and v1.3.8 releases and compares their resolved commit SHAs on a hosted runner. It performs deterministic dependency matching and a bounded model review. The outbound request is reconstructed entirely from a fixed public Help Center vocabulary and article positions in each batch. No free-form value from an article, product repository or fixture is accepted. The topic combinations can indicate which broad areas changed. A candidate still requires a semantic review before anyone edits an article.

After this PR reaches the default branch, the discovery workflow can reconcile releases every two hours. It reads stable Desktop releases, GitHub Production deployment statuses from Vercel for Web App, Composer, and Map, and Heroku's sayso-server deployment statuses for Backend. Map's customer-facing production domain is map.asksayso.com. Provider errors stop the checkpoint. The first seven days establish an initial window. Later runs overlap the previous successful scan by seven days. Discovery retains a verified predecessor and, where available, at least two distinct production commits so quiet release histories can still be compared. Deployment history outside that window and production changes that lack a GitHub Deployment record may need manual replay. A release without a verified comparison baseline stays pending with a recorded reason. The first Map GitHub deployment uses the verified earlier Vercel production commit documented in the coverage rules, so the integration cutover does not skip earlier Map features.

The separate ledger job writes only to the docs-sync-ledger branch. It stores release identities, observed SHA transitions, public article inventories and review candidates. Private source, patches and raw review inputs stay on the runner. The index matches changed filenames, product terms, article UI labels, links, roles and media. It does not establish that a feature flag is enabled. The ledger records the changed-file count, missing patches, files outside known topic rules, and whether a known topic needs an existing article reviewed or a new article considered. Releases with changes still require a new-article review, including releases with no known topic matches. A verified redeploy of the same commit skips the code review. Configuration-only changes and rollout flags require separate production evidence. The hosted historical replay checks known create and update decisions for Map, Composer, Web App and Desktop against their deployed diffs. Reviewers must confirm availability, exact labels, access requirements and affected media. The Help Center check requires articles that mention Map condition ratings or off-market estimates to link to their reference pages.

The capture workflow resolves the live release before checkout. Desktop and Web use raw Stills Bot adapters pinned to 5b694bcfb36c6ebee3ee9a273f003c63badc0dd7. Map and Composer use source-rendered interactions with fictional inputs. Only generated media from successful runs is retained. Desktop is a browser-rendered Electron interface. Native permission dialogs need a separate native recipe and verification. Do not approve an article with missing or outdated captures. Current recipes cover specific screens, not every feature.

## Configuration

- Install an organization-owned reader GitHub App on the five product repositories and Stills Bot. Grant Contents, Deployments and Pull requests read access, plus implicit Metadata read. Configure repository variable DOCS_SYNC_APP_ID and repository secret DOCS_SYNC_APP_PRIVATE_KEY. Product repositories require no code changes. The built-in landing token owns the ledger.
- The separate publication notification workflow uses DOCS_SYNC_VERCEL_TOKEN to check the live landing alias in the Sayso Web team. Product discovery and capture use the GitHub App credential.
- With the GitHub App settings configured, a change to the credential preflight on the draft branch checks repository scope, reads the verified product commits, and resolves the Map capture commit. Once GitHub registers the workflow on the default branch, use manual dispatch with product_access enabled. The default preflight checks the existing ANTHROPIC_API_KEY against the provider's model-list endpoint and checks the Dash bot identity without posting. DASH_SLACK_CHANNEL_ID accepts a repository variable or secret. The expected channel is C0AFQT4KF1D.
- Leave DOCS_SYNC_ENABLED and DOCS_SYNC_NOTIFY_ENABLED unset until the remaining acceptance tests pass. These switches separately control discovery and notification. Factual generation and automatic publication are not enabled.
- GitHub reported no classic protection or active branch rules on development or main and repository auto-merge disabled at the time of the audit. Establish the intended required checks and review policy before enabling any automatic merge. A low-risk classifier alone cannot authorize a merge.

## Publication receipts

For a docs-only PR from a docs-sync/ branch, add the docs-sync label and a separate line in its body for each verified product reference, in the form `Docs-Sync-Release: sayso-map@<40-character SHA>`. The notification workflow confirms the PR merged into development, the merge commit is in the live landing deployment, the Vercel production alias agrees with GitHub, and product references exist in the ledger. It lists changed article links and media. The ledger reserves a receipt before sending to Dash, preventing duplicate posts during ordinary retries. If the send or receipt confirmation is interrupted, inspect Slack and the receipt before retrying. Pending receipts intentionally suppress automatic resends.

Example Dash message using fictional PR and release references:

> Sayso Help Center published · map abcdef12
> Updated: Change Sayso Map filters
> Recordings: added map-template-example.mp4
> What’s New · Documentation PR

## Examples and limits

The map and composer directories in examples contain 2× screenshots and silent MP4 recordings from verified source. Map source was 319de1819fdc0bf211d05ba05eb45e0a6b0a3a74 and Composer source was 6e9c25e2535e8d373b8fbadc4eb37eb4d37b9fbe. The example Map article is staged outside site content. For a reviewed publication its media URLs must point to the approved files under public/help. The samples establish rendered UI behavior in a fictional session. They do not test live accounts or connected production APIs.

The remote historical dry run covers dependency analysis and public topic classification. Semantic generation, missing article creation, release note consolidation, full asset freshness review, remote private-source captures, end-to-end publication and live Slack delivery still need acceptance testing. Candidate matches are intentionally broad. Production enablement remains blocked.

## Disable or roll back

Set DOCS_SYNC_ENABLED and DOCS_SYNC_NOTIFY_ENABLED to false, cancel active runs, or disable the corresponding workflows in Actions. Keep the ledger and receipts for retry safety. Revert a published article through a reviewed landing PR and the usual production promotion. To revoke product access, suspend the reader installation and revoke its key and Vercel token. No product repository needs a rollback.
