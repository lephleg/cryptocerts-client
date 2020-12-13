import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Button, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { saveNewCertificate } from '../features/certificates/certificatesSlice';
import Web3 from 'web3';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    form: {
        textAlign: "center",
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        }
    },
    buttons: {
        textAlign: "center",
        '& > *': {
            margin: theme.spacing(2),
            width: '15ch',
        }
    }
}));

export default function CertificateForm() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [studentAddress, setStudentAddress] = useState('');

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onStudentAddressChanged = (e) => setStudentAddress(e.target.value);

    const onSaveClicked = () => {
        if (canSave) {
            dispatch(saveNewCertificate(title, studentAddress));
            setTitle('')
            setStudentAddress('')
        }
    };

    const onClearClicked = () => {
        setTitle('')
        setStudentAddress('')
    };

    const canSave = Boolean(title) && Web3.utils.isAddress(studentAddress);
    const canClear = Boolean(title) || Boolean(studentAddress);

    return (
        <Fragment>
            <section>
                <Container maxWidth="md" className={classes.title}>
                    <Typography variant="h5" component="h5">Create a certificate</Typography>
                </Container>
            </section>
            <section>
                <Container maxWidth="sm">
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={onTitleChanged}
                        />
                        <TextField
                            id="studentAddress"
                            label="Student Address"
                            variant="outlined"
                            value={studentAddress}
                            onChange={onStudentAddressChanged}
                        />
                    </form>
                    <Box className={classes.buttons}>
                        <Button variant="contained" color="primary" onClick={onSaveClicked} disabled={!canSave}>Save</Button>
                        <Button variant="contained" color="default" onClick={onClearClicked} disabled={!canClear}>Clear</Button>
                    </Box>
                </Container>
            </section>
        </Fragment>
    );
}
