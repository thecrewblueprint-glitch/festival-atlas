# Festival Atlas Data Schema Notes

This schema is designed to turn the static Festival Atlas into a worker-first 1099/W-2/union opportunity tracker for freelance stagehands and early-career production technicians.

## Core entities

### Worker

```json
{
  "worker_id": "",
  "display_name": "",
  "home_market": "",
  "travel_radius_miles": 0,
  "departments": [],
  "experience_band": "new | 1-2-years | 2-5-years | 5-plus-years",
  "preferred_engagement_types": [],
  "minimum_day_rate": null,
  "minimum_hourly_rate": null,
  "availability_status": "available | limited | unavailable",
  "credentials": [],
  "tools_ppe": [],
  "portfolio_links": [],
  "notes_private": ""
}
```

### Employer / Hiring Channel

```json
{
  "employer_id": "",
  "name": "",
  "type": "vendor | labor-company | union | promoter | venue | staffing-agency | contractor | unknown",
  "departments": [],
  "markets": [],
  "website": "",
  "application_url": "",
  "contact_method": "form | email | referral | union-call | job-board | unknown",
  "engagement_types": [],
  "verification_status": "verified | needs-review | stale | user-submitted",
  "last_verified_date": "YYYY-MM-DD",
  "source_urls": []
}
```

### Festival / Event

```json
{
  "event_id": "",
  "name": "",
  "city": "",
  "state": "",
  "venue_or_site": "",
  "usual_month": "",
  "promoter_or_producer": "",
  "known_vendors": [],
  "departments_needed": [],
  "staffing_window_estimate": "",
  "source_urls": [],
  "last_verified_date": "YYYY-MM-DD"
}
```

### Opportunity

```json
{
  "opportunity_id": "",
  "title": "",
  "event_id": "",
  "employer_id": "",
  "department": "",
  "role": "",
  "engagement_type": "1099 | W2-on-call | union-referral | temp-staffing | direct-hire | unknown",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "call_time": "",
  "estimated_hours": null,
  "rate_type": "day | hourly | flat | unknown",
  "rate_min": null,
  "rate_max": null,
  "minimum_call": null,
  "travel_lodging": "provided | not-provided | varies | unknown",
  "required_credentials": [],
  "required_ppe_tools": [],
  "application_url": "",
  "status": "research | saved | applied | contacted | booked | passed | closed"
}
```

### Credential

```json
{
  "credential_id": "",
  "name": "",
  "issuer": "",
  "category": "safety | lift | rigging | electrical | first-aid | site | other",
  "issue_date": "YYYY-MM-DD",
  "expiration_date": "YYYY-MM-DD",
  "document_url_or_file_ref": "",
  "verification_status": "self-reported | verified | expired | needs-review"
}
```

## Matching score model

```text
30% specialty fit
20% required credentials satisfied
15% availability fit
15% location/travel fit
10% prior relevant experience
5% reliability / response rate
5% pay preference fit
```

## Required guardrails

- Do not label all work as 1099. Track the actual engagement type.
- Do not imply certification from orientation content.
- Do not expose private worker documents publicly.
- Keep public source URLs and last-verified dates for every employer/event claim.
- Distinguish verified data from user notes.
