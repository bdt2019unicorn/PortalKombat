import { createCacheableRoutine } from 'state/cacheableRoutines';
import { DashboardData } from './reducer';

export const getDashboardData = createCacheableRoutine('GET_DASHBOARD_DATA', {
  trigger: (payload: { id: string }) => payload,
  success: (payload: DashboardData) => payload,
});
