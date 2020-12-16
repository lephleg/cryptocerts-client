import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Button, makeStyles } from '@material-ui/core';
import { DocumentDropzone } from './DocumentDropzone';
import { useIpfs } from '../hooks/useIpfs';

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

    const [fileSelected, setFileSelected] = useState(null);

    const handleSelectedFile = (file) => {
        setFileSelected(file);
    }

    const onValidateClicked = () => {
        if (canValidate) {
            getCid(fileSelected)
                .then((cid) => {
                    console.log(cid);
                    //
                });
        }
    };

    const canValidate = Boolean(fileSelected) && ipfsState;

    return (
        <Fragment>
            <section>
                <Container maxWidth="md" className={classes.centered}>
                    <Typography variant="h5" component="h5">Validate a document</Typography>
                </Container>
            </section>
            <section>
                <Container maxWidth="sm" className={classes.centered}>
                    <Box p={2}>
                        <Typography variant="body1" component="p">Upload a document in order to validate it against the certificates stored in the blockchain records</Typography>
                    </Box>
                    <form className={classes.form} noValidate autoComplete="off">
                        <DocumentDropzone handleSelectedFile={handleSelectedFile} />
                    </form>
                    <Box className={classes.buttons}>
                        <Button variant="contained" color="primary" size="large" onClick={onValidateClicked} disabled={!canValidate}>Validate</Button>
                    </Box>
                </Container>
            </section>
        </Fragment>
    );
}