import React from 'react';
import Navigator from './navigation/Navigator';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import userDetailsReducer from './store/reducers/user-details';

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store} >
      <Navigator />
    </Provider >
  );
}

