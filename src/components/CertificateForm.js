import React, { Fragment, useRef, useState, useContext } from 'react'
import Container from '@material-ui/core/Container';
import { Box, Button, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { saveNewCertificate } from '../redux/certificatesSlice';
import Web3 from 'web3';
import { useIpfs } from '../hooks/useIpfs';
import { DocumentDropzone } from './DocumentDropzone';
import Header from './Header';
import { ConnectionContext, TRANSACTION_TYPE } from '../context/ConnectionProvider';
import { useCryptoCerts } from '../hooks/useCryptoCerts';

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
    const { handleMetamaskDialogOpen, handleMetamaskDialogClose } = useContext(ConnectionContext);
    const dropzoneRef = useRef();
    const dispatch = useDispatch();
    const { ipfsState, addToIpfs } = useIpfs();
    const { cryptoCerts } = useCryptoCerts();

    const [title, setTitle] = useState('');
    const [studentAddress, setStudentAddress] = useState('');
    const [fileSelected, setFileSelected] = useState(null);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onStudentAddressChanged = (e) => setStudentAddress(e.target.value);

    const onSaveClicked = () => {
        if (canSave) {
            addToIpfs(fileSelected)
                .then((cid) => {
                    handleMetamaskDialogOpen(TRANSACTION_TYPE);
                    dispatch(saveNewCertificate(title, studentAddress, cid));
                    cryptoCerts.events.CertificateCreated({}, (error, event) => {
                        clearForm();
                        handleMetamaskDialogClose();
                        clearForm();
                    });
                });
        }
    };

    const handleSelectedFile = (file) => {
        setFileSelected(file);
    }

    const clearForm = () => {
        setTitle('');
        setStudentAddress('');
        setFileSelected(null);
        dropzoneRef.current.removeFile();
    };

    const canSave = Boolean(title) && Web3.utils.isAddress(studentAddress) && Boolean(fileSelected) && ipfsState;
    const canClear = Boolean(title) || Boolean(studentAddress) || Boolean(fileSelected);

    return (
        <Fragment>
            <section>
            <Header title="Create a certificate" subtitle="Fill the form and upload a genuine document to issue a new certificate" />
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
                        <DocumentDropzone handleSelectedFile={handleSelectedFile} ref={dropzoneRef} />
                    </form>
                    <Box className={classes.buttons}>
                        <Button variant="contained" color="primary" onClick={onSaveClicked} disabled={!canSave}>Save</Button>
                        <Button variant="contained" color="default" onClick={clearForm} disabled={!canClear}>Clear</Button>
                    </Box>
                </Container>
            </section>
        </Fragment>
    );
}
