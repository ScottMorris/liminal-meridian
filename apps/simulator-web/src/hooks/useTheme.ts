import { useEffect, useState } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';

export const useTheme = () => {
	const [mode, setMode] = useState<ThemeMode>('system');
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = () => {
			if (mode === 'system') {
				setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
			}
		};

		// Initial check
		/* eslint-disable react-hooks/set-state-in-effect */
		if (mode === 'system') {
			setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
		} else {
			setResolvedTheme(mode);
		}
		/* eslint-enable react-hooks/set-state-in-effect */

		// Listen for system changes
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [mode]);

	return { mode, setMode, resolvedTheme };
};
