import { applyMiddleware, createStore, combineReducers, compose, bindActionCreators } from 'redux';
import reducers from '../reducer';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import _ from 'lodash';
import { conbinedActions } from '../actions';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export default context => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const history = createHistory();
  const middlewares = [
    thunk,
    routerMiddleware(history),
    createLogger({ duration: true, diff: true }),
  ];
  const store = createStore(
    combineReducers({ ...reducers, routing: routerReducer }),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextRootReducer = require('../reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  const actions = _.mapValues(conbinedActions, action =>
    bindActionCreators(action, store.dispatch)
  );

  return Promise.resolve({ ...context, ...{ store, history, actions } });
};
