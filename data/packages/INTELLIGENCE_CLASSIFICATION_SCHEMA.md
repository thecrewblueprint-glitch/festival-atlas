# Production Atlas Intelligence Classification Schema

Production Atlas must separate public evidence from field intelligence. Some useful production-labor information is relationship-based or learned through work experience, but the public app must not publish sensitive or private details.

---

## Core Classification Fields

Every opportunity record may include:

```js
sourceType: 'official | public_secondary_source | vendor_portfolio | social_post | user_field_note | crew_referral | unknown',
visibility: 'public | private | do_not_publish',
confidence: 'confirmed | likely | possible | unverified | private_note',
publishSafety: 'public_safe | private_only | do_not_publish',
humanVerificationNeeded: true,
nextHumanAction: 'Verify production vendors, labor route, lodging, travel, and per diem with public source or trusted field confirmation.'
```

---

## Research Status Block

```js
researchStatus: {
  publicInfoComplete: false,
  privateIntelExists: false,
  humanVerificationNeeded: true,
  sourceConfidence: 'confirmed | likely | mixed_or_unverified | unverified',
  publishSafety: 'public_safe | private_only | do_not_publish'
}
```

Use this block to tell the app whether a record is public-ready or still needs human verification.

---

## Intelligence Block

```js
intelligence: {
  publicSources: [],
  fieldNotes: [],
  crewReferrals: [],
  privateContacts: [],
  doNotPublish: []
}
```

### publicSources
Public-safe URLs or citations.

```js
{
  label: 'official event page',
  url: 'https://...',
  sourceType: 'official',
  confidence: 'confirmed',
  visibility: 'public',
  checkedDate: 'YYYY-MM-DD'
}
```

### fieldNotes
Private work-memory notes. These should stay out of the public app unless rewritten as public-safe, source-backed notes.

```js
{
  note: 'Private field observation placeholder.',
  sourceType: 'user_field_note',
  confidence: 'possible',
  visibility: 'private',
  dateAdded: 'YYYY-MM-DD',
  followUpNeeded: 'Confirm with public source or second independent source.'
}
```

### crewReferrals
Word-of-mouth or coworker-provided information. Use for private workflow only.

```js
{
  note: 'Crew referral placeholder.',
  sourceType: 'crew_referral',
  confidence: 'low | medium | high',
  visibility: 'private',
  dateAdded: 'YYYY-MM-DD',
  followUpNeeded: 'Confirm before outreach or publication.'
}
```

### privateContacts
Private contact placeholders only. Do not publish private contact details in the public app.

### doNotPublish
Information flagged here must remain out of the public app and public repo.

---

## Public App Rule

The public app may show:

- publicSources
- general confidence labels
- nextHumanAction
- humanVerificationNeeded
- public-safe sourceType

The public app must not show:

- privateContacts
- doNotPublish
- unsanitized fieldNotes
- unsanitized crewReferrals
- sensitive work-call details that are not public

---

## Operating Standard

When information is not public, use:

```text
Unknown publicly. Human verification needed.
```

When private field intelligence exists, use:

```text
Private field intelligence exists, but it is not published in the public app.
```

Do not turn private or word-of-mouth information into public claims.
