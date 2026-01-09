import React, { useReducer, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { PreviewArea } from './components/PreviewArea/PreviewArea';
import { useTheme } from './hooks/useTheme';
import { getDefaultProfiles, validateProfiles } from '@liminal/display-profiles';
import type { DeviceConfig } from '@liminal/shared/types/config';
import { initialState, reducer } from '@liminal/core/state';
import { getScenarioById } from '@liminal/mock-data';

const App: React.FC = () => {
	const { mode, setMode, resolvedTheme } = useTheme();

	// Initialize core state
	const [appState, dispatch] = useReducer(reducer, initialState);

	// Load initial scenario on mount if not loaded
	useEffect(() => {
		if (!appState.scenarioId) {
			const defaultScenario = getScenarioById('empty-month');
			if (defaultScenario) {
				dispatch({ type: 'LOAD_SCENARIO', payload: defaultScenario });
			}
		}
	}, [appState.scenarioId]);

	const handleScenarioChange = (id: string) => {
		const scenario = getScenarioById(id);
		if (scenario) {
			dispatch({ type: 'LOAD_SCENARIO', payload: scenario });
		}
	};

	const handleDateSelect = (date: string) => {
		dispatch({ type: 'SET_DATE', payload: date });
	};

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
				scenarioId={appState.scenarioId}
				onScenarioChange={handleScenarioChange}
			/>
			<PreviewArea
				topProfile={selectedTopProfile}
				bottomProfile={selectedBottomProfile}
				selectedDate={appState.view.selectedDate}
				onDateSelect={handleDateSelect}
				monthAnchor={appState.view.monthAnchor}
				bezelCrop={bezelCrop}
				deviceConfig={deviceConfig}
				events={appState.events}
			/>
		</div>
	);
};

export default App;
