import { handleActions } from 'redux-actions';
import { getDashboardData } from './routines';

export type DashboardData = Array<{
  info: string;
}>;

type DashboardReducer = {
  data: DashboardData;
};

const defaultState: DashboardReducer = {
  data: [],
};

const dashboardReducer = handleActions(
  {
    [getDashboardData.SUCCESS]: (
      state,
      action: ReturnType<typeof getDashboardData.success>,
    ) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  defaultState,
);

export default dashboardReducer;
