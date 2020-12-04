import React from 'react';
import MainLayout from './components/MainLayout';
import Home from './components/Home';

const appName = 'CryptoCerts';

export default function App() {
  return (
    <MainLayout title={appName}>
      <Home />
    </MainLayout>
  );
}