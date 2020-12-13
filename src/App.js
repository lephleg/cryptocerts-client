import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';

const ValidatePage = lazy(() => import('./components/ValidatePage'));
const InstitutionsList = lazy(() => import('./components/InstitutionsList'));
const InstitutionForm = lazy(() => import('./components/InstitutionForm'));
const CertificatesList = lazy(() => import('./components/CertificatesList'));
const CertificateForm = lazy(() => import('./components/CertificateForm'));


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
              <InstitutionsList />
            </ProtectedRoute>
            <ProtectedRoute path="/create-institution" protection="role" roles={["admin"]}>
              <InstitutionForm />
            </ProtectedRoute>
            <ProtectedRoute path="/certificates" protection="role" roles={["institution", "student"]}>
              <CertificatesList />
            </ProtectedRoute>
            <ProtectedRoute path="/create-certificate" protection="role" roles={["institution"]}>
              <CertificateForm />
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