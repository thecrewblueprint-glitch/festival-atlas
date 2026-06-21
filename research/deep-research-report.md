# Deep Research Report for a Web App That Becomes the Best Tool for Finding Work as a 1099 Freelance Stagehand

## Executive Summary

The uploaded app is currently a strong **research atlas** for U.S. festival production work, not yet a full **job-finding and booking platform**. In its present form, it is a static, client-rendered single-page app called **FestWorker — US Festival Production Intelligence** with six major tabs, searchable/filterable festival and company datasets, an analytics view, a hiring matrix, keyboard-friendly tabs and modal interactions, and print/reduced-motion support. The shipped dataset contains **48 festival profiles**, **45 company/union profiles**, and **33 company categories**. What it does **not** currently include is just as important: there is no authentication, no worker profile or portfolio, no employer posting flow, no application submission flow, no saved searches, no messaging, no notifications, no contract/payment/tax workflow, no persistence layer, and no service-worker-based offline support in the uploaded build.

For a stagehand-focused product, the most important strategic insight is this: the best tool is **not another generic job board**. Work discovery in this market is fragmented across festival promoters, staffing companies, union hiring halls, generic job boards, and word-of-mouth networks. Official sources show that labor suppliers like Crew One and Rhino position themselves around nationwide stagehand/rigging staffing and training, while union systems like IATSE locals run jurisdiction-based hiring halls with local rules, and newer platforms like Giggs are building vetted marketplace/profile layers on top of the same fragmented ecosystem. That means the winning product should act as a **verified labor marketplace + credential wallet + scheduling/contract/tax organizer + opportunity router**, rather than a simple list of jobs.

There is also a crucial business-model and compliance reality: a “1099 freelance stagehand” positioning must be handled carefully, because many adjacent roles are actually staffed as **W-2**, through temporary labor vendors, or through union referral systems, and U.S. labor classification rules are actively in flux in 2026. OSHA states that staffing agencies and host employers are jointly responsible for temporary worker safety, the IRS requires handling W-9/1099 and estimated-tax realities for self-employed workers, and the Department of Labor notes that independent-contractor classification depends on the actual economic relationship, not just the label in a contract. A best-in-class product should therefore surface **engagement type with absolute clarity** on every opportunity: 1099, W-2 on-call, union referral, temp staffing, payroll through vendor, or direct hire.

The highest-return recommendation is to evolve FestWorker from **research-first** to **workflow-first** in four layers: **verified worker identity and skills**, **clear structured jobs**, **mobile-first response and scheduling**, and **post-booking administration**. The first release should focus on worker profiles, credentialing, availability, transparent job posts, saved searches/alerts, and an employer-side posting + shortlisting dashboard. The second wave should add contract templates, timesheets, mileage/expense logging, invoice support, and a tax center. The third wave should bring explainable matching, repeat-booking features, team booking, multilingual support, and deeper offline/PWA capabilities. This approach is more defensible than trying to compete head-on with general job boards on volume alone.

## Current Product Audit

The current product has several real strengths. It models the live-events market better than most generic job tools by separating **promoters, labor staffing, staging, lighting, audio, video, structures, infrastructure, and union hiring pathways** instead of treating all “production companies” as interchangeable. The app also makes research confidence visible through “research status” labels, exposes festival work windows, allows filtering by search/month/state/company type, and includes a methodology section that correctly tells users to start with the promoter, identify labor jurisdiction, separate departments, verify annually, and apply early. Those are domain-credible patterns for this industry.

The current UX is readable and reasonably clean. There is a hero summary, a sticky toolbar, tabbed navigation, cards for festivals and companies, a data table for hiring channels, a modal detail view, and lightweight analytics. The CSS also includes focus-visible states, reduced-motion handling, responsive breakpoints, and print styles, which is a better accessibility baseline than many niche labor tools.

The biggest structural weakness is that the app stops at **information discovery**. A stagehand cannot create a profile, show specialties, upload an OSHA card or ETCP certificate, set travel radius, save availability, save employers, opt into alerts, track outreach, apply for work, countersign a contract, submit timesheets, log mileage, receive payment, or export tax records. On the employer side, there is no path to create a job, request specific credentials, shortlist workers, dispatch calls, or manage repeat hiring. In product terms, the app currently solves “Where should I look?” but not “How do I get booked?” or “How do I manage freelance operations once booked?”

There is also a meaningful technical limitation: the uploaded build appears to be a static HTML/CSS/JS bundle with hard-coded arrays, client-side rendering, and no visible backend integrations, auth system, persistence, fetch calls, service worker, or notification layer. That keeps complexity low, but it also means there is no current architecture for real-time matching, individual accounts, offline credential caching, or transactional workflows.

## Recommended Product Strategy

The core product strategy should be to turn FestWorker into a **career operations system for live-event labor**, beginning with work discovery and ending with tax-ready records. That is the most useful place to compete because workers and employers already move across multiple channels, while existing platforms tend to own only one slice of the workflow.

### Highest-priority features

| Priority | Feature | Why it matters |
|---|---|---|
| Now | Worker profile with specialties, experience bands, home market, travel radius, gear, languages, union status, pay floor | System of record for matching and repeat hiring |
| Now | Credential wallet with semantic tags | Workers need OSHA/ETCP/lift cert visibility; employers need filters |
| Now | Structured job schema | Every post needs engagement type, rate, minimum call, venue, dates, PPE/tools, required certs |
| Now | Saved searches and instant alerts | Speed matters on on-call labor |
| Now | Availability calendar and blackout dates | Workers commonly work multiple rosters |
| Now | Verified employer posting + shortlist dashboard | Essential for trust and employer adoption |
| Next | One-tap apply package | Reduces friction |
| Next | Contract/invoice/timesheet center | Turns app into a 1099 operations tool |
| Next | Tax center | W-9, 1099s, expenses, mileage, quarterly reminders |
| Later | Explainable matching engine | Helps workers understand fit and gaps |
| Later | Repeat-booking and favorite crew tools | The industry is network-driven |
| Later | Team booking | Many calls are crew-based |

### Matching model

```text
Match score =
  30% specialty fit
+ 20% required credentials satisfied
+ 15% availability fit
+ 15% location/travel fit
+ 10% prior relevant experience
+ 5% reliability / response rate
+ 5% pay preference fit
```

Every ranked result should expose “why you matched” and “what is missing,” such as: *Good fit because you have ETCP Arena Rigger, lift cert, and are within 40 miles; weaker fit because no previous festival site-ops experience is on file.*

### Required opportunity badges

Every opportunity should visibly show one of:

- **1099 freelance**
- **W-2 on-call**
- **Union referral**
- **Temp staffing payroll**
- **Direct full/part-time hire**

Do not let “gig” or “freelance” hide legal classification details.

## Roadmap

| Phase | Timeline | Main outputs |
|---|---|---|
| Foundation | Weeks 1–8 | Data model redesign, worker auth, worker profile, specialties, credential wallet v1, structured job schema, employer verification |
| Job-seeking core | Weeks 9–16 | Job posting UI, search/filter, saved searches, alerts, availability calendar, apply package, shortlist dashboard |
| Freelance operations | Weeks 17–28 | Contracts, e-sign, timesheets, invoice support, mileage/expense logging, tax center |
| Marketplace optimization | Weeks 29–44 | Matching v2, mobile install prompts, offline credential cache, multilingual support, referral system |

## MVP Recommendation

The best MVP cut is:

1. Keep the current atlas.
2. Add worker profiles.
3. Add credential wallet.
4. Add structured job postings.
5. Add saved searches and alerts.
6. Add employer shortlist dashboard.
7. Add application tracker.

This turns the app from “research directory” into “work-finding system” without overbuilding contracts, payments, and tax automation too early.
