import React, { useContext, useEffect } from 'react';
import Web3 from 'web3';
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
} from '../features/connection/connectionSlice';
import { fetchInstitutions } from '../features/institutions/institutionsSlice';
import { fetchCertificates } from '../features/certificates/certificatesSlice';
import { abi as CryptoCertsAbi } from '../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS, CRYPTOCERTS_NETWORK_ID } from '../config';

export const ConnectionContext = React.createContext({
    web3AlertDialogOpen: false,
    networkAlertDialogOpen: false,
    connectDialogOpen: false,
    handleWeb3AlertDialogClose: () => { },
    handleNetworkAlertDialogClose: () => { },
    handleConnect: () => { },
    handleDisconnect: () => { },
});

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

export default function ConnectionProvider(props) {
    const dispatch = useDispatch();
    const activeAccount = useSelector((state) => state.connection.activeAccount);
    const connectedState = useSelector((state) => state.connection.connected);
    const network = useSelector((state) => parseInt(state.connection.network));

    const [readyForWeb3, setReadyForWeb3] = React.useState(false);
    const [connectDialogOpen, setConnectDialogOpen] = React.useState(false);
    const [web3AlertDialogOpen, setWeb3AlertDialogOpen] = React.useState(false);
    const [networkAlertDialogOpen, setNetworkAlertDialogOpen] = React.useState(false);

    const { showMessage } = useContext(NotificationsContext);

    const correctlyConnected = isOnCorrectNetwork(network);

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
            // sync network state
            syncNetwork();
        }
        setReadyForWeb3(ready);
        dispatch(setWeb3Capable(ready));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, contract]); // Avoid intentionally showMessage and syncNetworkin in dependencies

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

        setConnectDialogOpen(true);
        web3.eth.requestAccounts()
            .then((accounts) => {
                updateConnectionState(accounts);
                setConnectDialogOpen(false);
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
        connectDialogOpen: connectDialogOpen,
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