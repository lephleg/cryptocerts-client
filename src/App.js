import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';

const ValidatePage = lazy(() => import('./components/ValidatePage'));
const InstitutionsPage = lazy(() => import('./components/InstitutionsPage'));
const InstitutionForm = lazy(() => import('./components/InstitutionForm'));

export default function App() {

  return (
    <Router>
      <MainLayout>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/institutions">
              <InstitutionsPage />
            </Route>
            <ProtectedRoute path="/create-institution">
              <InstitutionForm />
            </ProtectedRoute>
            <Route path="/validate">
              <ValidatePage />
            </Route>
          </Suspense>
        </Switch>
      </MainLayout>
    </Router>
  );
}