import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
} from 'react-router-dom';
import { isAuthenticated } from '../auth';

import Header from './Header';
import Home from '../routes/home';
import Login from '../routes/login';

const App = () => {
  const location = useLocation();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await isAuthenticated();
        setLogged(true);
        setLoading(false);
      } catch (err) {
        setLogged(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  if (!logged && location.pathname.indexOf('login') === -1) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Redirect from="/" to="/home" />;
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
