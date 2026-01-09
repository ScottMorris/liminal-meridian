import React from 'react';
import styles from './PreviewArea.module.css';
import type { DisplayProfile } from '@liminal/shared/types/profile';
import { TopSurface } from '@liminal/surfaces/top-surface';
import { BottomSurface } from '@liminal/surfaces/bottom-surface';
import type { DeviceConfig } from '@liminal/shared/types/config';
import type { CalendarEvent } from '@liminal/shared/types/calendar';

interface PreviewAreaProps {
	topProfile: DisplayProfile;
	bottomProfile: DisplayProfile;
	selectedDate: string;
	onDateSelect: (date: string) => void;
	monthAnchor: Date;
	bezelCrop: boolean;
	deviceConfig: DeviceConfig;
	events?: CalendarEvent[];
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
	topProfile,
	bottomProfile,
	selectedDate,
	onDateSelect,
	monthAnchor,
	bezelCrop,
	deviceConfig,
	events = [],
}) => {
	// Simple fixed scale for now to fit the large surfaces in the simulator view
	// In a real app we might calculate this dynamically based on window size
	const SCALE = 0.25;

	// Calculate crop
	const horizontalDiff = Math.max(0, bottomProfile.resolution.width - topProfile.resolution.width);
	const baseCrop = horizontalDiff / 2;

	let leftCrop = 0;
	let rightCrop = 0;

	if (bezelCrop) {
		const configLeft = deviceConfig.bottomSurface?.cropLeft || 0;
		const configRight = deviceConfig.bottomSurface?.cropRight || 0;
		leftCrop = Math.max(0, baseCrop + configLeft);
		rightCrop = Math.max(0, baseCrop + configRight);
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
						width: bottomProfile.resolution.width * SCALE,
						height: bottomProfile.resolution.height * SCALE,
						position: 'relative',
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
						<BottomSurface
							profile={bottomProfile}
							selectedDate={selectedDate}
							onDateSelect={onDateSelect}
							monthAnchor={monthAnchor}
							cropLeft={leftCrop}
							cropRight={rightCrop}
							events={events}
						/>
					</div>

					{/* Bezel Overlays */}
					{bezelCrop && (
						<>
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									left: 0,
									width: leftCrop * SCALE,
									backgroundColor: 'rgba(0, 0, 0, 0.5)',
									zIndex: 10,
									pointerEvents: 'none',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									right: 0,
									width: rightCrop * SCALE,
									backgroundColor: 'rgba(0, 0, 0, 0.5)',
									zIndex: 10,
									pointerEvents: 'none',
								}}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
