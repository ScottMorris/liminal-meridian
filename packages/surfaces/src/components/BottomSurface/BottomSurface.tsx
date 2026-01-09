import React from 'react';
import { PixelSurfaceFrame } from '../PixelSurfaceFrame/PixelSurfaceFrame';
import type { DisplayProfile } from '@liminal/shared/types/profile';
import styles from './BottomSurface.module.css';
import { getCalendarGrid, formatDate } from '../../utils/date';

export interface BottomSurfaceProps {
	profile: DisplayProfile;
	selectedDate: string; // YYYY-MM-DD
	onDateSelect: (date: string) => void;
	monthAnchor: Date; // The month to display
	today?: Date;
	cropLeft?: number;
	cropRight?: number;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const BottomSurface: React.FC<BottomSurfaceProps> = ({
	profile,
	selectedDate,
	onDateSelect,
	monthAnchor,
	today = new Date(),
	cropLeft = 0,
	cropRight = 0,
}) => {
	const year = monthAnchor.getFullYear();
	const month = monthAnchor.getMonth(); // 0-11

	const { daysInMonth, startDay } = getCalendarGrid(year, month);

	const monthName = monthAnchor.toLocaleString('default', { month: 'long' });

	// Generate day cells
	const cells = [];

	// Padding for previous month
	for (let i = 0; i < startDay; i++) {
		cells.push(<div key={`pad-${i}`} className={styles.dayCell} style={{ cursor: 'default' }} />);
	}

	// Actual days
	for (let d = 1; d <= daysInMonth; d++) {
		const currentDate = new Date(year, month, d);
		const dateStr = formatDate(currentDate);
		const isSelected = dateStr === selectedDate;
		const isToday = formatDate(today) === dateStr;

		cells.push(
			<div
				key={d}
				className={`${styles.dayCell} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
				onClick={() => onDateSelect(dateStr)}
			>
				<span className={styles.dayNumber}>{d}</span>
				{isToday && <span className={styles.todayIndicator}>Today</span>}
			</div>,
		);
	}

	return (
		<PixelSurfaceFrame
			profile={profile}
			className={styles.container}
			style={{
				paddingLeft: cropLeft,
				paddingRight: cropRight,
				boxSizing: 'border-box',
			}}
		>
			<div className={styles.header}>
				<div className={styles.monthTitle}>{monthName}</div>
				<div className={styles.yearTitle}>{year}</div>
			</div>

			<div className={styles.weekdayHeader}>
				{WEEKDAYS.map((day) => (
					<div key={day} className={styles.weekdayLabel}>
						{day}
					</div>
				))}
			</div>

			<div className={styles.calendarGrid}>{cells}</div>
		</PixelSurfaceFrame>
	);
};
