# Liminal Meridian — SPEC.md

## Purpose

Liminal Meridian is a dual-display e-paper wall calendar concept (colour top display + monochrome touch bottom display). This repository hosts the software foundation, starting with a web-based simulator used to design and validate the product experience before committing to hardware.

This root spec describes the overall repository direction and points to the simulator-specific spec in `docs/`.

## What we’re building first

A web-based simulator that:

- renders the Top + Bottom displays as if they were real e-paper targets
- enforces display constraints (palette/greys, dithering, refresh/ghosting)
- supports interaction on the bottom display with a partial-refresh-first model
- exports frames that can later be used to drive real hardware

## Guiding principles

- Treat the displays as bitmap targets (framebuffers), even when the authoring experience is web-first.
- Keep the capture mechanism abstract/swappable.
- Keep the boundary between “what to show” and “how to output it” clean, so hardware becomes a backend, not a rewrite.

## Project scope

In scope (near-term):

- simulator UI + rendering pipeline
- display profiles (resolutions, palettes, refresh characteristics)
- mock calendar data + scenarios
- export of simulated frames

Out of scope (initially):

- live calendar integrations (Google/CalDAV)
- hardware drivers and device enclosure work

## Repository layout

This repo is a monorepo.

- `apps/`
  - `simulator-web/` — interactive web simulator

- `packages/`
  - `core/` — app state, scenarios, view-models
  - `surfaces/` — Top/Bottom DOM-authored display surfaces
  - `capture/` — abstract capture interface + implementations
  - `display-profiles/` — palettes, resolutions, refresh models
  - `display-sim/` — quantize/dither/ghosting + optional packing
  - `mock-data/` — scenario fixtures
  - `shared/` — shared types/utilities

- `docs/`
  - `SIMULATOR_SPEC.md` — simulator-specific spec (authoring, capture, simulation pipeline)
  - `DISPLAY_PROFILES.md`
  - `RENDER_PIPELINE.md`

## Key decisions so far

- Web-first authoring and prototyping: the calendar UI is designed as interactive web surfaces.
- Displays are treated as bitmap targets; the simulator snapshots surfaces and applies display constraints.
- Bottom display interaction is **partial-refresh-first**, with periodic full refresh cleanup.
- Capture stays abstract to allow different implementations later (browser capture now; headless capture on device later).

## Next milestones

- Scaffold monorepo + simulator shell
- Implement display profiles and surfaces
- Add capture interface + a browser capture backend
- Implement quantization + dithering + simulated preview
- Implement partial-refresh-first interaction + refresh scheduling + ghosting
- Export top/bottom frames

## References

- See `docs/SIMULATOR_SPEC.md` for the detailed simulator specification.
