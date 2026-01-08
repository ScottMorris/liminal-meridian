# Liminal Meridian

Not your average wall calendar. Paper, until it answers back.

Liminal Meridian is a calm, paper-first wall calendar concept that happens to be interactive. It is designed to feel like a clean printed page most of the time, and only “wake up” when you want more detail.

This repo is where I’m prototyping the interaction model, the rendering approach, and the device shape, with a desktop simulator first.

## What it is

A glanceable calendar surface with a clear information hierarchy:

- At-a-glance rhythm (busy-ness, blocks, day shape)
- On-demand detail (tap to reveal, drill in, then return to quiet)

## Design principles

- Paper first. No visual noise, no constant motion, no attention hijacking.
- Interaction is invited, not demanded.
- Clear typography and generous whitespace.
- Fast to read from across the room.
- Works even if you only ever glance at it.

## What it is not

- A tablet experience on the wall
- A notification engine
- A full productivity suite

## Project status

Early prototype and architecture exploration. Expect breaking changes.

## Key docs

- `SPEC.md` Product and interaction spec (kept in the repo root for LLMs and tooling)
- `docs/SIMULATOR_SPEC.md` Simulator-specific spec
- `docs/ARCHITECTURE.md` System overview and decisions (if available)

## Repo layout

- `apps/`
  - `simulator-web/` Interactive web simulator
- `packages/`
  - `core/` App state, scenarios, view-models
  - `surfaces/` Top/Bottom DOM-authored display surfaces
  - `capture/` Abstract capture interface + implementations
  - `display-profiles/` Palettes, resolutions, refresh models
  - `display-sim/` Quantize/dither/ghosting + optional packing
  - `mock-data/` Scenario fixtures
  - `shared/` Shared types/utilities

## Getting started

Prereqs:

- Node.js (LTS)
- pnpm

Run the simulator:

1. `pnpm install` (installs dependencies for all workspaces)
2. `pnpm dev` (launches the simulator web app)

Linting and Testing:

- `pnpm -r lint`
- `pnpm -r test`
