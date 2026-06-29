# Collaboration Log Entry — Home Upcoming Festival Sort

Status: incomplete
Created: 2026-06-27
Review after: 2026-07-11
Assistant: ChatGPT
Branch: research-version
Commit: 3c6353d44fbcbd641d7e9272f93e3c6ba4376fec and 229b443f8c86311829b90bd2ef107e4281c44cc6

## Files changed

```text
assets/home-upcoming.js
index.html
```

## What changed

Aaron requested that the festivals shown on the home page be ordered by upcoming date from today forward, until the app later becomes a live feed.

A narrow home-page script was added and loaded only on `index.html`.

## Behavior

```text
- Reads existing public `window.scopedOpportunities`.
- Uses the visitor/browser current date.
- Sorts active festivals from today forward by `startDate`.
- Past festivals move behind upcoming festivals.
- Shows the first 6 records in the home page upcoming festival grid.
- Keeps cards clickable through `openOpportunity(id)`.
```

## Public display

Home cards show only useful public information:

```text
festival name
city/state
dates
producer when publicly known
department summary
Open festival action
```

## Scope preserved

```text
No backend
No live feed yet
No private data
No broad DOM rewrite
No header/filter changes
```

## Validation status

Validation not run; connector session cannot run local repo validation.

Required next command:

```bash
npm run validate:all
```

## Next action

Validate and hard refresh the home page. Confirm the visible home festival cards start with upcoming events from the current date forward.
