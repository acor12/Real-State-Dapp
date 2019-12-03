import React, { Component } from "react";

import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import AppRoutes from './routes/AppRoutes';
import rootReducer from './redux/reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import { BrowserRouter as Router } from 'react-router-dom';
import RootContainer from './containers/RootContainer';

import "./App.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, createPromise({
  promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
}))))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer>
          <Router>
            <AppRoutes />
          </Router>
        </RootContainer>
      </Provider>
    );
  }
}

export default App;
