import React from 'react';
import styles from './App.module.css';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { PreviewArea } from './components/PreviewArea/PreviewArea';
import { useTheme } from './hooks/useTheme';
import { getDefaultProfiles, validateProfiles } from '@liminal/display-profiles';
import type { DeviceConfig } from '@liminal/shared/types/config';
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

	// Date state for BottomSurface
	const [selectedDate, setSelectedDate] = useState(() => {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
	});
	const [monthAnchor] = useState(new Date()); // Default to current month, could be state if we added month navigation

	// Bezel configuration
	const [bezelCrop, setBezelCrop] = useState(false);
	const [deviceConfig, setDeviceConfig] = useState<DeviceConfig>({
		bottomSurface: {
			cropLeft: 0,
			cropRight: 0,
		},
	});

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
				bezelCrop={bezelCrop}
				onBezelCropChange={setBezelCrop}
				deviceConfig={deviceConfig}
				onDeviceConfigChange={setDeviceConfig}
			/>
			<PreviewArea
				topProfile={selectedTopProfile}
				bottomProfile={selectedBottomProfile}
				selectedDate={selectedDate}
				onDateSelect={setSelectedDate}
				monthAnchor={monthAnchor}
				bezelCrop={bezelCrop}
				deviceConfig={deviceConfig}
			/>
		</div>
	);
};

export default App;
