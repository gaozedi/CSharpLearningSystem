import React from "react";
import ReactDOM from "react-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import { Router } from "react-router-dom";
import {createBrowserHistory} from 'history'
import "./app/layout/styles.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import 'react-toastify/dist/ReactToastify.min.css';
export const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
      <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
