# Implementation Roadmap

## Phase 1 — Preserve current atlas and clean static app

1. Keep `index.html` as the static baseline.
2. Split data arrays into:
   - `data/festivals.json`
   - `data/companies.json`
   - `data/company-categories.json`
3. Add schema validation.
4. Add source-status fields:
   - `verified_source_url`
   - `last_verified_date`
   - `verification_status`
   - `annual_contract_risk`
5. Add accessibility fixes:
   - visible skip link
   - stronger semantic landmarks
   - modal focus trap
   - improved table captions
   - better mobile filter layout

## Phase 2 — Worker-first MVP

1. Add worker profile model:
   - name
   - home market
   - travel radius
   - departments
   - experience level
   - tools/PPE
   - certifications
   - union affiliation
   - pay floor
2. Add credential wallet:
   - OSHA cards
   - ETCP credentials
   - lift/forklift cards
   - employer-specific training
   - expiry dates
3. Add saved opportunities.
4. Add application tracker.
5. Add reminders for outreach and follow-up.

## Phase 3 — Job marketplace layer

1. Employer account creation.
2. Verified employer profiles.
3. Structured job posting form.
4. Required classification badge:
   - 1099
   - W-2 on-call
   - union referral
   - temp payroll
   - direct hire
5. Worker shortlist dashboard.
6. One-tap apply package.
7. Email/SMS/web push alerts.

## Phase 4 — 1099 operations layer

1. W-9 storage.
2. Contract templates.
3. E-sign integration.
4. Timesheet logging.
5. Invoice generation.
6. Mileage and expense logging.
7. Quarterly tax reminder dashboard.
8. Exportable tax packet.

## Phase 5 — Advanced matching and intelligence

1. Explainable match score.
2. Calendar conflict detection.
3. Travel-route optimization.
4. Festival-season corridor planning.
5. Repeat-booking recommendations.
6. Favorite crew lists.
7. Crew-team booking.
8. Employer trust and payment-timeliness signals.
