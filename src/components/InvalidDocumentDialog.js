import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors'
import { DialogActions, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: theme.spacing(1),
    },
    icon: {
        color: red[800],
        fontSize: 30,
        margin: theme.spacing(1)
    }
}));

export default function InvalidDocumentDialog({ open, handleClose }) {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={handleClose}
        >
            <DialogTitle disableTypography id="alert-dialog-title" className={classes.title}>
                <ErrorIcon className={classes.icon} />
                <Typography variant="h5">Your document is invalid</Typography>
            </DialogTitle>
            <DialogContent>
                <Box textAlign={"center"} >
                    <DialogContentText id="alert-dialog-description">
                        The document provided cannot be validated against any of the blockchain records. Please ensure no alterations have been made to the document since its issuance.
                    </DialogContentText>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose} autoFocus>Ok</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
}