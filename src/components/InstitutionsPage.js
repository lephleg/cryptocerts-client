import React, { Fragment, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { fetchInstitutions, selectAllInstitutions } from '../features/institutions/institutionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    title: {
        textAlign: "center"
    }
});

export default function InstitutionsPage() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const institutionsStatus = useSelector((state) => state.institutions.status);

    useEffect(() => {
        if (institutionsStatus === 'idle') {
            dispatch(fetchInstitutions())
        }
    }, [institutionsStatus, dispatch])

    let institutions = useSelector(selectAllInstitutions);

    const renderedInstitutions = institutions.map((institution => {
        return <Typography variant="body1" component="p" key={institution.id}>{institution.name}</Typography>
    }))

    return (
        <Fragment>
            <section>
                <Container maxWidth="md" className={classes.title}>
                    <Typography variant="h3" component="h2">Institutions</Typography>
                </Container>
            </section>
            <section>
                <Container maxWidth="md">
                    {renderedInstitutions}
                </Container>
            </section>
        </Fragment>
    );
}