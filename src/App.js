import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import ValidatePage from './components/ValidatePage';
import InstitutionsPage from './components/InstitutionsPage';

const appName = 'CryptoCerts';

export default function App() {
  return (
    <Router>
      <MainLayout title={appName}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/institutions">
            <InstitutionsPage />
          </Route>
          <Route path="/validate">
            <ValidatePage />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
}