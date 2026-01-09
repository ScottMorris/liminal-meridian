export function getDaysInMonth(year: number, month: number): number {
	// month is 0-indexed (0 = January)
	// Day 0 of the next month is the last day of the current month
	return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
	// Returns 0 for Sunday, 1 for Monday, etc.
	return new Date(year, month, 1).getDay();
}

export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

/**
 * Returns an array of calendar days for a given month/year grid.
 * It includes padding for the previous month and next month to fill a 7-column grid if needed,
 * or at least enough to place the first day correctly.
 * For this simple version, we'll just return the number of padding slots and the number of days.
 */
export function getCalendarGrid(year: number, month: number) {
	const daysInMonth = getDaysInMonth(year, month);
	const startDay = getFirstDayOfMonth(year, month);

	return {
		daysInMonth,
		startDay, // 0-6 (Sun-Sat)
	};
}
