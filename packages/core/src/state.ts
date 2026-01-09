import type { Scenario, ScenarioInitialState } from '@liminal/shared/types/scenario';
import type { Calendar, CalendarEvent } from '@liminal/shared/types/calendar';

export interface AppState {
	scenarioId: string;
	calendars: Calendar[];
	events: CalendarEvent[];
	view: ScenarioInitialState;
}

export type Action =
	| { type: 'LOAD_SCENARIO'; payload: Scenario }
	| { type: 'SET_DATE'; payload: string }
	| { type: 'SET_MONTH_ANCHOR'; payload: Date };

export const initialState: AppState = {
	scenarioId: '',
	calendars: [],
	events: [],
	view: {
		monthAnchor: new Date(),
		selectedDate: new Date().toISOString().split('T')[0],
	},
};

export const reducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'LOAD_SCENARIO':
			return {
				...state,
				scenarioId: action.payload.id,
				calendars: action.payload.calendars,
				events: action.payload.events,
				view: action.payload.initial,
			};
		case 'SET_DATE':
			return {
				...state,
				view: {
					...state.view,
					selectedDate: action.payload,
				},
			};
		case 'SET_MONTH_ANCHOR':
			return {
				...state,
				view: {
					...state.view,
					monthAnchor: action.payload,
				},
			};
		default:
			return state;
	}
};

// Selectors
export const selectEventsForDate = (state: AppState, date: string): CalendarEvent[] => {
	return state.events.filter((event) => event.start.startsWith(date));
};
