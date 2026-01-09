import type { RefreshModel } from '@liminal/shared/types/profile';

// Top (colour, palette7): full refresh only
export const REFRESH_TOP_DEFAULT: RefreshModel = {
	fullRefreshMs: 25000,
	supportsPartial: false,
	ghostingStrength: 0.03, // small accumulation across full refreshes
	fullCleanStrength: 1.0,
};

// Bottom (mono, interactive): supports partial
export const REFRESH_BOTTOM_DEFAULT: RefreshModel = {
	fullRefreshMs: 2000,
	supportsPartial: true,
	partialRefreshMs: 400,
	ghostingStrength: 0.1,
	fullCleanStrength: 0.95,
};
