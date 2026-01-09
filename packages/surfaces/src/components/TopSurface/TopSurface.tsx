import React from 'react';
import { PixelSurfaceFrame } from '../PixelSurfaceFrame/PixelSurfaceFrame';
import type { DisplayProfile } from '@liminal/shared/types/profile';
import styles from './TopSurface.module.css';

export interface TopSurfaceProps {
	profile: DisplayProfile;
}

export const TopSurface: React.FC<TopSurfaceProps> = ({ profile }) => {
	return (
		<PixelSurfaceFrame profile={profile} className={styles.container}>
			<div className={styles.imageArea}>
				<span className={styles.placeholderLabel}>Image / Artwork</span>
			</div>

			<div className={styles.cardRow}>
				<div className={styles.card}>
					<div className={styles.cardTitle}>Next Up</div>
					<div className={styles.cardContent}>
						<div>
							<div style={{ fontWeight: 600 }}>Team Sync</div>
							<div style={{ fontSize: '20px', marginTop: '8px', color: '#666' }}>
								10:00 AM - 11:00 AM
							</div>
						</div>
					</div>
				</div>

				<div className={styles.card}>
					<div className={styles.cardTitle}>Weather</div>
					<div className={styles.cardContent}>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontSize: '48px' }}>22°C</div>
							<div style={{ fontSize: '20px', marginTop: '8px', color: '#666' }}>Partly Cloudy</div>
						</div>
					</div>
				</div>
			</div>
		</PixelSurfaceFrame>
	);
};
