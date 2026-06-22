# Production Atlas

Generated: 2026-06-22

Production Atlas is a static GitHub Pages research dashboard for scouting long-term live-event production work targets, employer/vendor routes, IATSE/local routes, and department-specific production branches.

## Live GitHub Pages site

- **Pages:** https://thecrewblueprint-glitch.github.io/festival-atlas/

Maintenance rule: if the GitHub Pages URL, publishing branch, repository name, or Pages path changes, update this README in the same commit as the change.

## Repository / branch

```text
Repository: thecrewblueprint-glitch/festival-atlas
Active research branch: research-version
Default branch: main
Pages source: GitHub Actions
Live preview source branch: research-version
Public site: https://thecrewblueprint-glitch.github.io/festival-atlas/
```

## Active app pages

```text
index.html
calendar.html
opportunities.html
branches.html
employers.html
iatse.html
matrix.html
analytics.html
sources.html
guide.html
map.html
schedule.html
```

## Active shared files

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/approx-date-labels.js
assets/home-guide-page.js
assets/guide-page.js
data/packages/branch-research-manifest.js
```

Compatibility shim still present:

```text
assets/atlas-core.js
```

Long-term target: every active page should continue loading `assets/atlas-core-v2.js` directly. Retire the shim only after active page compatibility is verified.

## Important data files

```text
data/packages/production-branches.js
data/packages/opportunities-2026.js
data/packages/us-employers.js
data/iatse-us-local-directory.js
data/packages/branch-research-manifest.js
data/packages/branch-research-batch-*.js
```

## Branch research loading rule

Branch research data is loaded through:

```text
data/packages/branch-research-manifest.js
```

When adding a new branch research batch:

1. Create one data package in `data/packages/`.
2. Create one matching report in `research/`.
3. Add the data package filename to `data/packages/branch-research-manifest.js`.
4. Keep the rule: one branch research data file equals one `window.*` export only.
5. Run validation.

Example data/report pair:

```text
data/packages/branch-research-batch-002-scenic.js
research/branch-research-batch-002-scenic.md
```

## Public-safety rules

Public data may include official/public links, employer homepages, confidence labels, public route notes, and next action notes.

Do **not** publish:

```text
private contacts
phone numbers
personal emails
pay rates
hotel/lodging details
crew rumors
private field notes
NDA information
client-sensitive information
private referrals
```

Source links belong on:

```text
sources.html
```

Do not put source links inside public popups.

## Validation

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

GitHub Actions workflow:

```text
.github/workflows/validate-branch-research.yml
.github/workflows/deploy-research-version-pages.yml
```

The validation workflow runs:

```bash
npm run validate:all
```

The Pages deploy workflow publishes the `research-version` branch through GitHub Actions.

## Current research state

Completed departments (batches 001–005):

```text
Staging, Rigging, Lighting, Audio, Video / LED, Power, Site Ops, Logistics
```

Supplemental refresh (batch 006) complete for:

```text
Staging, Rigging, Lighting, Audio, Video / LED
Power, Site Ops, Logistics, Stage Management, Production Office
```

Backline initial batch (batch 001) complete.

Scenic completed through:

```text
branch-research-batch-005-scenic
```

All supplemental artifact results have been converted into app-ready data packages.

Firecrawl access has been removed. No Firecrawl runner, workflow, or control file remains active.

Next research task, when work resumes:

```text
Continue Scenic research starting at batch 006, or begin new department research as needed.
```

## Maintenance notes

- Keep this README current when the Pages URL or deployment path changes.
- Keep the manifest current with every new branch research package.
- Keep every data package paired with a matching research report.
- Do not bypass the one-export-per-file rule.
- Do not continue research until workflow failures are resolved.
