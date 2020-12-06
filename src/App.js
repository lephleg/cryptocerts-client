import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { NotificationContext } from './common/NotificationContextProvider';
import Web3 from 'web3';
import Web3Utils from './utils/web3-utils';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import MainLayout from './components/MainLayout';
import Home from './components/Home';

const ValidatePage = lazy(() => import('./components/ValidatePage'));
const InstitutionsPage = lazy(() => import('./components/InstitutionsPage'));

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function BackDrop() {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true} >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default function App() {
  let web3;

  const [readyForWeb3, setReadyForWeb3] = React.useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = React.useState(false);

  const { showMessage } = useContext(NotificationContext);

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
        showMessage('Connected!');
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  return (
    <Router>
      <MainLayout
        handleConnect={handleConnect}
        connectDialogOpen={connectDialogOpen}
      >
        <Switch>
          <Suspense fallback={<BackDrop />}>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route path="/institutions">
              <InstitutionsPage />
            </Route>
            <Route path="/validate">
              <ValidatePage />
            </Route>
          </Suspense>
        </Switch>
      </MainLayout>
    </Router>
  );
}