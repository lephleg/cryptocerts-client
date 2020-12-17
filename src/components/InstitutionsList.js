import React, { Fragment, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Container, makeStyles, Slide } from '@material-ui/core';
import { fetchInstitutions, selectAllInstitutions } from '../features/institutions/institutionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCarousel from './MaterialCarousel';
import InstitutionCard from './InstitutionCard';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(6)
    },
    centered: {
        textAlign: "center"
    }
}));

export default function InstitutionsList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const institutionsStatus = useSelector((state) => state.institutions.status);
    const role = useSelector((state) => state.connection.role);

    useEffect(() => {
        if (institutionsStatus === 'idle') {
            dispatch(fetchInstitutions())
        }
    }, [institutionsStatus, dispatch])

    let institutions = useSelector(selectAllInstitutions);
    const isAdmin = role === "admin";

    institutions = institutions.slice(0,3);

    const renderedInstitutions = institutions.map((institution => {
        return <InstitutionCard
            key={institution.id}
            name={institution.name}
            location={institution.location}
            canEdit={isAdmin}
            canDelete={isAdmin}
        />
    }))

    return (
        <Fragment>
            <section>
                <Container maxWidth="md" className={classes.title}>
                    <Box className={classes.centered}>
                        <Typography variant="h5" component="h5">Institutions</Typography>
                    </Box>
                </Container>
            </section>
            <section>
                <Container maxWidth="md" className={classes.centered}>
                    <MaterialCarousel itemsToShow={institutions.length < 3 ? institutions.length : 3}>
                        {renderedInstitutions}
                    </MaterialCarousel>
                </Container>
            </section>
        </Fragment>
    );
}