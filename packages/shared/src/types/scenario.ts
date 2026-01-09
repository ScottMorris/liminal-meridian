import type { Calendar, CalendarEvent } from './calendar';

export interface ScenarioInitialState {
	monthAnchor: Date;
	selectedDate: string; // YYYY-MM-DD
}

export interface Scenario {
	id: string;
	name: string;
	calendars: Calendar[];
	events: CalendarEvent[];
	initial: ScenarioInitialState;
}
