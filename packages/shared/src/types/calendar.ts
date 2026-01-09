export interface Calendar {
	id: string;
	name: string;
	colour?: string;
}

export interface CalendarEvent {
	id: string;
	title: string;
	start: string; // ISO datetime
	end: string; // ISO datetime
	location?: string;
	calendarId?: string;
	allDay?: boolean;
}
