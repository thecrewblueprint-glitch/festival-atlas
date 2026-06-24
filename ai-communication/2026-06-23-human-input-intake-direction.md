# Production Atlas — Human Input Intake Direction

Date: 2026-06-23
Branch: research-version

## Why this direction changed

Public web research can confirm dates, producer names, venue names, some official source URLs, and some public vendor credits.

It usually cannot confirm the most valuable work-route details:

```text
crew lodging or camping practices
out-of-market crew travel patterns
which labor brokers actually staff a show
which vendors hire extra hands locally
whether a route is union, non-union, mixed, or venue-driven
what a worker should verify before outreach
```

Those details usually come from human knowledge, not public websites.

## Core decision

Production Atlas needs a human-input intake and review workflow.

Do not write raw human submissions directly into the public app or public repository.

Instead:

```text
private intake -> private review -> public-safe distilled summary -> repo data update -> validation
```

## Public safety rule

The public GitHub Pages app may show only sanitized, generalized, confidence-labeled information.

Do not publish or render:

```text
private contacts
phone numbers
personal emails
pay rates
hotel names
specific crew lodging addresses
booking details
private referrals
crew gossip
NDA information
client-sensitive information
```

Human input can be used to guide research and verification, but only public-safe summaries should become app data.

## Recommended architecture

### Layer 1 — Private intake form

Use a private form tool first. Recommended options:

```text
Google Forms -> private Google Sheet
Airtable form -> private Airtable base
Tally/Typeform -> private export
private GitHub issue form only if the repository is private
```

Do not use public GitHub Issues for raw human input.

### Layer 2 — Review table

Each submission should become a review row with:

```text
submission_id
submitted_at
event_id
event_name
submitter_role_category
firsthand_or_secondhand
season_or_year_observed
crew_accommodation_signal
travel_or_per_diem_signal
labor_route_signal
union_or_nonunion_signal
vendor_stack_signal
confidence_level
source_type
public_safe_summary
private_notes_do_not_publish
review_status
reviewer_decision
```

### Layer 3 — Public-safe distilled data

Only sanitized fields should move toward the app:

```text
humanInputStatus: 'none' | 'received' | 'reviewed' | 'public_safe_summary_ready'
humanInputConfidence: 'low' | 'medium' | 'high'
humanInputSummary: '<generalized public-safe summary>'
humanInputNeedsVerification: true | false
humanInputLastReviewed: 'YYYY-MM-DD'
```

### Layer 4 — Repo update

After review, Claude or another assistant can update a public-safe data package.

Possible file options:

```text
data/packages/human-input-summaries.js
```

or event records in:

```text
data/packages/opportunities-2026.js
```

Do not choose the final file until the intake schema is approved.

## Intake form fields

Recommended public-safe form questions:

```text
Which event are you commenting on?
Which year or season did you observe?
Were you production crew, vendor crew, local stagehand, touring crew, site ops, or other?
Is your information firsthand or secondhand?
Did production crew have any general lodging/camping arrangement?
Was travel/per diem/housing support generally part of the route you observed?
How did people usually get hired for this event?
Was the labor route union, non-union, mixed, venue-based, vendor-based, or unknown?
Which company type was involved: audio, lighting, video, staging, rigging, site ops, labor broker, producer, venue?
What should a worker verify before pursuing this event?
Can this be summarized publicly without naming people, rates, hotel details, or private referrals?
```

Avoid asking for:

```text
names of dispatchers
phone numbers
personal emails
specific pay rates
hotel names
rooming details
private referral chains
```

## Review statuses

Use these statuses:

```text
new
needs_safety_review
needs_corroborration
public_safe_summary_ready
rejected_private_or_unsafe
rejected_unusable
published_to_app
```

## Confidence labels

Use these confidence labels:

```text
high — multiple firsthand reports or firsthand report plus public source alignment
medium — one credible firsthand report or repeated consistent secondhand reports
low — directional signal only, useful for verification but not enough for app claim
unknown — no usable public-safe or human-confirmed signal
```

## Public app language examples

Allowed:

```text
Human input suggests this event may use a mixed vendor/local labor route. Human verification needed before outreach.

Human input suggests crew camping may be part of some production routes at this rural site. Details are not public. Human verification needed.

Public-safe human input received, but not enough corroboration to mark confirmed.
```

Not allowed:

```text
Call [person name].
The rate is $___ per day.
Crew stays at [hotel name].
Ask [private referral name] to get on the call.
```

## Recommended next step

Design the intake form and review table first.

Do not connect it to the public app until the review/sanitization workflow is working.

Suggested first implementation path:

```text
1. Create a Google Form or Airtable form.
2. Store responses in a private sheet/base.
3. Export or manually review rows.
4. Create public-safe summaries only after review.
5. Add summaries to a public-safe repo package.
6. Run npm run validate:all.
```

## Effect on current research prompt

The existing public web research prompt still matters, but its role changes.

Use public web research to:

```text
confirm dates, venues, source URLs, producers, official links, and public vendor credits
cross-check human-submitted claims
avoid publishing unsupported rumors
```

Use human input to:

```text
identify hidden labor routes
flag likely lodging/travel patterns
surface vendor/labor broker routes that should be verified
prioritize which events need outreach
```
