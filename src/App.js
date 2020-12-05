import React, { useEffect } from 'react';
import Web3 from 'web3';
import Web3Utils from './utils/web3-utils';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import ValidatePage from './components/ValidatePage';
import InstitutionsPage from './components/InstitutionsPage';

const appName = 'CryptoCerts';

export default function App() {
  let web3;

  const [readyForWeb3, setReadyForWeb3] = React.useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  useEffect(() => {
    let ready = Web3Utils.browserIsWeb3Capable() && Web3Utils.hasWeb3Available();
    if (ready) {
      // needed in order to hide the relevant MetaMask console warning
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    setReadyForWeb3(ready);
  }, []);

  const handleConnect = () => {
    if (!readyForWeb3) {
      alert('No Web3 provider detected. Please consider installing MetaMask in order to use CryptoCerts.');
      setConnectDialogOpen(false);
      return;
    }

    setConnectDialogOpen(true);
    web3 = new Web3(window.ethereum);
    web3.eth.requestAccounts()
      .then(() => {
        setConnectDialogOpen(false);
        setAlertMessage('Connected!');
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Router>
      <MainLayout
        title={appName}
        handleConnect={handleConnect}
        connectDialogOpen={connectDialogOpen}
        alertOpen={alertOpen}
        alertMessage={alertMessage}
        handleAlertClose={handleAlertClose}
      >
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