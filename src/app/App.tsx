import React from 'react';
import Dashboard from 'scenes/dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from 'scenes/pageNotFound/PageNotFound';
import CoreLayout from 'layouts/CoreLayout';
import ErrorPage from 'components/errorPage/ErrorPage';
import Admin from 'scenes/admin/Admin';
import Login from 'scenes/login/Login';
import Drive from 'scenes/drive/Drive';

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <CoreLayout>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/drive/:requestId">
              <Drive />
            </Route>
            <Route exact path="/error">
              <ErrorPage />
            </Route>
          </Switch>
        </CoreLayout>
      </Route>

      <Route path="*">
        {/* TOUPDATE: This is a placeholder component that actually redirects to "/" (dashboard/home)
          Your use-case might demand a specific page for 404s so you can add the markup you want in there
        */}
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default App;
