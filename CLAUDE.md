# SaySo Landing Page — Shared Repository Guidelines

This is a shared team repository. Please follow these conventions to maintain organization and smooth collaboration.

---

## Quick Start Before Every Task

Always start from an up-to-date `main` branch:

```bash
git checkout main
git pull origin main
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

5. **Merge to main** (maintainer merges after approval)

---

## After Your PR is Merged

```bash
git checkout main
git pull origin main
git branch -d type/short-description  # optional cleanup
```

Then start your next task from a fresh `main`.

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

- `/app` — Next.js app directory
- `/components` — React components
- `/styles` — Tailwind CSS and global styles
- `/content` — Content files
- `ONBOARDING_IMPLEMENTATION.md` — Onboarding flow details
- `UI_readme.md` — UI component documentation

---

**Need help?** Refer to the dev guide or ask the team.
