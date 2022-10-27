import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import { API_URL } from "./config"
import { BrowserRouter } from 'react-router-dom';
import { } from "react-router";
import { Provider } from 'react-redux';
import { AppState, reducer } from './store/reducer';
import { DispatchType, SetUserDataAction } from './type';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import "./index.css"

axios.defaults.baseURL = API_URL

const store: Store<AppState, SetUserDataAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
