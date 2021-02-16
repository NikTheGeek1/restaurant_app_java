import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import userDetailsReducer from './store/reducers/user-details';

const rootReducer = combineReducers({
  userDetails: userDetailsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
