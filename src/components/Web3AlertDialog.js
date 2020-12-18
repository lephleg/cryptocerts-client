import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Web3Utils from '../utils/web3-utils';
import { ConnectionContext } from '../context/ConnectionProvider';

export default function Web3AlertDialog() {
    const { web3AlertDialogOpen, handleWeb3AlertDialogClose } = useContext(ConnectionContext);
    const isMobile = Web3Utils.isMobileDevice();
    const capableBrowser = Web3Utils.browserIsWeb3Capable();

    let title;
    let text;

    if (isMobile) {
        title = "Incompatible mobile browser";
        text = <DialogContentText id="alert-dialog-description">
            Your mobile browser does not support the <b>Web3 capabilities</b> required by <b>CryptoCerts</b> to operate.
            Please consider installing <b>a mobile wallet browser</b>.
            </DialogContentText>;
    } else if (!capableBrowser) {
        title = "Incompatible desktop browser";
        text = <DialogContentText id="alert-dialog-description">
            Your current browser does not support <b>Web3 capabilities</b>, which are required by <b>CryptoCerts</b> to operate.
            Please consider installing a compatible web browser like <b>Chrome</b>, <b>Firefox</b>, <b>Opera</b> or <b>Brave</b>.
            </DialogContentText>;
    } else {
        title = "No Web3 provider detected";
        text = <DialogContentText id="alert-dialog-description">
            Your current browser is able to support Web3 capabilities, but <b>it requires an extension</b>.
            Please consider installing <b><a href={"https://metamask.io/"} target="_blank" rel="noreferrer">MetaMask</a></b> in order to use this decentralized application.
           </DialogContentText>;
    }

    return (
        <div>
            <Dialog
                open={web3AlertDialogOpen}
                onClose={handleWeb3AlertDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>{text}</DialogContent>
                <DialogActions>
                    <Button onClick={handleWeb3AlertDialogClose} color="primary" autoFocus>I'll do my best</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
