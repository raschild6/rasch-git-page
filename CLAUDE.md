# rasch-git-page

Public website for Rasch-Git — a cross-platform Git client. Hosted on GitHub Pages from the `main` branch.

## Structure

- `index.html` — Home page with hero, feature cards (grouped in the same seven areas as `features.html`), and download buttons
- `features.html` — Every feature, one at a time: a tree index (seven areas → features) with a search box on the left, the selected feature on the right (`assets/js/features.js`). Each feature is an `article.feature-page` with `data-area`, `data-keywords` (synonyms the search uses: add the words people would type), an "At a glance" list (3–4 bullets), short paragraphs, the aside (where to find it, step-by-step guide, why it's different) and its screenshots. A new feature needs its article, its entry in the index, its chip in the area card of the Overview and its card on the home page, in the same area.
- `guides.html` — How-to Guides: practical, example-driven usage guides (Action Scheduler, bulk management, toolbar buttons, Deep Search, external editors, version source…)
- `releases.html` — Release history with changelogs and download links
- `install.html` — Installation guide for Windows, macOS and Linux (AppImage, .deb, .rpm)
- `about.html` — About the app and contact details
- `license.html` — License and terms of use
- `sitemap.xml` — Sitemap listing every page (update it when adding a page)
- `releases.json` — Release metadata, updated automatically by the CI/CD pipeline from the private app repo
- `docs/analysis/` — Feature documentation used as source of truth for site content
- `assets/` — CSS, JS, images

## Important notes

- This is a PUBLIC repo. Everything here is visible to anyone.
- `releases.json` is the only file updated automatically from the private repo's CI/CD. All other changes are manual.
- Download links point to GitHub Releases on this repo, where binaries are uploaded by the CI/CD pipeline.
- When updating styles or scripts, bump the `?v=` query parameter in all HTML files to bust browser cache.

## Branches

- `main` is what GitHub Pages publishes. `dev` collects the page changes for the next app version.
- Every site PR targets `dev` and is merged there when ready; merging into `dev` does not go live.
- At an app release, `dev` is merged into `main` (merge commit) with the maintainer's approval, then `main` is merged back into `dev` so it carries the new `releases.json`.
- The release CI commits `releases.json` to `main` only.

## Security Guidelines

Every change must be checked for security before committing:

- **No hardcoded secrets**: Never commit API keys, tokens, passwords, private keys, or credentials.
- **No secrets in logs or comments**: Ensure no sensitive data in HTML comments, JS console logs, or metadata.
- **Public vs private**: Never reference private repo internals (paths, code structure, internal URLs, implementation details) in this repo.
- **Git history matters**: If something sensitive is accidentally committed, removing it from the current code is not enough — it remains in git history.
- **.gitignore**: Ensure OS metadata files (.DS_Store, Thumbs.db), .env files, and any local config are excluded.
- **External resources**: All CDN links, fonts, and external scripts must be loaded via HTTPS.
- **Before every commit**: Mentally verify — "Does this diff contain anything that shouldn't be public?"
