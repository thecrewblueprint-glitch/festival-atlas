# CLAUDE.md — Session Preferences

## Never use AskUserQuestion

The owner's standing preference applies here: use normal conversational text for questions; do not render multiple-choice/decision-card UI.

## Start here

Read `AGENTS.md` in full before changing anything. It is the canonical local operating contract for all agents and now contains the completed Production Atlas governance model.

## Repository relationship

- This repository is **Production Atlas**.
- Accepted/deployment branch: **`research-version`**.
- `main` is frozen/non-authoritative scaffolding.
- Substantive work uses managed work branches and PRs targeting `research-version`; do not push proposed work directly to the accepted branch merely because it deploys from there.
- `50yearroadmap` provides the ecosystem governance/current-state layer and tracks Production Atlas through `companies/production-atlas/`; it does not inherit mutation authority over this repository.
- Write authority for any other repository remains separate.

For exact product/public-safety/validation rules and interruption recovery, follow `AGENTS.md` and current canonical matrix governance in `50yearroadmap`.
