# Production Atlas Current Job Opening Record Schema

Status: active
Created: 2026-09-09
Branch: research-version

## Purpose

Production Atlas already knows about employers, departments, public hiring routes, markets, events, and labor organizations. This schema defines the separate evidence layer required before the app may describe an **actual current vacancy** as entry-level, experienced, mixed-level, or unknown.

The central rule is:

```text
department-path guidance != current vacancy requirements
```

A department can be generally entry-accessible while a specific opening requires years of experience. A qualification-heavy department can also contain support or trainee roles. The current public posting controls the vacancy classification.

## Runtime export

Current public job-opening packages should export:

```js
window.RESOURCE_JOB_OPENINGS = [ /* records */ ];
```

The canonical starter package is:

```text
data/packages/current-job-openings.js
```

An empty array means Atlas has no source-backed current vacancies loaded. It must not fall back to inventing openings from general employer profiles.

## Required record shape

```js
{
  id: 'stable-opening-id',
  employerId: 'matching-employer-id',
  title: 'Public job title exactly or faithfully normalized',
  department: 'lighting',
  location: 'City, ST | Remote | Touring | Multi-market',
  employmentType: 'full-time | part-time | temporary | freelance | contract | seasonal | unknown',
  openingStatus: 'open | closed | stale | unknown',
  experienceLevel: 'entry | mixed | experienced | unknown',
  experienceEvidence: {
    basis: 'explicit_posting_language | explicit_years | explicit_level | insufficient',
    summary: 'Short public-safe explanation of why the level was assigned.'
  },
  qualificationRequirements: [
    'Only requirements explicitly stated by the public posting.'
  ],
  travelRequirement: 'Only when explicitly stated; otherwise empty.',
  source: {
    url: 'https://official-employer-or-official-ATS-url.example/job',
    sourceType: 'official_employer | official_ats | public_job_board',
    checkedDate: 'YYYY-MM-DD',
    postedDate: 'YYYY-MM-DD | unknown'
  }
}
```

## Experience classification rules

### `entry`

Use only when the current public posting provides direct evidence that the role is intended to be accessible without established professional experience. Examples of sufficient evidence include:

```text
explicitly says entry level
explicitly says no prior experience required
states a 0–1 year minimum
explicitly describes paid/on-the-job training with no conflicting experience minimum
```

Do not classify a role as entry merely because its title contains assistant, helper, stagehand, warehouse, runner, or technician.

### `experienced`

Use when the current public posting explicitly requires established experience or clearly senior responsibility. Examples include:

```text
explicit minimum of 2+ years relevant experience
lead, senior, supervisor, manager, department-head, or equivalent responsibility when the posting confirms that level
explicit prior touring/show/system responsibility beyond an entry pathway
```

A certification, license, degree, or equipment credential by itself does not automatically prove an experienced classification. Record those separately in `qualificationRequirements` unless the posting also establishes the experience level.

### `mixed`

Use when one public posting or opening family explicitly spans more than one experience tier, or when the employer is recruiting both entry and experienced variants through the same source and the record intentionally represents that combined route.

### `unknown`

Use when the public posting does not state enough to classify the vacancy safely.

`unknown` is preferable to inference.

## Evidence priority

Prefer sources in this order:

```text
1. Official employer job posting
2. Employer-controlled applicant tracking system posting
3. Official employer careers page that states the role requirements
4. Credible public job board only when it clearly reproduces a current employer posting
```

Do not create current-opening records from:

```text
search-result snippets alone
old cached postings
social/forum claims
private contacts
crew rumors
user field notes
company reputation
general employer profile text
```

## Freshness rule

Current job openings are volatile. Every record must include `checkedDate`.

Recommended interpretation:

```text
open     source was checked and the opening is presently available
closed   source confirms the opening is no longer available
stale    record has not been reverified recently enough to call current
unknown  source availability or status cannot be determined safely
```

The public app must never silently keep calling an opening current after its source disappears or goes stale.

## Privacy / public-safety rule

Job-opening records may contain public company and role information from official public sources. They must not contain:

```text
applicant identity
resume information
application answers
personal recruiter contact data
private referral information
private application status
private notes
non-public pay or contract terms
```

A user's personal application workflow remains browser-local in `assets/employers-department-browser.js` and is not part of `RESOURCE_JOB_OPENINGS`.

## Relationship to employer profiles

`employerId` must resolve to the public employer dataset when possible.

The employer profile answers:

```text
Who is this company?
What departments are relevant?
Where do they operate?
What official hiring route exists?
```

The current job-opening record answers:

```text
What public vacancy is actually open?
What department is it in?
What does the posting explicitly require?
Is the posting demonstrably entry, mixed, experienced, or unknown?
```

Do not merge those two evidence levels.