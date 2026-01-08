import type { Rgb } from './colour.js';
import type { DisplayMode, DisplayResolution } from './display.js';

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
	palette: Rgb[];
	refresh: RefreshModel;
}
