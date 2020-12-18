import React, { useContext, useEffect } from 'react';
import Web3Utils from '../utils/web3-utils';
import { NotificationsContext } from './NotificationsProvider';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useInterval } from '../hooks/useInterval';
import {
    setConnected,
    setNetwork,
    setActiveAccount,
    setWeb3Capable,
    setAdminAccount,
    determineRole
} from '../redux/connectionSlice';
import { fetchInstitutions } from '../redux/institutionsSlice';
import { fetchCertificates } from '../redux/certificatesSlice';
import { CRYPTOCERTS_NETWORK_ID } from '../config';
import { useCryptoCerts } from '../hooks/useCryptoCerts';

export const CONNECTION_TYPE = 'connection';
export const TRANSACTION_TYPE = 'transaction';

export const ConnectionContext = React.createContext({
    web3AlertDialogOpen: false,
    networkAlertDialogOpen: false,
    metamaskDialogOpen: null,
    metamaskDialogRequestType: null,
    handleMetamaskDialogOpen: () => { },
    handleMetamaskDialogClose: () => { },
    handleWeb3AlertDialogClose: () => { },
    handleNetworkAlertDialogClose: () => { },
    handleConnect: () => { },
    handleDisconnect: () => { },
});

export default function ConnectionProvider(props) {
    const dispatch = useDispatch();
    const { web3, cryptoCerts } = useCryptoCerts();
    const activeAccount = useSelector((state) => state.connection.activeAccount);
    const connectedState = useSelector((state) => state.connection.connected);
    const network = useSelector((state) => parseInt(state.connection.network));

    const [readyForWeb3, setReadyForWeb3] = React.useState(false);
    const [metamaskDialogOpen, setMetamaskDialogOpen] = React.useState(false);
    const [metamaskDialogRequestType, setMetamaskDialogRequestType] = React.useState(null);
    const [web3AlertDialogOpen, setWeb3AlertDialogOpen] = React.useState(false);
    const [networkAlertDialogOpen, setNetworkAlertDialogOpen] = React.useState(false);

    const { showMessage } = useContext(NotificationsContext);

    const correctlyConnected = isOnCorrectNetwork(network);

    useEffect(() => {
        let ready = Web3Utils.browserIsWeb3Capable() && Web3Utils.hasWeb3Available();
        if (ready && Boolean(cryptoCerts)) {
            // needed in order to hide the relevant MetaMask console warning
            window.ethereum.autoRefreshOnNetworkChange = false;
            // subscribe to blockchain events
            cryptoCerts.events.InstitutionCreated({}, (error, event) => {
                showMessage("A new institution has been created!");
                dispatch(fetchInstitutions());
            });
            cryptoCerts.events.CertificateCreated({}, (error, event) => {
                showMessage("A new certificate has been issued!");
                dispatch(fetchCertificates());
            });
            // store admin account
            cryptoCerts.methods.owner().call().then(account => dispatch(setAdminAccount(account)));
            // sync network state
            syncNetwork();
        }
        setReadyForWeb3(ready);
        dispatch(setWeb3Capable(ready));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, cryptoCerts]); // Avoid intentionally showMessage and syncNetworkin in dependencies

    useInterval(() => {
        // sync every 3 sec
        if (readyForWeb3) {
            syncNetwork();
        }
        if (connectedState) {
            syncActiveAccount();
        }
    }, 3000);

    /**
     * Checks if the network id passed matches the CryptoCerts network id.
     * 
     * @param {int} networkId The network id in question.
     * @return {bool} True if the networks match, false otherwise.
     */
    function isOnCorrectNetwork(networkId) {
        return networkId === parseInt(CRYPTOCERTS_NETWORK_ID);
    }

    /**
     * Syncs the network state.
     * 
     * If on correct network updates the NetworkAlertDialog open state to false.
     * if not on correct network, disconnects the user if currently connected.
     */
    async function syncNetwork() {
        web3.eth.getChainId().then(id => {
            if (id !== network) dispatch(setNetwork(id));
            if (isOnCorrectNetwork(id)) {
                setNetworkAlertDialogOpen(false);
            } else {
                if (connectedState) disconnect();
            }
        });
    }

    /**
     * Syncs the active account state.
     * 
     * If a change is detected, it prints a message and determines the user role again.
     */
    async function syncActiveAccount() {
        web3.eth.requestAccounts()
            .then(accounts => {
                if (accounts[0] !== activeAccount) {
                    showMessage("Active account change detected!")
                    dispatch(setActiveAccount(accounts));
                    dispatch(determineRole());
                }
            });
    }

    /**
     * Performs the user connection.
     * 
     * If no Web3 is available it opens the relevant alert dialog.
     * If the current network is incorrect, it opens the relevant alert dialog.
     * While performing the call to the Web3 provider, it displays a relevant dialog.
     */
    const connect = () => {
        if (!readyForWeb3) {
            setWeb3AlertDialogOpen(true);
            return;
        }

        if (!correctlyConnected) {
            setNetworkAlertDialogOpen(true);
            return;
        }

        handleMetamaskDialogOpen(CONNECTION_TYPE);
        web3.eth.requestAccounts()
            .then((accounts) => {
                updateConnectionState(accounts);
                handleMetamaskDialogClose();
            });
    }

    /**
     * Disconnects the user.
     */
    const disconnect = () => {
        updateConnectionState();
    }

    /**
     * Updates the connected state . 
     * 
     * It examines the connected accounts, dispays a relevant message and determines user role.
     * 
     * @param {array} [accounts=[]] The connected accounts returned by the Web3 provider.
     */
    const updateConnectionState = (accounts = []) => {
        let connected = accounts.length > 0;
        let message = connected ? "You are connected!" : "You are currently disconnected!";

        dispatch(setConnected(connected));
        dispatch(setActiveAccount(accounts));
        dispatch(determineRole());

        showMessage(message);
    }

    /**
     * Sets the MetaMask dialog open state to true.
     */
    const handleMetamaskDialogOpen = (type) => {
        setMetamaskDialogRequestType(type);
        setMetamaskDialogOpen(true);
    }

    /**
     * Sets the MetaMask dialog open state to false.
     */
    const handleMetamaskDialogClose = () => {
        setMetamaskDialogOpen(false);
        setMetamaskDialogRequestType(null);
    }

    /**
     * Sets the Web3 alert dialog open state to false.
     */
    const handleWeb3AlertDialogClose = () => {
        setWeb3AlertDialogOpen(false);
    }

    /**
     * Sets the network alert dialog open state to false.
     */
    const handleNetworkAlertDialogClose = () => {
        setNetworkAlertDialogOpen(false);
    }

    const connectionContext = {
        web3AlertDialogOpen: web3AlertDialogOpen,
        networkAlertDialogOpen: networkAlertDialogOpen,
        metamaskDialogOpen: metamaskDialogOpen,
        metamaskDialogRequestType: metamaskDialogRequestType,
        handleMetamaskDialogOpen: handleMetamaskDialogOpen,
        handleMetamaskDialogClose: handleMetamaskDialogClose,
        handleWeb3AlertDialogClose: handleWeb3AlertDialogClose,
        handleNetworkAlertDialogClose: handleNetworkAlertDialogClose,
        handleConnect: connect,
        handleDisconnect: disconnect
    };

    return (
        <ConnectionContext.Provider value={connectionContext}>
            {props.children}
        </ConnectionContext.Provider>
    );
};