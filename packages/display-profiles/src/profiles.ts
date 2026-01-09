import type { DisplayProfile } from '@liminal/shared/types/profile';
import { PALETTE_7, MONO_4, MONO_2 } from './palettes.js';
import { REFRESH_TOP_DEFAULT, REFRESH_BOTTOM_DEFAULT } from './refresh.js';

const topProfiles: DisplayProfile[] = [
	{
		id: 'lm_top_colour_wide_1600x960',
		name: 'Top Colour Wide (placeholder)',
		resolution: { width: 1600, height: 960 },
		mode: 'palette7',
		palette: PALETTE_7,
		refresh: REFRESH_TOP_DEFAULT,
	},
	{
		id: 'lm_top_colour_tall_1404x1872',
		name: 'Top Colour Tall (placeholder)',
		resolution: { width: 1404, height: 1872 },
		mode: 'palette7',
		palette: PALETTE_7,
		refresh: REFRESH_TOP_DEFAULT,
	},
];

const bottomProfiles: DisplayProfile[] = [
	{
		id: 'lm_bottom_mono4_1872x1404',
		name: 'Bottom Mono 4-grey (placeholder)',
		resolution: { width: 1872, height: 1404 },
		mode: 'mono2',
		palette: MONO_4,
		refresh: REFRESH_BOTTOM_DEFAULT,
	},
	{
		id: 'lm_bottom_mono1_1872x1404',
		name: 'Bottom Mono 1bpp (placeholder)',
		resolution: { width: 1872, height: 1404 },
		mode: 'mono1',
		palette: MONO_2,
		refresh: REFRESH_BOTTOM_DEFAULT,
	},
];

export function getDefaultProfiles(): { top: DisplayProfile[]; bottom: DisplayProfile[] } {
	return {
		top: topProfiles,
		bottom: bottomProfiles,
	};
}
