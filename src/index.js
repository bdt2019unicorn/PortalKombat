import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import {
  routerMiddleware as createRouterMiddleware,
  syncHistoryWithStore,
} from 'react-router-redux';
import { rootReducer, rootSaga } from 'state';
import * as serviceWorker from './serviceWorker';
import App from 'app/App';
import './index.scss';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';

const isDevelopmentMode = process.env.NODE_ENV !== 'production';
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);
const allMiddleware = [sagaMiddleware, routerMiddleware];

/** FetchInterceptor a nice to have */
// const fetchInterceptor = new Interceptor();

// fetchInterceptor.register();

const composeEnhancers =
  isDevelopmentMode && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...allMiddleware)),
);

syncHistoryWithStore(history, store);

sagaMiddleware.run(rootSaga);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <LastLocationProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </LastLocationProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
