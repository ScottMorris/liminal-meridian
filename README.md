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
- `docs/ARCHITECTURE.md` System overview and decisions
- `docs/` Additional notes, research, and experiments

## Repo layout (rough)
- `apps/`
  - `simulator/` Desktop browser simulator for the display(s)
  - `ui/` Shared UI components and layout experiments
- `packages/`
  - `render/` Rendering core (target: portable, testable)
  - `data/` Calendar adapters, transforms, caching

## Getting started
Prereqs:
- Node.js (LTS)
- pnpm

Run the simulator:
- `pnpm install`
- `pnpm dev`

(Commands and package names will be tightened once the monorepo structure settles.)
