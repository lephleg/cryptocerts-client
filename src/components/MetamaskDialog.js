import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ConnectionContext } from '../context/ConnectionProvider';

export default function MetamaskDialog() {
    const { metamaskDialogOpen, metamaskDialogRequestType } = useContext(ConnectionContext);
    const title = "Confirm " + metamaskDialogRequestType + " in MetaMask";

    return (
        <Dialog
            open={metamaskDialogOpen}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            transitionDuration={800}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Box textAlign={"center"}>{title}</Box>
            </DialogTitle>
            <DialogContent>
                <Box textAlign={"center"} >
                    <DialogContentText id="alert-dialog-description">
                        Review and confirm the request that's just appeared. If you can't see a request, open your MetaMask extension via your browser.
                        </DialogContentText>
                    <Box my={3}><CircularProgress thickness={5} /></Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}