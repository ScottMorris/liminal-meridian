import type { Scenario } from '@liminal/shared/types/scenario';
import { BASE_YEAR, BASE_MONTH, formatDate, getBaseDate } from '../utils';

export const EMPTY_SCENARIO: Scenario = {
	id: 'empty-month',
	name: 'Empty Month',
	calendars: [{ id: 'cal-1', name: 'Personal', colour: '#3366cc' }],
	events: [],
	initial: {
		monthAnchor: new Date(BASE_YEAR, BASE_MONTH, 1),
		selectedDate: formatDate(getBaseDate(1)),
	},
};
