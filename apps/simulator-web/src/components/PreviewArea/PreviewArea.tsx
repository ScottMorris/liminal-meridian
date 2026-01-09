import React from 'react';
import styles from './PreviewArea.module.css';
import type { DisplayProfile } from '@liminal/shared/types/profile';
import { TopSurface } from '@liminal/surfaces/top-surface';
import { BottomSurface } from '@liminal/surfaces/bottom-surface';

interface PreviewAreaProps {
	topProfile: DisplayProfile;
	bottomProfile: DisplayProfile;
	selectedDate: string;
	onDateSelect: (date: string) => void;
	monthAnchor: Date;
	bezelCrop: boolean;
	bezelInsetLeft: number;
	bezelInsetRight: number;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
	topProfile,
	bottomProfile,
	selectedDate,
	onDateSelect,
	monthAnchor,
	bezelCrop,
	bezelInsetLeft,
	bezelInsetRight,
}) => {
	// Simple fixed scale for now to fit the large surfaces in the simulator view
	// In a real app we might calculate this dynamically based on window size
	const SCALE = 0.25;

	// Calculate crop
	let bottomVisibleWidth = bottomProfile.resolution.width;
	let bottomVisibleOffset = 0;

	if (bezelCrop) {
		const horizontalDiff = Math.max(
			0,
			bottomProfile.resolution.width - topProfile.resolution.width,
		);
		const baseCrop = horizontalDiff / 2;
		const finalLeftCrop = baseCrop + bezelInsetLeft;
		const finalRightCrop = baseCrop + bezelInsetRight;

		bottomVisibleWidth = Math.max(
			0,
			bottomProfile.resolution.width - finalLeftCrop - finalRightCrop,
		);
		bottomVisibleOffset = -finalLeftCrop;
	}

	return (
		<div className={styles.container}>
			<div className={styles.displayStack}>
				{/* Top Display: Colour e-paper */}
				<div
					className={styles.topDisplay}
					style={{
						width: topProfile.resolution.width * SCALE,
						height: topProfile.resolution.height * SCALE,
					}}
				>
					<div
						style={{
							transform: `scale(${SCALE})`,
							transformOrigin: 'top left',
							position: 'absolute',
							top: 0,
							left: 0,
						}}
					>
						<TopSurface profile={topProfile} />
					</div>
				</div>

				{/* Bottom Display: Monochrome touch */}
				<div
					className={styles.bottomDisplay}
					style={{
						width: bottomVisibleWidth * SCALE,
						height: bottomProfile.resolution.height * SCALE,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							transform: `scale(${SCALE})`,
							transformOrigin: 'top left',
							position: 'absolute',
							top: 0,
							left: bottomVisibleOffset * SCALE,
						}}
					>
						<BottomSurface
							profile={bottomProfile}
							selectedDate={selectedDate}
							onDateSelect={onDateSelect}
							monthAnchor={monthAnchor}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
