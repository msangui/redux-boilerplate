/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from './promiseMiddleware';
import logMiddleware from './logMiddleware';
import * as reducers from '../reducers/index';
const reducer = combineReducers(reducers);

export default function(data) {
  const _promiseMiddleware = promiseMiddleware();
  const _logMiddleware = logMiddleware();

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(_promiseMiddleware, _logMiddleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );
  } else {
    finalCreateStore = applyMiddleware(_promiseMiddleware)(createStore);
  }
  return finalCreateStore(reducer, data);
}
