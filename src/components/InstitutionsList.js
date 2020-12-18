import React, { Fragment, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { fetchInstitutions, selectAllInstitutions } from '../features/institutions/institutionsSlice';
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

    let institutions = useSelector(selectAllInstitutions);

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
                    <MaterialCarousel itemsToShow={institutions.length < 3 ? institutions.length : 3}>
                        {renderedInstitutions}
                    </MaterialCarousel>
                </Container>
            </section>
        </Fragment>
    );
}