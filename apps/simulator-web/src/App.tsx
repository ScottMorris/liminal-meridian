import React from 'react';
import styles from './App.module.css';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { PreviewArea } from './components/PreviewArea/PreviewArea';
import { useTheme } from './hooks/useTheme';
import { getDefaultProfiles, validateProfiles } from '@liminal/display-profiles';
import { useEffect, useState, useMemo } from 'react';

const App: React.FC = () => {
	const { mode, setMode, resolvedTheme } = useTheme();

	// Initialize profiles
	const profiles = useMemo(() => getDefaultProfiles(), []);

	// Validate on mount
	useEffect(() => {
		try {
			validateProfiles(profiles);
			console.log('Display profiles validated successfully');
		} catch (e) {
			console.error('Display profile validation failed:', e);
		}
	}, [profiles]);

	const [topProfileId, setTopProfileId] = useState(profiles.top[0].id);
	const [bottomProfileId, setBottomProfileId] = useState(profiles.bottom[0].id);

	const selectedTopProfile = profiles.top.find((p) => p.id === topProfileId) || profiles.top[0];
	const selectedBottomProfile =
		profiles.bottom.find((p) => p.id === bottomProfileId) || profiles.bottom[0];

	return (
		<div className={styles.container} data-theme={resolvedTheme}>
			<ConfigPanel
				themeMode={mode}
				onThemeChange={setMode}
				topProfiles={profiles.top}
				bottomProfiles={profiles.bottom}
				selectedTopId={topProfileId}
				selectedBottomId={bottomProfileId}
				onProfileChange={(target, id) => {
					if (target === 'top') setTopProfileId(id);
					else setBottomProfileId(id);
				}}
			/>
			<PreviewArea topProfile={selectedTopProfile} bottomProfile={selectedBottomProfile} />
		</div>
	);
};

export default App;
