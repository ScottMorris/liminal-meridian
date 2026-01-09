import React, { CSSProperties } from 'react';
import styles from './PixelSurfaceFrame.module.css';
import type { DisplayProfile } from '@liminal/shared/types/profile';

export interface PixelSurfaceFrameProps {
	profile: DisplayProfile;
	children: React.ReactNode;
	className?: string;
	style?: CSSProperties;
}

export const PixelSurfaceFrame: React.FC<PixelSurfaceFrameProps> = ({
	profile,
	children,
	className,
	style,
}) => {
	const frameStyle: CSSProperties = {
		width: `${profile.resolution.width}px`,
		height: `${profile.resolution.height}px`,
		...style,
	};

	return (
		<div className={`${styles.frame} ${className || ''}`} style={frameStyle}>
			{children}
		</div>
	);
};
