import React from 'react';
import styles from './PreviewArea.module.css';

export const PreviewArea: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.displayStack}>
				{/* Top Display: Colour e-paper */}
				<div className={styles.topDisplay}>
					<span className={styles.placeholderText}>Top Display (Colour)</span>
				</div>

				{/* Bottom Display: Monochrome touch */}
				<div className={styles.bottomDisplay}>
					<span className={styles.placeholderText}>Bottom Display (Touch)</span>
				</div>
			</div>
		</div>
	);
};
