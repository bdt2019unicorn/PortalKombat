import { takeLatest, put, call } from 'redux-saga/effects';

import { getDashboardData } from 'state/dashboard/routines';
import { DashboardData } from './reducer';

/** TOUPDATE */
function* getDashboardDataTrigger(
  action: ReturnType<typeof getDashboardData.trigger>,
) {
  try {
    const mockDashboardData: DashboardData = [
      {
        info:
          'Update position of ErrorBoundary (if needed), and make sure to update ErrorPage with information relevant to the app you are building',
      },
      {
        info:
          'Delete or refactor state/dashboard/*; the routines/saga/reducer/selectors there are placeholders and examples of usage with async-routines. You might want to rename this -- or if dashboard is relevant to you; go ahead and replace the mocked-data call with a real API call',
      },
      {
        info:
          'Search "TOUPDATE" in the code-base to find any boilerplate code you might have missed',
      },
    ];

    const dashboardData: DashboardData = yield call(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(mockDashboardData);
          }, 2000);
        }),
    );

    yield put(getDashboardData.success(dashboardData));
  } catch (e) {
    yield put(getDashboardData.failure(e));
  } finally {
    yield put(getDashboardData.fulfill(action.payload));
  }
}

function* dashboardSaga() {
  yield takeLatest(getDashboardData.TRIGGER, getDashboardDataTrigger);
}

export default dashboardSaga;
