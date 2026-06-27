# Collaboration Log Entry — Festival Modal Confirmed Routes Only

Status: incomplete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: ChatGPT
Branch: research-version
Commit: b0ef73a

## Files changed

```text
assets/festival-modal-public-safe.js
index.html
opportunities.html
calendar.html
map.html
branches.html
schedule.html
```

## What changed

Aaron identified a public-safety and accuracy issue in festival popups: the modal was showing large general employer lists under every festival, which implied those companies were attached to that specific festival. Aaron also requested that the label use “department” instead of “branch.”

## Implementation

A targeted festival-modal cleanup script was added:

```text
assets/festival-modal-public-safe.js
```

The script only acts inside festival modals. It looks for the existing modal section:

```text
Employer routes by production branch
```

and changes it to:

```text
Confirmed event-specific routes by production department
```

It removes unconfirmed/general route lists from festival popups, specifically blocks labeled as:

```text
Industry companies in this branch
Public company routes
```

It keeps only event-specific confirmed route blocks labeled by the core renderer as:

```text
Companies tied to this branch
```

Those kept blocks are relabeled as:

```text
Confirmed public event-specific company route
```

If no confirmed public route exists for that festival/department, the modal now shows a clear public-safe note:

```text
No confirmed public employer/vendor route listed for this festival yet. General company leads are kept on the Employers page and are not shown here unless a public source ties them to this specific event.
```

## Why

The public app should not imply that a company hires, vendors, staffs, or holds a labor contract for a specific festival unless that connection is confirmed by public source data. General employer leads belong on the Employers page, not inside festival-specific popups.

## Pages loaded

The script is loaded on pages where festival modals can be opened:

```text
Home
Opportunities
Calendar
Map
Departments
Schedule
```

## Public-safety result

Festival popups no longer display broad employer lists as if they are event-specific. They show confirmed event-specific routes only, or a public-safe “no confirmed route yet” note.

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Validate, wait for Pages deploy, hard refresh, and open several festival popups. Confirm that general employer route lists are gone and the section says “department,” not “branch.”
