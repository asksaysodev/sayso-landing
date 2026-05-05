# Pending Internal Links Registry

This file tracks blog post slugs that other site content references but that have not been written yet. When you publish a post matching one of these slugs, add the listed internal links back so the post enters the existing internal-link graph.

## How to use this file

1. **When writing a new blog post:** check whether the post's slug appears below. If it does, after the post is published add a link to it from every source file listed under that entry. Use the suggested anchor text or pick the closest natural phrasing already in the source paragraph.
2. **When stripping a link to a not-yet-written post:** add a new entry here so the back-link can be restored when that post is finally written.
3. **When all back-links for a pending post have been restored:** delete the entry.

The `/standalone-post`, `/pillar`, and `/supporting-post` slash commands all read this file at the start of Phase 1, so any post written via those commands will surface its pending back-links automatically.

---

## Pending posts

### `/blog/follow-up-scripts-cold-leads`
**Suggested anchor text:** "follow-up scripts for cold leads"
**Add internal links back from:**
- `content/blog/circle-prospecting-scripts.mdx`
- `content/blog/expired-listing-scripts.mdx`
- `content/blog/how-to-talk-to-real-estate-leads.mdx`
- `content/blog/real-estate-cold-calling-guide.mdx`
- `content/blog/real-estate-follow-up-scripts.mdx`

### `/blog/how-often-follow-up-real-estate`
**Suggested anchor text:** "how often to follow up with real estate leads"
**Add internal links back from:**
- `content/blog/expired-listing-scripts.mdx`
- `content/blog/how-to-talk-to-real-estate-leads.mdx`
- `content/blog/real-estate-follow-up-scripts.mdx`

### `/blog/how-to-revive-dead-leads`
**Suggested anchor text:** "how to revive dead leads" or "follow-up touches"
**Add internal links back from:**
- `content/blog/expired-listing-scripts.mdx`
- `content/blog/how-to-talk-to-real-estate-leads.mdx`
- `content/blog/real-estate-follow-up-scripts.mdx`

### `/blog/how-to-keep-control-of-a-call`
**Suggested anchor text:** "how to keep control of a call"
**Add internal links back from:**
- `content/blog/how-to-build-rapport-real-estate-calls.mdx`
- `content/blog/how-to-qualify-real-estate-leads.mdx`
- `content/blog/how-to-talk-to-real-estate-leads.mdx`

### `/blog/questions-to-ask-real-estate-leads`
**Suggested anchor text:** "questions to ask real estate leads"
**Add internal links back from:**
- `content/blog/how-to-qualify-real-estate-leads.mdx`
- `content/blog/how-to-talk-to-real-estate-leads.mdx`
- `content/blog/real-estate-follow-up-scripts.mdx`

### `/blog/buyer-lead-scripts`
**Suggested anchor text:** "buyer lead" or "buyer lead call scripts"
**Add internal links back from:**
- `content/blog/how-to-talk-to-real-estate-leads.mdx`
- `content/blog/real-estate-cold-calling-guide.mdx`

### `/blog/what-to-say-to-old-leads`
**Suggested anchor text:** "what to say to old leads"
**Add internal links back from:**
- `content/blog/real-estate-follow-up-scripts.mdx`

### `/blog/how-to-not-freeze-on-calls`
**Display title:** "How to Not Freeze on Sales Calls"
**Add internal links back from:**
- `lib/content/for/solo-agents.ts` (restore entry in `relatedBlogPosts`)

### `/blog/what-real-time-call-coaching-looks-like`
**Display title:** "What Real-Time Call Coaching Looks Like"
**Add internal links back from:**
- `lib/content/products/cue.ts` (restore entry in `relatedBlogPosts`)

### `/blog/how-to-practice-scripts`
**Display title:** "How to Practice Scripts for Real Estate"
**Note:** existing post `how-to-practice-real-estate-scripts` may already cover this. Confirm whether this is a new post or a duplicate before re-linking.
**Add internal links back from:**
- `lib/content/products/playbook.ts` (restore entry in `relatedBlogPosts`)

### `/blog/real-estate-call-notes-template`
**Display title:** "Real Estate Call Notes Template"
**Add internal links back from:**
- `lib/content/products/smart-capture.ts` (restore entry in `relatedBlogPosts`)

### `/blog/how-to-take-notes-during-calls`
**Display title:** "How to Take Notes During Sales Calls"
**Add internal links back from:**
- `lib/content/products/smart-capture.ts` (restore entry in `relatedBlogPosts`)
