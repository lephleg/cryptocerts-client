import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConnectDialog(props) {
    return (
        <Dialog
            open={props.connectDialogOpen}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            transitionDuration={800}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Box textAlign={"center"}>{"Confirm connection in MetaMask"}</Box>
            </DialogTitle>
            <DialogContent>
                <Box textAlign={"center"} >
                    <DialogContentText id="alert-dialog-description">
                        Confirm the request that's just appeared. If you can't see a request, open your MetaMask extension via your browser.
                        </DialogContentText>
                    <Box my={3}><CircularProgress thickness={5} /></Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}