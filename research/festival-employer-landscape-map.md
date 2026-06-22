# Festival Employer Landscape Map

Purpose: organize the Festival Atlas research around the practical question a freelance stagehand asks first: **who hires for this kind of work, through what channel, and what should I prepare before contacting them?**

This is not a certification guide, legal classification opinion, or guaranteed hiring list. Festival labor can be routed through production vendors, labor companies, local unions, venue labor pools, temp staffing agencies, promoter relationships, touring vendors, and direct employer postings. Every listing in the app should eventually distinguish the actual engagement model: 1099 freelance, W-2 on-call, union referral, temp staffing payroll, direct hire, or subcontractor-vendor relationship.

## Worker-first categories

### 1. Staging / Structures

**What they handle:** stage decks, roof systems, ground support, barricade, rolling risers, temporary structures, platforms, scaffold-adjacent scenic builds, ramps, stairs, and field-deployed structural systems.

**Likely hiring channels:** staging vendors, festival site contractors, labor companies, union referrals, touring staging providers, local stagehand calls.

**Early-career prep:** PPE, basic hand-tool familiarity, load path awareness, deck layout vocabulary, pin/clip discipline, truck-pack awareness, safe lifting/team-carry habits, ability to follow lead/steward instructions.

**Atlas fields to track:** structure type, vendor, local labor source, union status, build/strike dates, PPE/tools, rate/range, minimum call, travel/lodging availability, recurring festival relationship.

### 2. Rigging

**What they handle:** overhead points, motors, truss, spansets/soft goods support, bridles, fall-protection-controlled work, arena/festival rigging systems, and integration with lighting/audio/video loads.

**Likely hiring channels:** IATSE locals, rigging vendors, arena/stadium labor pools, production companies, specialized rigging contractors.

**Early-career prep:** rigging terminology, exclusion zones, chain motor basics, truss identification, hardware recognition, communication discipline, strict lead/qualified-rigger boundaries. Entry workers should not represent themselves as qualified riggers without proper training and authorization.

**Atlas fields to track:** required certs, qualified-rigger requirement, fall-protection requirement, lift/operator requirement, union referral requirement, call phase, department lead contact route.

### 3. Lighting

**What they handle:** fixtures, cable, power/data runs, truss prep, lighting carts, console/network support, focus, strike, dimmer/power distribution coordination.

**Likely hiring channels:** lighting vendors, production companies, touring crews, local stagehand companies, IATSE locals.

**Early-career prep:** fixture categories, cable types, DMX/network basics, socapex/multicable awareness, safe ladder/lift boundaries, fixture handling, clamp/safety vocabulary.

**Atlas fields to track:** vendor, fixture package scale, rig/prep labor needs, console ecosystem, local labor source, load-in/load-out windows, skill tags.

### 4. Audio

**What they handle:** PA deployment, cable, stage inputs, monitor world, RF support, amp racks, comm, shout systems, delay towers, FOH/monitor support.

**Likely hiring channels:** audio vendors, touring sound companies, labor providers, union locals, production houses.

**Early-career prep:** speaker/cart handling, cable over/under, XLR/NL4/power awareness, stage plot/input-list vocabulary, quiet work habits around line check, comm discipline.

**Atlas fields to track:** PA vendor, stage count, festival audio zones, comm system, RF complexity, department hiring channel, required experience level.

### 5. Video / LED

**What they handle:** LED wall build, camera support, projection, media servers, video village, cable/data, control rooms, screens, delay/IMAG systems.

**Likely hiring channels:** video vendors, LED vendors, touring production companies, labor providers, local stagehand pools.

**Early-career prep:** LED panel handling, processor/control vocabulary, fiber/data discipline, screen-cart workflow, camera cable safety, clean-label habits.

**Atlas fields to track:** LED vendor, screen type, processor ecosystem, camera/IMAG presence, required department experience, travel crew/local crew split.

### 6. Power / Electrical

**What they handle:** temporary power distribution, generators, feeder, distro, grounding/bonding under qualified supervision, cable ramps, spider boxes, department power support.

**Likely hiring channels:** power vendors, electrical contractors, production companies, IBEW/IATSE/venue channels depending on jurisdiction and contract.

**Early-career prep:** strict scope awareness, cable handling, ramping/protection, lockout/barricade respect, generator/distro terminology. Do not perform electrical work beyond authorization and training.

**Atlas fields to track:** power vendor, union/jurisdiction requirements, generator/distro scale, qualified-electrician requirement, call phase, credential requirements.

### 7. Site Operations

**What they handle:** fencing, signage, access control support, site layout, temp infrastructure, water/sanitation coordination, barricade support, field operations, vendor support.

**Likely hiring channels:** festival operations contractors, promoters, site vendors, temp staffing, production offices.

**Early-career prep:** radio etiquette, site maps, problem escalation, golf-cart/vehicle restrictions, heat/weather readiness, public-facing conduct.

**Atlas fields to track:** site contractor, promoter/producer, location, camping/lodging conditions, shift length, weather exposure, operations contact channel.

### 8. Logistics / Equipment Movement

**What they handle:** trucks, forklifts under qualified operators, carts, gear movement, dock/compound flow, boneyard organization, runner support, pallet/case movement.

**Likely hiring channels:** labor companies, production vendors, logistics providers, equipment rental houses, festival operations.

**Early-career prep:** truck-pack discipline, case-label literacy, forklift exclusion-zone awareness, chain-of-command, radio calls, safe pushing/pulling/team lifts.

**Atlas fields to track:** load-in/out schedule, equipment vendor, forklift/operator requirements, dock/compound access, overnight strike likelihood, travel/lodging.

### 9. Scenic / Carpentry

**What they handle:** scenic flats, custom set pieces, soft goods, platforms, trim, scenic repair, stage dressing, specialty fabrication support.

**Likely hiring channels:** scenic shops, production companies, theater/union locals, festival scenic vendors, labor companies.

**Early-career prep:** basic tools, fasteners, measuring, material handling, shop/field safety, finish awareness, paint/graphics care.

**Atlas fields to track:** scenic vendor, required tools, carpentry skill level, fabrication vs field-install distinction, union jurisdiction, build/strike dates.

### 10. Backline

**What they handle:** instruments, amps, risers, musician support, stage plots, backline changeovers, tuning/support under direction, artist equipment care.

**Likely hiring channels:** backline rental companies, festival production teams, stage management networks, labor providers.

**Early-career prep:** careful handling, stage-plot reading, quiet/changeover discipline, artist-area professionalism, cable and stand organization.

**Atlas fields to track:** backline vendor, stage count, changeover schedule, instrument package, experience requirement, artist-facing expectations.

### 11. Stage Management

**What they handle:** stage schedule, changeovers, artist/crew communication, run-of-show coordination, local crew direction, department timing.

**Likely hiring channels:** promoters, production companies, festival producers, stage management networks, venue/touring referrals.

**Early-career prep:** radio discipline, paperwork literacy, calm communication, time awareness, escalation channels, hospitality/artist-boundary awareness.

**Atlas fields to track:** promoter/producer, stage count, stage manager names where public/approved, production office route, call sheets, recurring festival contacts.

### 12. Production Assistant / Production Office

**What they handle:** credentials, runners, paperwork, receipts, radios, signage, vendor coordination, office errands, check-in support, hospitality-adjacent logistics.

**Likely hiring channels:** production companies, promoters, event staffing, festival operations teams, direct postings.

**Early-career prep:** organization, discretion, communication, receipt handling, spreadsheet literacy, local driving requirements, confidentiality.

**Atlas fields to track:** office staffing channel, driver/license requirement, local hire preference, software/tools, dates, pay model, point of contact.

## Recommended data model additions

Each employer or opportunity record should eventually include:

```json
{
  "name": "",
  "category": "",
  "subcategories": [],
  "primary_hiring_channel": "",
  "engagement_type": "1099 | W2-on-call | union-referral | temp-staffing | direct-hire | unknown",
  "festival_relationship": "vendor | promoter | labor-provider | union | venue | contractor | unknown",
  "home_markets": [],
  "travel_required": "yes | no | varies | unknown",
  "typical_call_types": ["load-in", "show-call", "load-out", "overnight-strike", "advance", "site-build"],
  "common_roles": [],
  "entry_level_access": "yes | limited | no | unknown",
  "required_credentials": [],
  "preferred_credentials": [],
  "ppe_tools": [],
  "pay_visibility": "posted | estimate | contact-required | unknown",
  "source_url": "",
  "last_verified_date": "YYYY-MM-DD",
  "verification_status": "verified | needs-review | stale | user-submitted"
}
```

## Platform design implication

Festival Atlas should treat the current app as the intelligence layer, then add worker-side workflow:

1. Save target employers and festivals.
2. Attach notes, contact attempts, rates, and call history.
3. Track which engagement model applies.
4. Build a worker profile and credential wallet.
5. Generate an application/contact package by department.
6. Alert the worker when festivals enter likely staffing windows.
7. Keep a tax/admin trail for 1099 work without implying that every opportunity is 1099.
