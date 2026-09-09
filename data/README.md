# Production Atlas Public Data Directory

Updated: 2026-09-09
Branch: `research-version`

This directory contains structured public-safe data used by Production Atlas. The app no longer depends on one embedded `index.html` dataset; active public data is loaded from JavaScript packages and specialized organization files.

## Current architecture

```text
data/
├── README.md
├── iatse-organization-info.js
├── iatse-us-local-directory.js
└── packages/
    ├── production-branches.js
    ├── us-employers.js
    ├── current-job-openings.js
    ├── JOB_OPENING_RECORD_SCHEMA.md
    ├── opportunities-2026.js
    ├── opportunity-rollover-2027.js
    ├── public-cycle-scope.js
    ├── opportunity-coords.js
    ├── opportunity-taxonomy.js
    ├── festival-research-master-list.js
    ├── branch-research-manifest.js
    └── branch-research-batch-*.js
```

## Data roles

### Employers

`data/packages/us-employers.js` contains public employer and organization profiles: company type, geographic coverage, relevant production departments, and official careers/apply/contact/homepage routes.

Employer records do **not** prove that a current vacancy exists and do not establish vacancy-level experience requirements.

### Production departments

`data/packages/production-branches.js` defines public production departments and normal role-path guidance. `experienceBand` and `experienceLabel` describe the general access pattern of a department only.

```text
department-path guidance != current vacancy requirements
```

### Current job openings

`data/packages/current-job-openings.js` is the canonical runtime surface for source-backed current public vacancies.

The package is intentionally allowed to be empty. General employer profiles must never be converted into fictional current jobs just to fill the interface.

Every populated job-opening record must follow:

```text
data/packages/JOB_OPENING_RECORD_SCHEMA.md
```

and pass:

```bash
npm run validate:job-openings
```

A vacancy may be labeled `entry`, `mixed`, `experienced`, or `unknown` only according to the evidence rules in that schema. `unknown` is preferable to inference.

### Opportunities / events

`data/packages/opportunities-2026.js` and related rollover/scope packages contain public event opportunity records and planning metadata. Event presence is separate from employer/vacancy evidence unless an exact relationship is publicly supported.

### IATSE / labor organizations

The IATSE files contain public institutional and retained local-directory research. They must not be treated as a single national hiring funnel or as proof of event-specific labor jurisdiction without direct evidence.

## Research rules

1. Every public claim that affects hiring, production vendor identity, union jurisdiction, job pathway, or vacancy requirements should have an appropriate public evidence source.
2. Do not treat old vendor relationships, old job postings, or stale careers pages as current without reverification.
3. Separate confirmed facts from leads, assumptions, department-path guidance, and user-supplied/private notes.
4. Use consistent IDs so employers, departments, openings, and opportunities can be cross-linked safely.
5. Do not publish private contacts, worker identity, resume/application data, private application history, pay details, lodging details, private referrals, or client-sensitive information.
6. Browser-local application workflow state belongs in localStorage, not in these public data packages.

## Recommended research status values

```text
confirmed
needs-verification
lead-only
historical
user-supplied
conflicting-sources
```

## Recommended source confidence / type values

```text
primary-official
secondary-credible
official-employer-job-posting
official-applicant-tracking-system
public-job-board-listing
social-or-forum
user-supplied
unknown
```
