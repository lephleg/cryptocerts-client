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
            <ProtectedRoute path="/institutions" protection="web3">
              <InstitutionsPage />
            </ProtectedRoute>
            <ProtectedRoute path="/create-institution" protection="admin">
              <InstitutionForm />
            </ProtectedRoute>
            <ProtectedRoute path="/validate" protection="web3">
              <ValidatePage />
            </ProtectedRoute>
          </Suspense>
        </Switch>
      </MainLayout>
    </Router>
  );
}