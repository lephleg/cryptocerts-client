import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Button, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { saveNewInstitution } from '../features/institutions/institutionsSlice';
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

export default function InstitutionForm() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const onNameChanged = (e) => setName(e.target.value);
    const onAddressChanged = (e) => setAddress(e.target.value);

    const onSaveClicked = () => {
        if (canSave) {
            dispatch(saveNewInstitution(name, address));
            setName('')
            setAddress('')
        }
    };

    const onClearClicked = () => {
        setName('')
        setAddress('')
    };

    const canSave = Boolean(name) && Web3.utils.isAddress(address);
    const canClear = Boolean(name) || Boolean(address);

    return (
        <Fragment>
            <section>
                <Container maxWidth="md" className={classes.title}>
                    <Typography variant="h5" component="h5">Create an institution</Typography>
                </Container>
            </section>
            <section>
                <Container maxWidth="sm">
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onNameChanged}
                        />
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={onAddressChanged}
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
