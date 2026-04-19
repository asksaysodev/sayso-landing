# Blog Writing Schedule

**Created:** 2026-04-19
**Owner:** Jack
**Related:** [blog-publishing-plan.md](./blog-publishing-plan.md), [site-architecture.md](../architecture/site-architecture.md)

The exact order and slash commands to use for writing the 34 remaining blog posts. Check off each post as you generate it.

---

## Overview

- **Total posts to write:** 34
- **Target cadence:** 2 posts per week (Tuesday + Thursday publish dates)
- **Estimated duration:** 17 weeks at 2 posts/week
- **Batch size:** 5 to 10 posts per PR
- **Suggested start publish date:** Tuesday 2026-05-05 (adjust based on when you finish writing and review)

### Why this order

1. **Pillars first.** All 3 remaining cluster pillars go out in the first 2 publish weeks. Supporting posts need their pillar live so internal links point at a real page.
2. **One cluster at a time.** Finish appointment-setting before starting conversation-skills. This builds topical authority cluster by cluster (Google rewards this).
3. **Standalone content last.** The 3 standalone cluster groups (CRM/Notes, Struggle, Data & Authority) go after the 3 main clusters are complete. Lower SEO priority, higher flexibility on when they land.

### Slash command reference

- **Pillar posts:** `/pillar "[target keyword]"`
- **Supporting posts:** `/supporting-post "[target keyword]" cluster:[cluster-slug]`
- **Standalone posts:** see section at the bottom, there is an open question about how to handle these

---

## Phase 1: Launch All 3 Pillars (Weeks 1 to 2)

Write these 3 posts first, in a single batch PR. All 3 get scheduled for the first 2 publish weeks so supporting posts in later batches can link back to them.

| # | Publish slot | Post title | Slug | Target keyword | Command |
|---|---|---|---|---|---|
| 1 | Week 1 Tue | How to Book Appointments in Real Estate (pillar) | `how-to-book-appointments-real-estate` | `how to book appointments real estate` | `/pillar "how to book appointments real estate"` |
| 2 | Week 1 Thu | The Real Estate Conversation Guide (pillar) | `real-estate-conversation-guide` | `how to talk to real estate leads` | `/pillar "how to talk to real estate leads"` |
| 3 | Week 2 Tue | Real Estate Follow-Up Guide (pillar) | `real-estate-follow-up-guide` | `real estate follow up scripts` | `/pillar "real estate follow up scripts"` |

**After Phase 1:** All 3 pillar pages are live. Supporting posts in the following phases can link up to them.

---

## Phase 2: Finish the Appointment Setting Cluster (Weeks 2 to 4)

Complete the appointment-setting cluster before moving on. 4 supporting posts.

| # | Publish slot | Post title | Slug | Target keyword | Command |
|---|---|---|---|---|---|
| 4 | Week 2 Thu | How to Close for the Appointment on a Call | `how-to-close-for-appointment` | `how to close for appointment on call` | `/supporting-post "how to close for appointment on call" cluster:appointment-setting` |
| 5 | Week 3 Tue | When to Ask for the Appointment in Real Estate | `how-many-times-ask-for-appointment` | `when to ask for the appointment real estate` | `/supporting-post "when to ask for the appointment real estate" cluster:appointment-setting` |
| 6 | Week 3 Thu | Why Prospects Do Not Commit to Meetings | `why-prospects-dont-commit` | `why prospects don't commit to meetings` | `/supporting-post "why prospects don't commit to meetings" cluster:appointment-setting` |
| 7 | Week 4 Tue | How to Get Same-Day Appointments in Real Estate | `how-to-get-same-day-appointments` | `how to get same day appointments real estate` | `/supporting-post "how to get same day appointments real estate" cluster:appointment-setting` |

---

## Phase 3: Finish the Conversation Skills Cluster (Weeks 4 to 8)

8 supporting posts. This is the largest cluster.

| # | Publish slot | Post title | Slug | Target keyword | Command |
|---|---|---|---|---|---|
| 8 | Week 4 Thu | How to Build Rapport on Real Estate Calls | `how-to-build-rapport-calls` | `how to build rapport real estate calls` | `/supporting-post "how to build rapport real estate calls" cluster:conversation-skills` |
| 9 | Week 5 Tue | How to Qualify Real Estate Leads on the Phone | `how-to-qualify-leads-on-phone` | `how to qualify real estate leads` | `/supporting-post "how to qualify real estate leads" cluster:conversation-skills` |
| 10 | Week 5 Thu | Questions to Ask Real Estate Leads | `questions-to-ask-real-estate-leads` | `questions to ask real estate leads` | `/supporting-post "questions to ask real estate leads" cluster:conversation-skills` |
| 11 | Week 6 Tue | How to Guide a Sales Conversation | `how-to-guide-a-sales-conversation` | `how to guide a sales conversation` | `/supporting-post "how to guide a sales conversation" cluster:conversation-skills` |
| 12 | Week 6 Thu | How to Keep Control of a Call | `how-to-keep-control-of-a-call` | `how to keep control of a call` | `/supporting-post "how to keep control of a call" cluster:conversation-skills` |
| 13 | Week 7 Tue | What Top Real Estate Agents Say on Calls | `what-top-agents-say-on-calls` | `what top real estate agents say on calls` | `/supporting-post "what top real estate agents say on calls" cluster:conversation-skills` |
| 14 | Week 7 Thu | How to Improve Call Performance in Real Estate | `how-to-improve-call-performance` | `how to improve call performance real estate` | `/supporting-post "how to improve call performance real estate" cluster:conversation-skills` |
| 15 | Week 8 Tue | What Real-Time Call Coaching Actually Looks Like | `what-real-time-call-coaching-looks-like` | `how does AI call coaching work` | `/supporting-post "how does AI call coaching work" cluster:conversation-skills` |

---

## Phase 4: Finish the Follow-Up Cluster (Weeks 8 to 10)

4 supporting posts.

| # | Publish slot | Post title | Slug | Target keyword | Command |
|---|---|---|---|---|---|
| 16 | Week 8 Thu | Follow-Up Scripts for Cold Leads in Real Estate | `follow-up-scripts-cold-leads` | `how to follow up with cold leads real estate` | `/supporting-post "how to follow up with cold leads real estate" cluster:follow-up` |
| 17 | Week 9 Tue | How Often to Follow Up with Real Estate Leads | `how-often-follow-up-real-estate` | `how often should i follow up real estate leads` | `/supporting-post "how often should i follow up real estate leads" cluster:follow-up` |
| 18 | Week 9 Thu | How to Revive Dead Real Estate Leads | `how-to-revive-dead-leads` | `how to revive dead leads real estate` | `/supporting-post "how to revive dead leads real estate" cluster:follow-up` |
| 19 | Week 10 Tue | What to Say to Old Real Estate Leads | `what-to-say-to-old-leads` | `what to say to old leads real estate` | `/supporting-post "what to say to old leads real estate" cluster:follow-up` |

---

## Phase 5: CRM and Notes Standalone (Weeks 10 to 13)

6 standalone posts. See the "Open question on standalone posts" section at the bottom for command handling.

| # | Publish slot | Post title | Slug | Target keyword | Command (pending) |
|---|---|---|---|---|---|
| 20 | Week 10 Thu | Real Estate Call Notes Template | `real-estate-call-notes-template` | `real estate call notes template` | TBD |
| 21 | Week 11 Tue | How to Take Notes During Sales Calls | `how-to-take-notes-during-calls` | `how to take notes during sales calls` | TBD |
| 22 | Week 11 Thu | CRM Note Examples for Real Estate | `crm-note-examples-real-estate` | `crm note examples real estate` | TBD |
| 23 | Week 12 Tue | How to Stay Organized with Real Estate Leads | `how-to-stay-organized-with-leads` | `how to stay organized with leads real estate` | TBD |
| 24 | Week 12 Thu | What to Write in Your CRM After a Call | `what-to-write-in-crm-after-call` | `what should i write in my CRM after a call` | TBD |
| 25 | Week 13 Tue | A Day in the Life of an Agent Using AI Coaching | `day-in-the-life-agent-using-ai-coaching` | `AI coaching real estate agent daily workflow` | TBD |

---

## Phase 6: Struggle and Emotional Standalone (Weeks 13 to 16)

6 standalone posts targeting the emotional and mindset side of calling.

| # | Publish slot | Post title | Slug | Target keyword | Command (pending) |
|---|---|---|---|---|---|
| 26 | Week 13 Thu | I Hate Cold Calling in Real Estate (and What to Do About It) | `i-hate-cold-calling` | `i hate cold calling real estate` | TBD |
| 27 | Week 14 Tue | Why Prospects Ghost After Calls | `why-leads-ghost-after-calls` | `why prospects ghost after calls` | TBD |
| 28 | Week 14 Thu | How to Recover a Bad Sales Call | `how-to-recover-a-bad-call` | `how to recover a bad sales call` | TBD |
| 29 | Week 15 Tue | How to Not Freeze on Sales Calls | `how-to-not-freeze-on-calls` | `how to not freeze on sales calls` | TBD |
| 30 | Week 15 Thu | How to Not Sound Salesy on Calls | `how-to-not-sound-salesy` | `how to not sound salesy on calls` | TBD |
| 31 | Week 16 Tue | How to Think on Your Feet in Sales | `how-to-think-on-your-feet-sales` | `how to think on your feet sales` | TBD |

---

## Phase 7: Data and Authority Standalone (Weeks 16 to 17)

3 standalone posts. These target harder keywords and need original data or analysis. Plan for longer write time per post.

| # | Publish slot | Post title | Slug | Target keyword | Difficulty | Command (pending) |
|---|---|---|---|---|---|---|
| 32 | Week 16 Thu | Real Estate Call Statistics and Data Study | `real-estate-call-data-study` | `real estate call statistics` | HARD | TBD |
| 33 | Week 17 Tue | AI Call Coaching Results in Real Estate | `ai-coaching-results-study` | `ai coaching real estate results` | HARD | TBD |
| 34 | Week 17 Thu | What Separates Top Real Estate Agents on Calls | `what-separates-top-agents-calls` | `what separates top agents on calls` | HARD | TBD |

---

## Open Question: How to Handle Standalone Posts (Phases 5, 6, 7)

The current `/supporting-post` skill only supports 4 clusters: `cold-calling`, `appointment-setting`, `conversation-skills`, `follow-up`. It requires a pillar for the cluster.

The 15 standalone posts (Phases 5, 6, 7) do not have a pillar. Three options to decide before starting Phase 5:

**Option A: Create a `/standalone-post` slash command.** Cleanest long-term. Mirrors `/supporting-post` but skips pillar linking logic. Requires adding a new skill file to `.claude/commands/`.

**Option B: Shoehorn standalones into the nearest existing cluster.** Example: use `cluster:conversation-skills` for Struggle posts (they are related to how you show up on calls). Easier in the short term, but the supporting-post skill will try to link to the conversation-skills pillar, which may not be a natural fit.

**Option C: Write standalones manually (no skill).** You still get the frontmatter and structure, but you write the body yourself or in Google Docs. Good fallback if quality matters more than speed on these posts.

**Recommendation:** Option A. 30 minutes to stand up a new skill, then 15 standalone posts use it cleanly. Flag this as a prerequisite before Phase 5 starts (around Week 10).

---

## Execution Checklist

- [ ] **Before writing starts:** deploy the scheduled-publishing code change (covered in [blog-publishing-plan.md](./blog-publishing-plan.md) section 3)
- [ ] **Batch 1 (Phase 1):** write and schedule 3 pillars
- [ ] **Batch 2 (Phase 2):** write and schedule 4 appointment-setting supporting posts
- [ ] **Batch 3 (Phase 3):** write and schedule 8 conversation-skills supporting posts (split into 2 batches if easier: 4 + 4)
- [ ] **Batch 4 (Phase 4):** write and schedule 4 follow-up supporting posts
- [ ] **Before Phase 5:** decide on standalone command strategy (Option A, B, or C above)
- [ ] **Batch 5 (Phase 5):** write and schedule 6 CRM and Notes posts
- [ ] **Batch 6 (Phase 6):** write and schedule 6 Struggle posts
- [ ] **Batch 7 (Phase 7):** write and schedule 3 Data and Authority posts

---

## Notes

- **Week numbering is relative.** Week 1 starts whenever your first batch is merged and scheduled.
- **Batch sizes can vary.** If you have a writing-heavy weekend, batch 8 posts in one PR. If you only get 3 done, that is fine too. The schedule is the order, not a deadline.
- **If a publish slot slips,** just move everything down by a week. The order matters more than the specific date.
- **After each phase,** check the blog cluster pages on production to confirm the pillar and its supporting posts render correctly with internal links intact.
