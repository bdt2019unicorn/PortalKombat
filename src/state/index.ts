import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Action, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork } from 'redux-saga/effects';

import metaReducer from 'state/meta/reducer';
import dashboardReducer from 'state/dashboard/reducer';
import dashboardSaga from 'state/dashboard/saga';

const appReducer = combineReducers({
  dashboard: dashboardReducer,
  meta: metaReducer,
  routing: routerReducer,
});

type AppState = ReturnType<typeof appReducer>;

export const rootReducer = (state: AppState, action: Action) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function* rootSaga() {
  yield fork(dashboardSaga);
}
