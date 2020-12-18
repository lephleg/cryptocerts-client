import React, { Fragment, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Box, Button, makeStyles } from '@material-ui/core';
import { DocumentDropzone } from './DocumentDropzone';
import { useIpfs } from '../hooks/useIpfs';
import { abi as CryptoCertsAbi } from '../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../config';
import Web3 from 'web3';
import { getBytes32FromMultihash } from '../utils/multihash';
import ValidDocumentFile from './ValidDocumentDialog';
import InvalidDocumentDialog from './InvalidDocumentDialog';
import Header from './Header';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS);

const useStyles = makeStyles((theme) => ({
    centered: {
        textAlign: "center"
    },
    form: {
        textAlign: "center",
        '& > *': {
            margin: theme.spacing(2),
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

export default function ValidatePage(props) {
    const classes = useStyles(props);
    const { ipfsState, getCid } = useIpfs();
    const dropzoneRef = useRef();

    const [fileSelected, setFileSelected] = useState(null);
    const [openValidDialog, setValidOpenDialog] = useState(false);
    const [openInvalidDialog, setInvalidOpenDialog] = useState(false);
    const [details, setDetails] = useState([]);

    const handleSelectedFile = (file) => {
        setFileSelected(file);
    }

    const handleValidDialogClose = () => {
        setValidOpenDialog(false);
    }

    const handleInvalidDialogClose = () => {
        setInvalidOpenDialog(false);
    }

    const clearForm = () => {
        dropzoneRef.current.removeFile();
    }

    const onValidateClicked = () => {
        if (canValidate) {
            getCid(fileSelected)
                .then((cid) => {
                    let { digest } = getBytes32FromMultihash(cid);
                    contract.getPastEvents("CertificateCreated", {
                        filter: { digest: [digest] },
                        fromBlock: 0
                    }, (error, events) => {
                        if (!error) {
                            if (events.length > 0) {
                                let array = Object.entries(events[0]);
                                setDetails(array);
                                setValidOpenDialog(true);
                            } else {
                                setDetails([]);
                                setInvalidOpenDialog(true);
                            }
                        } else {
                            console.error(error);
                        }
                        clearForm();
                    });
                });
        }
    };

    const canValidate = Boolean(fileSelected) && ipfsState;

    return (
        <Fragment>
            <Header title="Validate a document" subtitle="Upload a document in order to validate it against the certificates stored in the blockchain records" />
            <section>
                <Container maxWidth="sm" className={classes.centered}>
                    <form className={classes.form} noValidate autoComplete="off">
                        <DocumentDropzone handleSelectedFile={handleSelectedFile} ref={dropzoneRef} />
                    </form>
                    <Box className={classes.buttons}>
                        <Button variant="contained" color="primary" size="large" onClick={onValidateClicked} disabled={!canValidate}>Validate</Button>
                    </Box>
                </Container>
            </section>
            <ValidDocumentFile
                open={openValidDialog}
                details={details}
                handleClose={handleValidDialogClose} />
            <InvalidDocumentDialog
                open={openInvalidDialog}
                handleClose={handleInvalidDialogClose} />
        </Fragment>
    );
}