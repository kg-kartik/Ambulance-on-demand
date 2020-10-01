import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from "./User"
import * as serviceWorker from './serviceWorker';
import {Route,BrowserRouter as Router, Switch} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Switch>
      <Route path ="/sign-up" component={SignUp} />
      <Route path ="/login" component={Login} />
      <Route path="/:ambulanceid" component= {App} />
      <Route path ="/" exact component={User} />
    </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
