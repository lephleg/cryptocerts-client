import React, { useContext, useEffect } from 'react';
import Web3 from 'web3';
import Web3Utils from '../utils/web3-utils';
import { NotificationsContext } from './NotificationsProvider';
import { useDispatch } from 'react-redux';
import { setConnected as setConnectedAction, setActiveAccount, setWeb3Capable } from '../features/connection/connectionSlice';

export const ConnectionContext = React.createContext({
    connected: false,
    connectDialogOpen: false,
    handleConnect: () => { },
});

export default function ConnectionProvider(props) {

    const dispatch = useDispatch();

    const [readyForWeb3, setReadyForWeb3] = React.useState(false);
    const [connectDialogOpen, setConnectDialogOpen] = React.useState(false);
    const [connected, setConnected] = React.useState(false);

    const { showMessage } = useContext(NotificationsContext);

    useEffect(() => {
        let ready = Web3Utils.browserIsWeb3Capable() && Web3Utils.hasWeb3Available();
        if (ready) {
            // needed in order to hide the relevant MetaMask console warning
            window.ethereum.autoRefreshOnNetworkChange = false;
        }
        setReadyForWeb3(ready);
        dispatch(setWeb3Capable(ready));
    }, [dispatch]);

    const connect = () => {
        if (!readyForWeb3) {
            alert('No Web3 provider detected. Please consider installing MetaMask in order to use CryptoCerts.');
            setConnectDialogOpen(false);
            dispatch(setWeb3Capable(false));
            return;
        }

        setConnectDialogOpen(true);
        let web3 = new Web3(window.ethereum);

        web3.eth.requestAccounts()
            .then((accounts) => {
                setConnectDialogOpen(false);
                setConnected(true);
                showMessage("You are connected!");
                dispatch(setConnectedAction(true));
                dispatch(setActiveAccount(accounts[0]));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setConnectedAction(false));
                dispatch(setActiveAccount(''));
            });;
    }

    const connectionContext = {
        connected: connected,
        connectDialogOpen: connectDialogOpen,
        handleConnect: connect,
    };

    return (
        <ConnectionContext.Provider value={connectionContext}>
            {props.children}
        </ConnectionContext.Provider>
    );
};