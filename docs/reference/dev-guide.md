# Dev Guide — Sayso Marketing Site

Quick reference for working on this repo:

---

## 1. Setup (first time)

```bash
# Clone the repo (if you haven't already)
git clone <https://github.com/asksaysodev/sayso-landing.git>
cd sayso_landing_page

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 2. Start Fresh Before Each Task

Always work from an up‑to‑date `main`:

```bash
git checkout main
git pull origin main
```

---

## 3. Create a Feature Branch (you will work on this branch, that will later be merged to main branch with the updates)

Use this naming convention: `type/short-description`

| Type | Example | Use when |
|------|---------|----------|
| `style/` | `style/navbar` | CSS, layout, visual changes |
| `refactor/` | `refactor/login` | Restructuring code, no new features |
| `fix/` | `fix/bug-on-button` | Bug fixes |
| `feat/` | `feat/add-contact-form` | New features |

**Examples:**
```bash
git checkout -b style/navbar-mobile-menu
git checkout -b refactor/login-validation
git checkout -b fix/button-hover-state
```

Be specific: `fix/hero-cta-alignment` instead of `fix/stuff`.

---

## 4. Commits

First stage your changes with `git add .` (stages all changed files) or `git add path/to/file` (stages specific files). Then use `git commit -m 'your message'` to save them. The `-m` flag lets you write the message directly in the command instead of opening an editor.

Keep commits small and focused:

- ✅ `fix: correct CTA button alignment on mobile`
- ✅ `style: add hover state to navbar links`
- ❌ `fix stuff` or `updates`

---

## 5. Pull Request (PR) Workflow

1. Push your branch:
   ```bash
   git push origin style/navbar-mobile-menu
   ```

2. Open GitHub → **Compare & pull request** (or create PR from the branch).

3. Fill in the PR:
   - Clear title (e.g. `style: mobile navbar menu`)
   - Short description of what changed and why

4. Request review. Someone will review before merging to `main`. (Ping Franco or Lucas for this)

5. Address feedback if requested (see section 6).

6. After approval, a maintainer (Lucas/Franco) merges to `main`.

---

## 6. After Submitting a PR — What Next?

**Option A: Start a new task**

1. Switch back to `main` and pull latest:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new branch:
   ```bash
   git checkout -b feat/next-feature
   ```

**Option B: Fix PR feedback**

1. Stay on your branch:
   ```bash
   git checkout style/navbar-mobile-menu
   ```

2. Make changes, commit, and push:
   ```bash
   git add .
   git commit -m "fix: address review feedback on mobile menu"
   git push origin style/navbar-mobile-menu
   ```

   The PR updates automatically. No new PR needed.

**Option C: PR was merged**

1. Delete your local branch (optional cleanup):
   ```bash
   git checkout main
   git pull origin main
   git branch -d style/navbar-mobile-menu
   ```

2. Start your next task from `main` (Option A).

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start fresh | `git checkout main && git pull origin main` |
| New branch | `git checkout -b type/description` |
| Commit changes | `git add . && git commit -m "your message"` |
| Push branch | `git push origin <branch-name>` |
| See branches | `git branch -a` |

---

**Questions?** Ask the team or check the main [README](../README.md) for project details.
