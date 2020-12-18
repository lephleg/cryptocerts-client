import React, { Fragment, useEffect } from 'react';
import { Box, Container, makeStyles, Typography, Paper } from '@material-ui/core';
import { fetchInstitutions, selectAllInstitutions } from '../redux/institutionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCarousel from './MaterialCarousel';
import InstitutionCard from './InstitutionCard';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    centered: {
        textAlign: "center"
    },
    noItemsWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(8)
    },
    paper: {
        padding: theme.spacing(1),
    }
}));

export default function InstitutionsList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const institutionsStatus = useSelector((state) => state.institutions.status);
    // const role = useSelector((state) => state.connection.role);

    useEffect(() => {
        if (institutionsStatus === 'idle') {
            dispatch(fetchInstitutions())
        }
    }, [institutionsStatus, dispatch])

    const institutions = useSelector(selectAllInstitutions);
    const emptyList = institutions.length === 0;

    // TODO: Implement institution delete and edit functionality
    // const isAdmin = role === "admin";
    const canEdit = false;
    const canDelete = false;

    const renderedInstitutions = institutions.map((institution => {
        return <InstitutionCard
            key={institution.id}
            institution={institution}
            canEdit={canEdit}
            canDelete={canDelete}
        />
    }))

    return (
        <Fragment>
            <Header title="Institutions" subtitle="A list of all institutions participating in the registry" />
            <section>
                <Container maxWidth="md" className={classes.centered}>
                    {!emptyList &&
                        <MaterialCarousel itemsToShow={institutions.length < 3 ? institutions.length : 3}>
                            {renderedInstitutions}
                        </MaterialCarousel>}
                    {emptyList &&
                        <Box className={classes.noItemsWrapper}>
                            <Paper className={classes.paper} elevation={1} variant="outlined">
                                <Typography variant={"caption"} color={"textSecondary"}>There are no institutions to show at the moment</Typography>
                            </Paper>
                        </Box>}
                </Container>
            </section>
        </Fragment>
    );
}