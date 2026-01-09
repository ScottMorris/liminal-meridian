import React from 'react';
import { ThemeMode } from '../../hooks/useTheme';
import styles from './ConfigPanel.module.css';
import type { DisplayProfile } from '@liminal/shared/types/profile';
import type { DisplayTarget } from '@liminal/shared/types/display';
import type { DeviceConfig } from '@liminal/shared/types/config';
import { SCENARIOS } from '@liminal/mock-data';

interface ConfigPanelProps {
	themeMode: ThemeMode;
	onThemeChange: (mode: ThemeMode) => void;
	topProfiles: DisplayProfile[];
	bottomProfiles: DisplayProfile[];
	selectedTopId: string;
	selectedBottomId: string;
	onProfileChange: (target: DisplayTarget, id: string) => void;
	bezelCrop: boolean;
	onBezelCropChange: (enabled: boolean) => void;
	deviceConfig: DeviceConfig;
	onDeviceConfigChange: (config: DeviceConfig) => void;
	scenarioId: string;
	onScenarioChange: (id: string) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
	themeMode,
	onThemeChange,
	topProfiles,
	bottomProfiles,
	selectedTopId,
	selectedBottomId,
	onProfileChange,
	bezelCrop,
	onBezelCropChange,
	deviceConfig,
	onDeviceConfigChange,
	scenarioId,
	onScenarioChange,
}) => {
	const [showImport, setShowImport] = React.useState(false);
	const [importValue, setImportValue] = React.useState('');

	const handleBottomSurfaceConfigChange = (key: 'cropLeft' | 'cropRight', value: number) => {
		onDeviceConfigChange({
			...deviceConfig,
			bottomSurface: {
				...deviceConfig.bottomSurface,
				[key]: value,
			},
		});
	};

	const handleExport = () => {
		const json = JSON.stringify(deviceConfig, null, 2);
		navigator.clipboard.writeText(json).then(() => {
			alert('Configuration copied to clipboard!');
		});
	};

	const handleImport = () => {
		try {
			const config = JSON.parse(importValue);
			onDeviceConfigChange(config);
			setShowImport(false);
			setImportValue('');
		} catch {
			alert('Invalid JSON configuration');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Scenario</h3>
				<div className={styles.controlGroup}>
					<select
						className={styles.select}
						value={scenarioId}
						onChange={(e) => onScenarioChange(e.target.value)}
					>
						<option value="" disabled>
							Select a scenario
						</option>
						{SCENARIOS.map((s) => (
							<option key={s.id} value={s.id}>
								{s.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Theme</h3>
				<div className={styles.controlGroup}>
					<select
						className={styles.select}
						value={themeMode}
						onChange={(e) => onThemeChange(e.target.value as ThemeMode)}
					>
						<option value="system">System Default</option>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
					</select>
				</div>
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Bezel Configuration</h3>
				<div className={styles.controlGroup}>
					<label className={styles.checkboxLabel}>
						<input
							type="checkbox"
							checked={bezelCrop}
							onChange={(e) => onBezelCropChange(e.target.checked)}
						/>
						Enable Bezel Crop
					</label>
				</div>
				{bezelCrop && (
					<>
						<div className={styles.controlGroup}>
							<label className={styles.label}>
								Left Inset (px)
								<input
									type="number"
									className={styles.input}
									value={deviceConfig.bottomSurface?.cropLeft || 0}
									onChange={(e) =>
										handleBottomSurfaceConfigChange('cropLeft', Number(e.target.value))
									}
								/>
							</label>
						</div>
						<div className={styles.controlGroup}>
							<label className={styles.label}>
								Right Inset (px)
								<input
									type="number"
									className={styles.input}
									value={deviceConfig.bottomSurface?.cropRight || 0}
									onChange={(e) =>
										handleBottomSurfaceConfigChange('cropRight', Number(e.target.value))
									}
								/>
							</label>
						</div>
						<div className={styles.buttonGroup} style={{ marginTop: '1rem' }}>
							<button className={styles.button} onClick={handleExport}>
								Copy Config
							</button>
							<button className={styles.button} onClick={() => setShowImport(!showImport)}>
								Import...
							</button>
						</div>
						{showImport && (
							<div style={{ marginTop: '0.5rem' }}>
								<textarea
									className={styles.input}
									style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
									value={importValue}
									onChange={(e) => setImportValue(e.target.value)}
									placeholder="Paste JSON config here..."
								/>
								<button
									className={styles.button}
									style={{ marginTop: '0.5rem', width: '100%' }}
									onClick={handleImport}
								>
									Apply
								</button>
							</div>
						)}
					</>
				)}
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Display Profiles</h3>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Top Display</label>
					<select
						className={styles.select}
						value={selectedTopId}
						onChange={(e) => onProfileChange('top', e.target.value)}
					>
						{topProfiles.map((p) => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Bottom Display</label>
					<select
						className={styles.select}
						value={selectedBottomId}
						onChange={(e) => onProfileChange('bottom', e.target.value)}
					>
						{bottomProfiles.map((p) => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Preview Mode</h3>
				<div className={styles.controlGroup}>
					<select className={styles.select} disabled>
						<option>Simulated</option>
						<option>Ideal</option>
					</select>
				</div>
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Dithering</h3>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Top Algorithm</label>
					<select className={styles.select} disabled>
						<option>Floyd-Steinberg</option>
					</select>
				</div>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Bottom Algorithm</label>
					<select className={styles.select} disabled>
						<option>Atkinson</option>
					</select>
				</div>
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Refresh Control</h3>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Top Display</label>
					<button className={styles.button} disabled>
						Full Refresh
					</button>
				</div>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Bottom Display</label>
					<div className={styles.buttonGroup}>
						<button className={styles.button} disabled>
							Partial
						</button>
						<button className={styles.button} disabled>
							Full Clean
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
