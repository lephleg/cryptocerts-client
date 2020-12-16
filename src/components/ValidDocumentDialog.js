import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { green } from '@material-ui/core/colors'
import { DialogActions, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: theme.spacing(1),
    },
    description: {
        color: "#888"
    },
    icon: {
        color: green[800],
        fontSize: 30,
        margin: theme.spacing(1)
    },
    detailsWrapper: {
        backgroundColor: "#f1f1f1",
        textAlign: "left",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#dddddd',
        overflow: "scroll",
        maxWidth: "100%",
        maxHeight: "100%",
    }
}));

export default function ValidDocumentDialog({ open, details, handleClose }) {
    const classes = useStyles();

    const [detailsObj, setDetailsObj] = useState(null);

    useEffect(() => {
        if (details.length > 0) {
            let detailsObj = Object.fromEntries(details);
            setDetailsObj(detailsObj);
        }
    }, [details]);

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={handleClose}
        >
            <DialogTitle disableTypography id="alert-dialog-title" className={classes.title}>
                <VerifiedUserIcon className={classes.icon} />
                <Typography variant="h5">Your document is valid</Typography>
            </DialogTitle>
            <DialogContent>
                <Box textAlign={"center"} >
                    <DialogContentText id="alert-dialog-description" className={classes.description}>
                        The document provided has been validated successfully against the blockchain records! Below are the transaction details:
                    </DialogContentText>
                    {detailsObj && <Paper my={2} className={classes.detailsWrapper}>
                        <pre className={classes.details}>{JSON.stringify(detailsObj, null, 2)}</pre>
                    </Paper>}
                    <DialogActions>
                        <Button color="primary" onClick={handleClose} autoFocus>Ok</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
}