import React, { useContext, useEffect } from 'react';
import Web3 from 'web3';
import Web3Utils from '../utils/web3-utils';
import { NotificationsContext } from './NotificationsProvider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useInterval } from '../hooks/useInterval';
import {
    setConnected as setConnectedAction,
    setActiveAccount,
    setWeb3Capable,
    setAdminAccount,
    determineRole
} from '../features/connection/connectionSlice';
import { fetchInstitutions } from '../features/institutions/institutionsSlice';
import { fetchCertificates } from '../features/certificates/certificatesSlice';
import { abi as CryptoCertsAbi } from '../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../config';

export const ConnectionContext = React.createContext({
    connectDialogOpen: false,
    handleConnect: () => { },
    handleDisconnect: () => { },
});

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

export default function ConnectionProvider(props) {
    const dispatch = useDispatch();
    const activeAccount = useSelector((state) => state.connection.activeAccount);
    const connectedState = useSelector((state) => state.connection.connected);

    const [readyForWeb3, setReadyForWeb3] = React.useState(false);
    const [connectDialogOpen, setConnectDialogOpen] = React.useState(false);

    const { showMessage } = useContext(NotificationsContext);

    useEffect(() => {
        let ready = Web3Utils.browserIsWeb3Capable() && Web3Utils.hasWeb3Available();
        if (ready) {
            // needed in order to hide the relevant MetaMask console warning
            window.ethereum.autoRefreshOnNetworkChange = false;
            // subscribe to blockchain events
            contract.events.InstitutionCreated({}, (error, event) => {
                showMessage("A new institution has been created!");
                dispatch(fetchInstitutions());
            });
            contract.events.CertificateCreated({}, (error, event) => {
                showMessage("A new certificate has been issued!");
                dispatch(fetchCertificates());
            });
            // store admin account
            contract.methods.owner().call().then(account => dispatch(setAdminAccount(account)));
        }
        setReadyForWeb3(ready);
        dispatch(setWeb3Capable(ready));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, contract]); // Avoid using showMessage in dependencies

    useInterval(() => {
        // sync active account every 3 seconds
        if (connectedState) {
            web3.eth.requestAccounts()
                .then(accounts => {
                    if (accounts[0] !== activeAccount) {
                        showMessage("Active account change detected!")
                        dispatch(setActiveAccount(accounts));
                        dispatch(determineRole());
                    }
                });
        }
    }, 3000);

    const connect = () => {
        if (!readyForWeb3) {
            alert('No Web3 provider detected. Please consider installing MetaMask in order to use CryptoCerts.');
            dispatch(setWeb3Capable(false));
            return;
        }

        setConnectDialogOpen(true);
        web3.eth.requestAccounts()
            .then((accounts) => {
                updateConnectionState(accounts);
                setConnectDialogOpen(false);
            });
    }

    const disconnect = () => {
        updateConnectionState();
    }

    const updateConnectionState = (accounts = []) => {
        let connected = accounts.length > 0;
        let message = connected ? "You are connected!" : "You have been disconnected!";

        dispatch(setConnectedAction(connected));
        dispatch(setActiveAccount(accounts));
        dispatch(determineRole());

        showMessage(message);
    }

    const connectionContext = {
        connectDialogOpen: connectDialogOpen,
        handleConnect: connect,
        handleDisconnect: disconnect
    };

    return (
        <ConnectionContext.Provider value={connectionContext}>
            {props.children}
        </ConnectionContext.Provider>
    );
};