import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from "./User"
import * as serviceWorker from './serviceWorker';
import {Route,BrowserRouter as Router} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Route path="/:ambulanceid" component= {App} />
    <Route path ="/" exact component={User} />
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
