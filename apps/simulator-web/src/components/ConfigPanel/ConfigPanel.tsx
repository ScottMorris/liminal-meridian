import React from 'react';
import { ThemeMode } from '../../hooks/useTheme';
import styles from './ConfigPanel.module.css';

interface ConfigPanelProps {
	themeMode: ThemeMode;
	onThemeChange: (mode: ThemeMode) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ themeMode, onThemeChange }) => {
	return (
		<div className={styles.container}>
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
				<h3 className={styles.sectionTitle}>Display Profiles</h3>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Top Display</label>
					<select className={styles.select} disabled>
						<option>Standard Colour</option>
					</select>
				</div>
				<div className={styles.controlGroup}>
					<label className={styles.label}>Bottom Display</label>
					<select className={styles.select} disabled>
						<option>Standard Monochrome</option>
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
