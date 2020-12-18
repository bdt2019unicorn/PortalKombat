import { RootState } from 'state';

export const selectDashboardData = (state: RootState) => state.dashboard.data;
