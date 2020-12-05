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
            transitionDuration={400}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirm connection in MetaMask"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Confirm the request that's just appeared. If you can't see a request, open your MetaMask extension via your browser.
                    <Box textAlign={"center"} mt={2} >
                        <CircularProgress thickness={5} />
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}