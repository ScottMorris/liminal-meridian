import type { Scenario } from '@liminal/shared/types/scenario';
import { BASE_YEAR, BASE_MONTH, formatDate, getBaseDate, createEvent } from '../utils';

export const BUSY_SCENARIO: Scenario = {
	id: 'busy-month',
	name: 'Busy Month',
	calendars: [
		{ id: 'cal-1', name: 'Work', colour: '#d50000' },
		{ id: 'cal-2', name: 'Personal', colour: '#33b679' },
	],
	events: [
		// Week 1
		createEvent('evt-1', 'Team Sync', 1, 10, 1, 'cal-1'),
		createEvent('evt-2', 'Lunch', 1, 12, 1, 'cal-2'),
		createEvent('evt-3', 'Project Review', 2, 14, 2, 'cal-1'),
		createEvent('evt-4', 'Dentist', 3, 9, 1, 'cal-2'),
		createEvent('evt-5', 'Sprint Planning', 4, 10, 2, 'cal-1'),
		createEvent('evt-6', 'Dinner with friends', 5, 19, 2, 'cal-2'),

		// Week 2 (Busy)
		createEvent('evt-7', 'Workshop Day 1', 8, 9, 8, 'cal-1'),
		createEvent('evt-8', 'Workshop Day 2', 9, 9, 8, 'cal-1'),
		createEvent('evt-9', 'Workshop Day 3', 10, 9, 8, 'cal-1'),
		createEvent('evt-10', 'Sync', 11, 10, 0.5, 'cal-1'),
		createEvent('evt-11', 'Focus Time', 11, 14, 3, 'cal-1'),

		// Scattered
		createEvent('evt-12', 'Gym', 15, 7, 1, 'cal-2'),
		createEvent('evt-13', 'Gym', 17, 7, 1, 'cal-2'),
		createEvent('evt-14', 'Gym', 19, 7, 1, 'cal-2'),

		// Week 3
		createEvent('evt-15', 'Client Call', 22, 16, 1, 'cal-1'),
		createEvent('evt-16', 'Deadline', 24, 17, 0, 'cal-1'),
	],
	initial: {
		monthAnchor: new Date(BASE_YEAR, BASE_MONTH, 1),
		selectedDate: formatDate(getBaseDate(8)), // Start on the busy week
	},
};
