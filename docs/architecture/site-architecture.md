# Sayso — Complete Site Architecture & Keyword Map

**Updated:** April 3, 2026
**Total Pages:** ~105–115

---

## Complete File & Folder Structure

Every page on the site, organized by folder. Each entry shows the URL path, the target keyword phrase, and the SEO difficulty rating.

### Difficulty Key

| Rating | Meaning | Timeline |
|---|---|---|
| 🟢 WIN | Winnable today — low/no competition | Rank in 2–6 weeks |
| 🟡 MED | Medium competition — needs cluster authority | 3–6 months |
| 🔴 HARD | High competition — needs backlinks + time | 6–12 months |
| ⚪ NONE | No keyword target — conversion/trust/legal page | N/A |

---

### / (Root)

```
/                                           "real-time AI coaching real estate"                          🟡 MED
├── /about/                                 (no keyword — trust page)                                   ⚪ NONE
├── /contact/                               (no keyword — trust page)                                   ⚪ NONE
├── /demo/                                  (no keyword — conversion page)                              ⚪ NONE
├── /pricing/                               "sayso pricing"                                             🟢 WIN
├── /privacy/                               (legal)                                                     ⚪ NONE
├── /terms/                                 (legal)                                                     ⚪ NONE
├── /security/                              (no keyword — trust page)                                   ⚪ NONE
├── /referral/                              (no keyword — program page)                                 ⚪ NONE
├── /affiliate/                             (no keyword — program page)                                 ⚪ NONE
└── /why-sayso/                             "why switch to sayso"                                       🟢 WIN
```

---

### /features/

```
/features/                                  (hub — no keyword target)                                   ⚪ NONE
├── /features/real-time-coaching/           "real time sales help"                                      🟡 MED
│   ⚠️  SEO NOTE (2026-04-05): H1 changed from keyword-rich "Real-Time Sales Help — AI That
│   Coaches You Through Every Call" to branded "Cue - Real-Time Coaching" per co-founder
│   feedback. The primary keyword "real time sales help" is no longer in the H1. It is still
│   present in seoTitle, seoDescription, and body copy. Monitor rankings for this keyword
│   and consider restoring keyword-rich H1 if organic traffic drops.
├── /features/objection-handling/           "real estate objection handling scripts"                    🟡 MED
└── /features/call-notes/                   "automatic call notes real estate"                          🟢 WIN
```

---

### /for/

```
/for/                                       (hub — no keyword target)                                   ⚪ NONE
├── /for/solo-agents/                       "how to be more efficient real estate agent"                🟡 MED
├── /for/team-leaders/                      "how to manage high volume leads real estate"               🟡 MED
├── /for/new-agents/                        "how to get better at cold calling real estate"             🟡 MED
└── /for/isas/                              "ISA conversion scripts real estate"                        🟢 WIN
```

---

### /integrations/

```
/integrations/                              "tools for real estate note taking"                         🟢 WIN
├── /integrations/follow-up-boss/           "follow up boss AI integration"                            🟢 WIN
├── /integrations/sierra-interactive/       "sierra interactive AI coaching"                            🟢 WIN
└── /integrations/kvcore/                   "kvcore AI integration"                                    🟢 WIN
```

**Note:** CRM-specific keywords may have near-zero volume today. These pages are trust signals and conversion aids, not traffic drivers.

---

### /compare/

```
/compare/                                   (hub — no keyword target)                                   ⚪ NONE
├── /compare/sayso-vs-shilo/               "shilo alternative"                                         🟢 WIN
├── /compare/sayso-vs-maverickre/          "maverickre alternative"                                    🟢 WIN
└── /compare/sayso-vs-manual-coaching/      "real estate coaching AI vs manual"                          🟡 MED
```

---

### /objections/

```
/objections/                                "real estate phone objection examples"                      🟢 WIN
├── /objections/already-have-an-agent/      "how to handle 'already working with agent'"               🟢 WIN
├── /objections/not-ready-yet/              "how to handle 'not ready yet' real estate"                🟢 WIN
├── /objections/just-looking/               "how to respond to 'just looking' real estate"             🟢 WIN
├── /objections/call-me-later/              "real estate script for 'call me later'"                   🟢 WIN
├── /objections/price-too-high/             "how to handle price objection real estate"                🟢 WIN
├── /objections/want-to-sell-ourselves/     "FSBO objection handling"                                  🟢 WIN
├── /objections/need-to-think-about-it/     "what to say when prospect shuts down"                     🟢 WIN
├── /objections/not-interested/             "what to say when lead is not interested"                   🟢 WIN
├── /objections/already-listed/             "how to handle already listed objection"                    🟢 WIN
├── /objections/bad-experience-with-agents/ "how to handle bad agent experience objection"              🟢 WIN
├── /objections/market-is-bad/              "how to handle market objection real estate"                🟢 WIN
├── /objections/just-send-listings/         "how to redirect a conversation real estate"                🟢 WIN
├── /objections/how-much-is-your-commission/"how to handle commission question real estate"             🟢 WIN
├── /objections/well-wait-for-spring/       "how to handle timing objection real estate"                🟢 WIN
└── /objections/my-spouse-needs-to-decide/  "how to handle third-party objection real estate"           🟢 WIN
```

---

### /glossary/

```
/glossary/                                  (hub — no keyword target)                                   ⚪ NONE
├── /glossary/circle-prospecting/           "what is circle prospecting"                               🟢 WIN
├── /glossary/isa-real-estate/              "what does ISA mean in real estate"                         🟢 WIN
├── /glossary/listing-appointment/          "what is a listing appointment"                             🟢 WIN
├── /glossary/expired-listing/              "what is an expired listing real estate"                    🟢 WIN
├── /glossary/fsbo/                         "what does FSBO mean"                                      🟢 WIN
├── /glossary/cold-calling-real-estate/     "what is cold calling in real estate"                       🟢 WIN
├── /glossary/lead-nurturing/               "what is lead nurturing real estate"                        🟢 WIN
├── /glossary/sphere-of-influence/          "what is sphere of influence real estate"                   🟢 WIN
├── /glossary/door-knocking/                "what is door knocking real estate"                         🟢 WIN
└── /glossary/drip-campaign/                "what is a drip campaign real estate"                       🟢 WIN
```

---

### /case-studies/

```
/case-studies/                              (hub — no keyword, conversion-focused)                      ⚪ NONE
└── /case-studies/[customer-slug]/          (individual — no keyword, conversion-focused)               ⚪ NONE
```

**Structure note:** Build hub page and URL pattern in Wave 1 even if content is placeholder. Page must exist in nav and sitemap before customer stories are ready.

---

### /blog/

#### Category Pages (noindex — navigation only)

```
/blog/                                      (hub — shows latest posts + category browse links)          ⚪ NONE
├── /blog/category/cold-calling/            (noindex — cluster navigation)                             ⚪ NONE
├── /blog/category/appointment-setting/     (noindex — cluster navigation)                             ⚪ NONE
├── /blog/category/conversation-skills/     (noindex — cluster navigation)                             ⚪ NONE
├── /blog/category/follow-up/              (noindex — cluster navigation)                             ⚪ NONE
├── /blog/category/crm-notes/              (noindex — cluster navigation)                             ⚪ NONE
└── /blog/category/mindset/                (noindex — struggle/emotional content)                      ⚪ NONE
```

#### Cold Calling Cluster

```
/blog/real-estate-cold-calling-guide/       "real estate cold call scripts"                             🔴 HARD    ← PILLAR
├── /blog/expired-listing-scripts/          "what to say to expired listings script"                    🟡 MED
├── /blog/fsbo-scripts/                     "FSBO script real estate"                                  🟡 MED
├── /blog/circle-prospecting-scripts/       "circle prospecting script"                                🟢 WIN
├── /blog/buyer-lead-scripts/               "real estate phone script for leads"                       🟡 MED
├── /blog/how-to-start-a-real-estate-call/  "how to start a real estate call"                          🟡 MED
├── /blog/appointment-setting-script/       "real estate appointment setting script"                    🟡 MED
├── /blog/how-to-practice-scripts/         "how to practice scripts real estate"                       🟢 WIN     ← moved from /features/role-play
└── /blog/best-real-estate-call-coaching-software/ "best real estate call coaching software"            🔴 HARD    ← existing post, kept as supporting
```

#### Appointment Setting Cluster

```
/blog/how-to-book-appointments-real-estate/ "how to book appointments real estate"                      🟡 MED     ← PILLAR
├── /blog/how-to-close-for-appointment/     "how to close for appointment on call"                     🟢 WIN
├── /blog/how-many-times-ask-for-appointment/"when to ask for the appointment real estate"              🟢 WIN
├── /blog/why-prospects-dont-commit/        "why prospects don't commit to meetings"                    🟢 WIN
└── /blog/how-to-get-same-day-appointments/ "how to get same day appointments real estate"              🟢 WIN
```

#### Conversation Skills Cluster

```
/blog/real-estate-conversation-guide/  (main)     "how to talk to real estate leads"                          🟡 MED     ← PILLAR
├── /blog/how-to-build-rapport-calls/    (support)    "how to build rapport real estate calls"                   🟢 WIN
├── /blog/how-to-qualify-leads-on-phone/  (support)   "how to qualify real estate leads"                          🟡 MED
├── /blog/questions-to-ask-real-estate-leads/   (support)  "questions to ask real estate leads"                       🟡 MED
├── /blog/how-to-guide-a-sales-conversation/   (support)  "how to guide a sales conversation"                        🟡 MED
├── /blog/how-to-keep-control-of-a-call/  (support)   "how to keep control of a call"                            🟡 MED
├── /blog/what-top-agents-say-on-calls/    (support)  "what top real estate agents say on calls"                  🟢 WIN
├── /blog/how-to-improve-call-performance/ (support)  "how to improve call performance real estate"               🟡 MED     ← moved from /features/call-grading
└── /blog/what-real-time-call-coaching-looks-like/ (support)  "how does AI call coaching work"                     🟢 WIN     ← NEW mid-funnel bridge
```

#### Follow-Up Cluster

```
/blog/real-estate-follow-up-guide/ (main)          "real estate follow up scripts"                             🟡 MED     ← PILLAR
├── /blog/follow-up-scripts-cold-leads/ (support)     "how to follow up with cold leads real estate"             🟢 WIN
├── /blog/how-often-follow-up-real-estate/ (support)   "how often should i follow up real estate leads"            🟢 WIN
├── /blog/how-to-revive-dead-leads/   (support)       "how to revive dead leads real estate"                     🟢 WIN
└── /blog/what-to-say-to-old-leads/    (support)      "what to say to old leads real estate"                     🟢 WIN
```

#### CRM & Notes Cluster (Stand alone)

```
/blog/real-estate-call-notes-template/      "real estate call notes template"                           🟢 WIN
/blog/how-to-take-notes-during-calls/       "how to take notes during sales calls"                     🟢 WIN
/blog/crm-note-examples-real-estate/        "crm note examples real estate"                            🟢 WIN
/blog/how-to-stay-organized-with-leads/     "how to stay organized with leads real estate"              🟢 WIN
/blog/what-to-write-in-crm-after-call/      "what should i write in my CRM after a call"               🟢 WIN
/blog/day-in-the-life-agent-using-ai-coaching/ "AI coaching real estate agent daily workflow"           🟢 WIN     ← NEW mid-funnel bridge
```

#### Struggle & Emotional Content (standalone)

```
/blog/i-hate-cold-calling/                  "i hate cold calling real estate"                           🟢 WIN
/blog/why-leads-ghost-after-calls/          "why prospects ghost after calls"                           🟢 WIN
/blog/how-to-recover-a-bad-call/            "how to recover a bad sales call"                          🟢 WIN
/blog/how-to-not-freeze-on-calls/           "how to not freeze on sales calls"                         🟢 WIN
/blog/how-to-not-sound-salesy/              "how to not sound salesy on calls"                          🟢 WIN
/blog/how-to-think-on-your-feet-sales/      "how to think on your feet sales"                          🟢 WIN
```

#### Data & Authority Content (standalone)

```
/blog/real-estate-call-data-study/          "real estate call statistics"                               🔴 HARD
/blog/ai-coaching-results-study/            "ai coaching real estate results"                           🔴 HARD
/blog/what-separates-top-agents-calls/      "what separates top agents on calls"                        🔴 HARD
```

---

## Difficulty Summary

| Difficulty | Count | % of Keyword-Targeted Pages |
|---|---|---|
| 🟢 WIN — Winnable today | ~58 pages | ~68% |
| 🟡 MED — 3–6 months | ~18 pages | ~21% |
| 🔴 HARD — 6–12 months | ~5 pages | ~6% |
| ⚪ NONE — No keyword target | ~24 pages | N/A (conversion/trust/legal/nav) |

The plan is intentionally weighted toward winnable keywords. ~68% of keyword-targeted pages can start ranking within weeks, building topical authority that lifts the harder targets over time.

---

## 301 Redirect Map

These are the only existing URLs that change during the restructure:

| Old URL | New URL | Reason |
|---|---|---|
| `/blog/shilo-ai-alternatives-real-estate-call-coaching` | `/compare/sayso-vs-shilo/` | Content merges into comparison page |
| `/blog/best-real-estate-call-coaching-software-alternatives` | `/blog/best-real-estate-call-coaching-software/` | Cleaner URL, same content |

All other existing pages (homepage, pricing, demo, privacy, terms, security, contact, referral, affiliate) keep their current URLs unchanged.

---

## Navigation Architecture

### Header (Top Nav Bar)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  [Logo → /]    Product ▾    Solutions ▾    Resources ▾    Compare ▾    [Demo]    │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘

Product ▾                       Solutions ▾                  Resources ▾                  Compare ▾
┌─────────────────────┐         ┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────────┐
│ Real-Time Coaching   │         │ Solo Agents           │     │ Blog                  │     │ Sayso vs Shilo           │
│ Objection Handling   │         │ Team Leaders          │     │ Objection Library      │     │ Sayso vs MaverickRE      │
│ Call Notes           │         │ New Agents            │     │ Glossary               │     │ Sayso vs Manual Coaching │
│ ─────────────────    │         │ ISAs                  │     │ Case Studies           │     │ Why Sayso                │
│ Pricing              │         │ ─────────────────     │     └──────────────────────┘     └──────────────────────────┘
└─────────────────────┘         │ Integrations          │
                                └──────────────────────┘

CTAs (always visible):
  [Download Sayso]  — primary action button
  [Book a Demo]     — secondary action button / link
```

### Footer

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                      │
│  [Logo]                                                                              │
│  "Win the Moment — your real-time call superpower."                                 │
│                                                                                      │
│  Product              Solutions            Resources            Company              │
│  ├─ Real-Time Coach   ├─ Solo Agents       ├─ Blog              ├─ About             │
│  ├─ Objection Handle  ├─ Team Leaders      ├─ Objection Library ├─ Security          │
│  ├─ Call Notes        ├─ New Agents        ├─ Glossary          ├─ Contact            │
│  └─ Pricing           ├─ ISAs             ├─ Case Studies      └─ Help (email)       │
│                       └─ Integrations                                                │
│                                                                                      │
│  Programs             Legal                                                          │
│  ├─ Referral Program  ├─ Privacy                                                     │
│  └─ Affiliate Program └─ Terms                                                       │
│                                                                                      │
│  [Newsletter Signup]                                                                 │
│  [Social Links]                                                                      │
│                                                                                      │
│  © 2026 AskSayso, Inc. All rights reserved.   Privacy • Terms                       │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### Why This Navigation Structure Works

- **Every hub page is 1 click from every other page** via header or footer — this is the #1 crawl priority signal for Google
- **Dropdowns keep the header clean** — 4 nav items + CTA button, no mega-menu overwhelm
- **Footer is the comprehensive crawl path** — includes pages (programs, company, legal) that don't fit in the header but still need link equity
- **Dual CTAs on every page** — "Download Sayso" (primary) + "Book a Demo" (secondary) mirrors the current homepage pattern
- **Objection Library and Glossary are in Resources** — these are your biggest SEO assets and need prominent nav placement so Google discovers and crawls all child pages through the hub links

---

## Future State & Nice-to-Haves

Not part of the initial build. Documented for future planning.

| Opportunity | When to Pursue | Impact |
|---|---|---|
| Local SEO (Google Business Profile, market-specific pages) | After traffic >2,000/mo | High for geo-specific searches |
| Downloadable script PDFs (email gated) | After traffic >2,000/mo | High lead gen |
| Interactive objection simulator | After demo video exists | Very high engagement |
| Video content (YouTube) | Anytime — repurpose blog | Separate SEO channel |
| Guest posts (TheClose, Inman) | After 3+ months publishing | Backlinks |
| Podcast appearances | After strong case study data | Brand awareness |
| ROI calculator tool | After enough customer data | Linkable asset |
| Chrome extension keyword pages | When download numbers support | Easy distribution wins |

### Roadmap Feature Content Restriction

Features listed as "Coming Soon" on pricing (home value analysis, Smart Capture, custom script upload) must NOT be referenced in content pages until live. Only describe what works today.
