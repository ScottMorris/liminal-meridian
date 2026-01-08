# Liminal Meridian Simulator — SPEC.md

## Purpose

Build a web-based, interactive simulator for **Liminal Meridian**, a dual-display e-paper wall calendar. The simulator is a “virtual prototype” that renders what would appear on the physical displays, including display constraints (palette/greys, dithering, refresh behaviour, ghosting), while remaining fast to iterate on using standard web UI techniques.

This repository is the starting point for eventual hardware output (Raspberry Pi / e-paper driver boards). The simulator becomes the reference implementation for layout and rendering decisions.

## Core idea

The calendar experience is authored as an interactive web UI, but the displays are treated as bitmap targets.

- The **display surfaces** (Top + Bottom) are rendered as normal web components.
- A **capture pipeline** snapshots each surface into a bitmap.
- A **display simulation pipeline** transforms that bitmap to match each display’s limitations (palette/greys, dithering, refresh/ghosting).
- Later, the same “frame” outputs can be sent to real hardware.

## Goals

- Fast iteration on layout, typography, information density, and interaction.
- Accurate-enough emulation of display constraints to make good UX decisions.
- Clear separation between:
  - app state + views
  - display capture + transforms
  - output backends (simulator preview now, hardware later)

- Easy maintenance and extensibility.

## Non-goals (v0.1)

- No real calendar sync (use mock data).
- No physical hardware driving.
- No precise pigment physics. Simulation will be “useful, not perfect.”

## Display model

The simulator supports two independent display targets:

- **Top display**: colour e-paper (initially 6/7-colour class). Primary use: image + extended info.
- **Bottom display**: monochrome e-paper with capacitive touch overlay. Primary use: interactive calendar navigation.

Each display has its own:

- resolution (W×H)
- orientation
- colour mode (mono1, mono2/4-grey, palette6, palette7)
- palette/greys definition
- refresh model (full refresh time, partial refresh behaviour)
- ghosting parameters

## User-facing simulator features

- Show both displays stacked in a frame preview.
- A “bezel mode” overlay to visualise margins and seams.
- Toggle between:
  - **Ideal view** (raw web rendering)
  - **Simulated view** (quantized/dithered + refresh/ghosting effects)

- Config panel:
  - choose display profiles for top/bottom
  - choose dithering method per display
  - toggle ghosting simulation
  - trigger full refresh and partial refresh (where relevant)

- Interaction:
  - tap/click bottom display
  - show event log (tap → state change → refresh queued → frame committed)

- Export:
  - save top/bottom frames as PNG
  - optional: export packed buffers (future hardware)

## Rendering approach (Phase A)

Phase A uses DOM-authored views with snapshot capture.

### A1. Display surfaces

Two React components define the content:

- `TopSurface` — image + context cards
- `BottomSurface` — calendar UI + interaction affordances

Each surface is rendered at an explicit pixel size matching the selected `DisplayProfile`.

### A2. Capture (abstract)

A capture step produces a bitmap per surface.

Requirements:

- deterministic enough for local development
- supports capturing two independent regions
- implementation stays swappable

### A3. Display simulation transforms

Given RGBA bitmap input, transform into a simulated e-paper output:

- optional pre-processing (contrast, gamma)
- quantization (nearest palette/greys)
- dithering (ordered Bayer and/or error diffusion)
- refresh/ghosting simulation (history + blending model)
- packing (optional for future hardware)

## Refresh and interaction model

E-paper updates are slow. The simulator must model a **partial-refresh-first** interaction style for the bottom display.

Core principles:

- **State updates immediately** on input.
- **Bottom display updates visually via partial refresh by default** (small-region updates for highlights, selection, cursors, lightweight UI feedback).
- **Periodic full refresh cleanup** is required to manage ghosting and accumulated artefacts (manual button in the simulator + optional scheduled cleanup).
- **Top display updates are full refresh only** and are expected to be infrequent (daily or on-demand).

Bottom display (mono + touch):

- partial refresh is the default feedback path
- occasional full refresh cleanup

Top display (colour):

- full refresh only (simulation)
- updated on a slower cadence (daily or on-demand)

## Data model (mock first)

Define a stable internal model that can later map to Google Calendar / CalDAV.

- calendars
- events (start/end, title, location, tags/colour)
- derived views:
  - monthly grid
  - busy intensity per day
  - agenda list for selected day

Mock scenarios:

- empty month
- typical busy month
- extreme busy week
- travel week

## Repository structure (proposed)

- `apps/`
  - `simulator-web/` — React/Vite app (interactive simulator)

- `packages/`
  - `core/` — state model, scene definitions, view-model builders
  - `surfaces/` — `TopSurface`, `BottomSurface` (DOM-authored display views)
  - `capture/` — capture interface + browser implementation
  - `display-profiles/` — palettes, resolutions, refresh models
  - `display-sim/` — quantize/dither/ghosting + optional packing
  - `mock-data/` — scenario fixtures
  - `shared/` — types/utilities

- `docs/`
  - `SIMULATOR_SPEC.md` (this)
  - `DISPLAY_PROFILES.md`
  - `RENDER_PIPELINE.md`

## Key abstractions (TypeScript interfaces)

### Display profiles

```ts
export type DisplayMode =
	| 'mono1' // 1bpp
	| 'mono2' // 2bpp (4 greys)
	| 'palette6' // 6-colour indexed
	| 'palette7'; // 7-colour indexed

export interface Rgb {
	r: number; // 0-255
	g: number;
	b: number;
}

export interface DisplayResolution {
	width: number;
	height: number;
}

export interface RefreshModel {
	fullRefreshMs: number;
	supportsPartial: boolean;
	partialRefreshMs?: number;
	// How quickly ghosting builds up with partial refresh.
	ghostingStrength: number; // 0..1
	// How much a full refresh clears history.
	fullCleanStrength: number; // 0..1
}

export interface DisplayProfile {
	id: string;
	name: string;
	resolution: DisplayResolution;
	mode: DisplayMode;
	palette: Rgb[]; // greys are also represented as palette entries
	refresh: RefreshModel;
}
```

### Scenes and view-model

Scenes convert application state into display-specific view models.

```ts
export type DisplayTarget = 'top' | 'bottom';

export interface AppState {
	now: Date;
	scenarioId: string;
	selectedDate: string; // YYYY-MM-DD
	// later: calendars, user settings, etc.
}

export interface SurfaceProps {
	target: DisplayTarget;
	profile: DisplayProfile;
	state: AppState;
}

export interface Scene {
	id: string;
	name: string;
	// Update state in response to an interaction (tap, long-press, etc.).
	reduce?(state: AppState, action: SceneAction): AppState;
	// For Phase A, the scene is represented by DOM surfaces.
	// Later phases can add a pixel-renderer backend.
}

export type SceneAction =
	| { type: 'tap'; x: number; y: number; target: DisplayTarget }
	| { type: 'setSelectedDate'; date: string }
	| { type: 'next' }
	| { type: 'prev' };
```

### Capture and simulation pipeline

```ts
export interface CapturedFrame {
	width: number;
	height: number;
	// RGBA pixels, row-major.
	rgba: Uint8ClampedArray;
}

export interface CaptureBackend {
	capture(element: HTMLElement, width: number, height: number): Promise<CapturedFrame>;
}

export type DitherMethod = 'none' | 'bayer' | 'floyd-steinberg';

export interface SimulateOptions {
	dither: DitherMethod;
	// Optional pre-processing
	contrast?: number; // 0.5..2
	gamma?: number; // 0.5..2
	// Refresh behaviour
	refreshMode: 'full' | 'partial';
}

export interface SimulatedFrame {
	width: number;
	height: number;
	// Palette index per pixel.
	indices: Uint8Array;
	// A previewable RGBA image for the simulator UI.
	previewRgba: Uint8ClampedArray;
	// Optional packed buffer for future hardware.
	packed?: Uint8Array;
}

export interface DisplaySimulator {
	simulate(profile: DisplayProfile, input: CapturedFrame, options: SimulateOptions): SimulatedFrame;

	// Maintain per-display history to model ghosting.
	commit(target: DisplayTarget, frame: SimulatedFrame): void;
	clearHistory(target: DisplayTarget): void;
}
```

## Implementation milestones

### Milestone 1 — Skeleton simulator

- Monorepo scaffold
- Simulator web app boots
- Two display regions with fixed sizes
- Mock month grid + mock top image area

### Milestone 2 — Capture + simulated preview

- Implement capture backend (browser)
- Implement quantization to palette/greys
- Implement one dithering method
- Show ideal vs simulated output

### Milestone 3 — Interaction + refresh behaviour

- Bottom tap selects a date
- Partial refresh is the default visual feedback path (small-region updates)
- Full refresh cleanup controls + optional scheduled cleanup
- Basic ghosting model (history accumulation) + full refresh clearing

### Milestone 4 — Export

- Save PNG for top/bottom
- Save scenario snapshots

## Risks and trade-offs

- DOM snapshot rendering is convenient but may introduce nondeterminism across platforms.
- Partial refresh modelling will be approximate, especially for ghosting and cleanup behaviour.
- Palette/dither/ghosting simulation will be approximate.
- Later migration to a pixel renderer is a planned change; keep boundaries clean to reduce rewrite cost.

## Open questions

- Final target resolutions and physical orientation (top and bottom) for early profiles.
- Capture mechanism selection in browser and headless strategy for Pi.
- The initial UI set: month grid + day detail + busy heatmap vs agenda-first.
