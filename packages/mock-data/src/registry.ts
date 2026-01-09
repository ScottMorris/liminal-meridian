import type { Scenario } from '@liminal/shared/types/scenario';
import { EMPTY_SCENARIO } from './scenarios/empty';
import { BUSY_SCENARIO } from './scenarios/busy';

export const SCENARIOS: Scenario[] = [EMPTY_SCENARIO, BUSY_SCENARIO];

export const getScenarioById = (id: string): Scenario | undefined => {
	return SCENARIOS.find((s) => s.id === id);
};

export { EMPTY_SCENARIO, BUSY_SCENARIO };
