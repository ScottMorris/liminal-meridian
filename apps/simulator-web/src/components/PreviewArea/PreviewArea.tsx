import React, { CSSProperties } from 'react';
import styles from './PreviewArea.module.css';
import type { DisplayProfile } from '@liminal/shared/types/profile';

interface PreviewAreaProps {
	topProfile: DisplayProfile;
	bottomProfile: DisplayProfile;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ topProfile, bottomProfile }) => {
	return (
		<div className={styles.container}>
			<div className={styles.displayStack}>
				{/* Top Display: Colour e-paper */}
				<div
					className={styles.topDisplay}
					style={
						{
							aspectRatio: `${topProfile.resolution.width} / ${topProfile.resolution.height}`,
							// Optional: max width logic if needed, but flex/grid usually handles it.
							// We'll trust the container layout for now, but adding explicit aspect-ratio
							// ensures the shape is correct.
						} as CSSProperties
					}
				>
					<span className={styles.placeholderText}>
						Top: {topProfile.resolution.width} x {topProfile.resolution.height}
					</span>
				</div>

				{/* Bottom Display: Monochrome touch */}
				<div
					className={styles.bottomDisplay}
					style={
						{
							aspectRatio: `${bottomProfile.resolution.width} / ${bottomProfile.resolution.height}`,
						} as CSSProperties
					}
				>
					<span className={styles.placeholderText}>
						Bottom: {bottomProfile.resolution.width} x {bottomProfile.resolution.height}
					</span>
				</div>
			</div>
		</div>
	);
};
