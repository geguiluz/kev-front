import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

// With PrivateRoute, we add an extra layer to the router-dom, to check if user
// is authenticated before letting him see the component he's requesting
import PrivateRoute from './components/routing/PrivateRoute';

import DeviceState from './context/device/DeviceState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <DeviceState>
        <AlertState>
          <Router>
            <Fragment className='App'>
              <Navbar />
              <Alerts />
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </DeviceState>
    </AuthState>
  );
};

export default App;
