# Sayso Landing Page: Shared Repository Guidelines

This is a shared team repository. Please follow these conventions to maintain organization and smooth collaboration.

---

## Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so". This applies to all code, copy, and content.

---

## Global Writing Rules

These rules apply to **all** copy and content across the entire site:

1. **Never use "Not X. Not Y. Just Z" sentence structures.** Rewrite to use affirmative phrasing instead.
2. **Never use "run" or "running" when talking about phone calls.** Use regular conversational English (e.g., "make calls", "dial", "get on the phone").
3. **Avoid "cold call(s)".** Use "call(s)" instead, unless you are specifically discussing cold calling as a topic.
4. **Never say "phone call(s)".** Use "call(s)" instead.
5. **Never refer to real estate agents as "reps" or "representatives".** Only refer to them as "agents" or "real estate agents".
6. **Never refer to clients or prospects as "deals".** Agents book appointments and turn prospects into clients. Use "prospect," "lead," "client," or "appointment" instead.
7. **Never say "close a deal" or "win/lose deals".** Agents book appointments and meetings. The end goal is turning a prospect into a client.
8. **Never use em dashes (—).** Use commas, periods, colons, or rephrase instead.
9. **Sayso helps agents with both buyers and sellers.** All copy must be lead type agnostic (do not assume the prospect is only buying or only selling).
10. **Never write short, punchy, fragmented "tagline" sentences that sound like AI content.** Avoid staccato structures like "No pressure. No pitch. Just value." or "More calls. More clients. More growth." Write like a real person writing a blog post: use full, natural sentences with normal flow. No tweet-style one-liners, no stage catchphrases, no motivational poster copy.

---

## Quick Start Before Every Task

Always start from an up-to-date `development` branch:

```bash
git checkout development
git pull origin development
```

---

## Branch Naming Convention

Create feature branches using this format: `type/short-description`

| Type | Example | Use when |
|------|---------|----------|
| `style/` | `style/navbar-mobile-menu` | CSS, layout, visual changes |
| `refactor/` | `refactor/login-validation` | Restructuring code, no new features |
| `fix/` | `fix/button-hover-state` | Bug fixes |
| `feat/` | `feat/add-contact-form` | New features |

**Be specific:** Use `fix/hero-cta-alignment` instead of `fix/stuff`.

Create your branch with:
```bash
git checkout -b type/short-description
```

---

## Commit Messages

Keep commits small, focused, and with clear messages:

- ✅ `fix: correct CTA button alignment on mobile`
- ✅ `style: add hover state to navbar links`
- ✅ `feat: add onboarding flow navigation`
- ❌ `fix stuff` or `updates` or `changes`

Commit multiple times per feature (one PR per feature, multiple logical commits within it):

```bash
git add .
git commit -m "your clear message"
```

---

## Pull Request Workflow

1. **Push your branch:**
   ```bash
   git push origin type/short-description
   ```

2. **Create a PR on GitHub** (or Draft PR if work-in-progress)
   - Clear title: `type: what changed`
   - Description: explain what changed and why

3. **Request review** from Franco or Lucas

4. **Address feedback** (if any):
   - Make changes on your branch
   - Commit and push again
   - PR updates automatically

5. **Merge to `development`** (maintainer merges after approval; `development` is promoted to `main` for production releases)

---

## After Your PR is Merged

```bash
git checkout development
git pull origin development
git branch -d type/short-description  # optional cleanup
```

Then start your next task from a fresh `development`.

---

## Sharing Work-in-Progress

Use **Draft PRs** with preview deployments:

1. Push your branch
2. Create a Draft PR on GitHub
3. Share the preview URL with your team
4. Convert to "Ready for Review" when ready for formal review

---

## Repository Info

- **Repo:** https://github.com/asksaysodev/sayso-landing.git
- **Dev server:** `npm run dev` (runs on http://localhost:3001)
- **Reviewers:** Franco, Lucas

---

## Key Files

- `/app`: Next.js app directory
- `/components`: React components
- `/styles`: Tailwind CSS and global styles
- `/content`: Content files (blog posts, page data)

### Documentation (`/docs`)

| Folder | Contents | Used by |
|--------|----------|---------|
| `docs/architecture/` | Site architecture & keyword map | Claude commands for building pages |
| `docs/brand/` | Brand guidelines, UI style guide | Design decisions, new page builds |
| `docs/content/` | Blog writing guides, persona copy, blog design specs | Content creation commands |
| `docs/reference/` | Dev guide, onboarding flow, Canny setup, UI component inventory | Developer reference |
| `docs/templates/` | Page templates (persona ad pages, etc.) | Claude commands for building new pages |

---

**Need help?** Refer to `docs/reference/dev-guide.md` or ask the team.
