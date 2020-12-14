import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ConnectionContext } from '../context/ConnectionProvider';
import { useSelector } from 'react-redux';
import Web3Utils from '../utils/web3-utils';
import { CRYPTOCERTS_NETWORK_ID } from '../config';

export default function NetworkAlertDialog() {
    const { networkAlertDialogOpen, handleNetworkAlertDialogClose } = useContext(ConnectionContext);
    const network = useSelector(state => state.connection.network);
    const networkName = Web3Utils.getEthNetworkNameById(network);

    let text;
    let title = "Wrong network";
    let button = "I'll do my best";

    if (Web3Utils.isMobileDevice()) {
        text = <DialogContentText id="alert-dialog-description">
            You are connected to the <b>{networkName}</b> Ethereum network. Please set your network to the <b>CryptoCerts</b> network (chain id: <code>{CRYPTOCERTS_NETWORK_ID}</code>) in your wallet settings.
            </DialogContentText>
    } else {
        text = <DialogContentText id="alert-dialog-description">
            You are connected to the <b>{networkName}</b> Ethereum network. Please use <b>MetaMask</b> to switch to the <b>CryptoCerts</b> network (chain id: <code>{CRYPTOCERTS_NETWORK_ID}</code>).
            </DialogContentText>
    }

    // eslint-disable-next-line eqeqeq
    if (network == CRYPTOCERTS_NETWORK_ID) {
        title = "Correct network";
        text = <DialogContentText id="alert-dialog-description">
            You are connected to the <b>{networkName}</b> Ethereum network. Please close this dialog and press <b>Connect</b> to proceed!
            </DialogContentText>
        button = "Ok";
    }

    return (
        <div>
            <Dialog
                open={networkAlertDialogOpen}
                onClose={handleNetworkAlertDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>{text}</DialogContent>
                <DialogActions>
                    <Button onClick={handleNetworkAlertDialogClose} color="primary" autoFocus>{button}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
