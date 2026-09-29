# rasch-git-page

Public website for Rasch-Git — a cross-platform Git client. Hosted on GitHub Pages from the `main` branch.

## Structure

- `index.html` — Home page with hero, feature cards, and download buttons
- `features.html` — Detailed feature descriptions
- `releases.html` — Release history with changelogs and download links
- `install.html` — Installation guide for Windows and macOS
- `license.html` — License and terms of use
- `releases.json` — Release metadata, updated automatically by the CI/CD pipeline from the private app repo
- `docs/analysis/` — Feature documentation used as source of truth for site content
- `assets/` — CSS, JS, images

## Important notes

- This is a PUBLIC repo. Everything here is visible to anyone.
- `releases.json` is the only file updated automatically from the private repo's CI/CD. All other changes are manual.
- Download links point to GitHub Releases on this repo, where binaries are uploaded by the CI/CD pipeline.
- When updating styles or scripts, bump the `?v=` query parameter in all HTML files to bust browser cache.

## Security Guidelines

Every change must be checked for security before committing:

- **No hardcoded secrets**: Never commit API keys, tokens, passwords, private keys, or credentials.
- **No secrets in logs or comments**: Ensure no sensitive data in HTML comments, JS console logs, or metadata.
- **Public vs private**: Never reference private repo internals (paths, code structure, internal URLs, implementation details) in this repo.
- **Git history matters**: If something sensitive is accidentally committed, removing it from the current code is not enough — it remains in git history.
- **.gitignore**: Ensure OS metadata files (.DS_Store, Thumbs.db), .env files, and any local config are excluded.
- **External resources**: All CDN links, fonts, and external scripts must be loaded via HTTPS.
- **Before every commit**: Mentally verify — "Does this diff contain anything that shouldn't be public?"
