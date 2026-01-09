import type { DisplayProfile } from '@liminal/shared/types/profile';

export function validateProfiles(profiles: {
	top: DisplayProfile[];
	bottom: DisplayProfile[];
}): void {
	const allProfiles = [...profiles.top, ...profiles.bottom];
	const seenIds = new Set<string>();

	for (const profile of allProfiles) {
		// 1. Unique IDs
		if (seenIds.has(profile.id)) {
			throw new Error(`Duplicate profile ID found: ${profile.id}`);
		}
		seenIds.add(profile.id);

		// 2. Palette length matches mode
		const paletteLen = profile.palette.length;
		switch (profile.mode) {
			case 'mono1':
				if (paletteLen !== 2) {
					throw new Error(
						`Profile ${profile.id} has mode 'mono1' but palette length is ${paletteLen} (expected 2)`,
					);
				}
				break;
			case 'mono2':
				if (paletteLen !== 4) {
					throw new Error(
						`Profile ${profile.id} has mode 'mono2' but palette length is ${paletteLen} (expected 4)`,
					);
				}
				break;
			case 'palette6':
				if (paletteLen !== 6) {
					throw new Error(
						`Profile ${profile.id} has mode 'palette6' but palette length is ${paletteLen} (expected 6)`,
					);
				}
				break;
			case 'palette7':
				if (paletteLen !== 7) {
					throw new Error(
						`Profile ${profile.id} has mode 'palette7' but palette length is ${paletteLen} (expected 7)`,
					);
				}
				break;
		}

		// 3. Refresh consistency
		if (profile.refresh.supportsPartial) {
			if (profile.refresh.partialRefreshMs === undefined) {
				throw new Error(
					`Profile ${profile.id} supports partial refresh but 'partialRefreshMs' is undefined`,
				);
			}
		} else {
			if (profile.refresh.partialRefreshMs !== undefined) {
				throw new Error(
					`Profile ${profile.id} does not support partial refresh but 'partialRefreshMs' is defined`,
				);
			}
		}
	}
}
