# Production Atlas GitHub Handoff

## Repository

```text
Repository: thecrewblueprint-glitch/festival-atlas
Branch: research-version
Public site: https://thecrewblueprint-glitch.github.io/festival-atlas/
```

## Purpose

Production Atlas is a public-safe static GitHub Pages app for scouting live-event production work targets, employer/vendor routes, IATSE/local routes, and branch-specific production research.

Public data may include official/public links, employer homepages, confidence labels, route leads, and next-action notes.

Do **not** publish private contacts, phone numbers, emails, pay rates, hotel/lodging details, crew rumors, private field notes, NDA information, client-sensitive information, or private referrals.

Sources belong on `sources.html`, not inside popups.

## Current app architecture

Active pages:

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
```

Core/shared files:

```text
assets/atlas.css
assets/atlas-core-v2.js
assets/home-guide-page.js
assets/guide-page.js
data/packages/branch-research-manifest.js
```

Core loader state:

```text
assets/atlas-core-v2.js loads data/packages/branch-research-manifest.js.
The manifest drives branch-research package loading.
Active page shells load assets/atlas-core-v2.js directly.
Legacy inline branch bridge stubs have been removed from active page shells.
```

Compatibility shim still exists:

```text
assets/atlas-core.js
```

Do not delete the shim until every active page and any archived references are verified safe.

## Current branch research coverage

Manifest-driven package coverage:

```text
Staging: 001–006
Rigging: 001–006
Lighting: 001–006
Audio: 001–006
Video / LED: 001–006
Power: 001–005
Site Ops: 001–005
Logistics: 001–005
Scenic: 001–005
```

Important state correction:

```text
Scenic batch 001 report now exists.
Scenic batches 002–005 data packages exist and are included in the manifest.
Supplemental batch 006 data exists for Staging, Rigging, Lighting, Audio, and Video / LED.
Supplemental reports for batch 006 have been added or verified.
```

## Current validation scripts

```text
tools/validate-branch-research-packages.js
tools/validate-static-app.js
package.json
.github/workflows/validate-branch-research.yml
```

Package scripts:

```bash
npm run validate:branch-research
npm run validate:static-app
npm run validate:all
```

Current validator intent:

```text
- one export per branch package
- required dataset fields
- target required fields
- manifest covers every branch research package
- every branch research package has a paired report
- active pages load shared CSS and atlas-core-v2.js
- active pages do not load retired runtimes
- active pages do not contain legacy branch bridge markers
- core does not include public badge/chip helper
- CSS does not include chip/chips badge styles
- us-employers.js does not contain legacy bridge markers
```

The connector environment did not run npm commands directly during the cleanup pass. Next agent should run validation if shell access is available.

## Recent cleanup commits

```text
Remove bridge from index:
a6364520e97a9f3f04be09995b2cb2c46e51d20d

Remove bridge from branches:
ac084c22734d4a8da391775a29ff0fea48ccc89e

Remove bridge from calendar:
35a7cc3d5bab2f53faf5d79103252acb98823b73

Remove bridge from opportunities:
b2ec598838ebcd7049b8368d66bf5ba1afc1260a

Remove bridge from employers:
55e6246bea2cf4801262bb0287483935f85de46b

Remove bridge from iatse:
bf0bba0869b5d31a766781ac31f62fdbdf9be2d1

Remove bridge from matrix:
d795ba5d68e1fedb9eb8b8d96791897a58b99777

Remove bridge from analytics:
86754bdf503d4dcff69146c81678ce27d6a331a2

Remove bridge from sources:
f92f9bd267b3ab2c28870067e0e18373f90b8559

Remove bridge from guide:
67028b415adeae4e1fcf5d4b4ad3869cd90e47dc

Strengthen static app validation:
09ef4d2694233ee9e69efba5e42938c8fcf17b4c

Update AI collaboration log after loader cleanup:
e0b0e396db371e92177d74c4bd7977b10bcc0095
```

Supplemental report commits:

```text
Staging batch 006 report:
584171773b4a535560c93c6578fdc598c127a12e

Rigging batch 006 report:
fc91ea8fed2a078dd266a3642da4656dfa7d5db8

Lighting batch 006 report:
72200d27177ab949138c82e972935959a753d887
```

Audio batch 006 report and Video / LED batch 006 report exist and were verified, but the Audio report commit SHA was not captured in the active assistant stream.

## Public UI rules

Aaron requested:

```text
No irrelevant public-facing badges/chips.
No source links inside popups.
Clean cards and clean popups.
Sources only on sources.html.
Mobile search/filter must not stick over the page.
```

Avoid reintroducing visual chip/badge clutter such as:

```text
confidence badge
status badge
source badge
value badge
verify badge
lodging badge
branch count chip
```

Use plain text and clean links instead.

## AI collaboration file

The shared AI-to-AI collaboration log is:

```text
research/AI_COLLABORATION_LOG.md
```

AI collaborators should:

```text
1. Read research/AI_COLLABORATION_LOG.md first.
2. Read this handoff file second.
3. Check the current repository branch before assuming state.
4. Append a dated note before handing off.
5. Include exact commits created.
6. Include changed files.
7. Include incomplete work, risks, and next safe step.
```

## Next safe step

```text
1. Run npm run validate:branch-research.
2. Run npm run validate:static-app.
3. Run npm run validate:all.
4. If validation passes, continue the next agreed research task.
5. Do not reintroduce badge/chip clutter or source links inside popups.
```
