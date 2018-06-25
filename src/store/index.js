import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import redux_promise from 'redux-promise';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducer';

export const hashHistory = createHistory();

function composedCreateStore() {
  const middlewares = [redux_promise, thunk, routerMiddleware(hashHistory)];
  middlewares.push(
    createLogger({
      collapsed: true,
    })
  );

  const storeEnhancers = [applyMiddleware(...middlewares)];

  if (window.devToolsExtension) {
    storeEnhancers.push(window.devToolsExtension());
  }

  return compose(...storeEnhancers)(createStore);
}

export function finalCreateStore(initialState) {
  return composedCreateStore()(rootReducer, initialState);
}

export default finalCreateStore;
