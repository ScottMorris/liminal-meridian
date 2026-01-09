import type { CalendarEvent } from '@liminal/shared/types/calendar';

export const BASE_YEAR = 2024;
export const BASE_MONTH = 9; // October (0-indexed)

export const getBaseDate = (day: number): Date => {
	return new Date(BASE_YEAR, BASE_MONTH, day);
};

export const formatDate = (date: Date): string => {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
};

export const createEvent = (
	id: string,
	title: string,
	day: number,
	startHour: number,
	durationHours: number,
	calendarId?: string,
): CalendarEvent => {
	const date = getBaseDate(day);
	const start = new Date(date);
	start.setHours(startHour, 0, 0, 0);
	const end = new Date(start);
	end.setHours(startHour + durationHours, 0, 0, 0);

	return {
		id,
		title,
		start: start.toISOString(),
		end: end.toISOString(),
		calendarId,
		allDay: false,
	};
};
