import type { Rgb } from '@liminal/shared/types/colour';

export const PALETTE_7: Rgb[] = [
	{ r: 255, g: 255, b: 255 }, // White
	{ r: 0, g: 0, b: 0 }, // Black
	{ r: 255, g: 0, b: 0 }, // Red
	{ r: 255, g: 255, b: 0 }, // Yellow
	{ r: 0, g: 0, b: 255 }, // Blue
	{ r: 0, g: 128, b: 0 }, // Green (Standard Web Green, verify if specific hex needed)
	{ r: 255, g: 165, b: 0 }, // Orange
];

export const MONO_4: Rgb[] = [
	{ r: 255, g: 255, b: 255 }, // White
	{ r: 211, g: 211, b: 211 }, // Light Grey (placeholder)
	{ r: 105, g: 105, b: 105 }, // Dark Grey (placeholder)
	{ r: 0, g: 0, b: 0 }, // Black
];

export const MONO_2: Rgb[] = [
	{ r: 255, g: 255, b: 255 }, // White
	{ r: 0, g: 0, b: 0 }, // Black
];
