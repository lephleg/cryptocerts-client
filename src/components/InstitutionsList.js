import React, { Fragment, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, makeStyles } from '@material-ui/core';
import { fetchInstitutions, selectAllInstitutions } from '../features/institutions/institutionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    title: {
        textAlign: "center"
    }
});

export default function InstitutionsList() {
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
        return <Typography variant="body1" component="p" key={institution.id}>{institution.id} - {institution.name}</Typography>
    }))

    return (
        <Fragment>
            <section>
                <Box className={classes.title}>
                    <Typography variant="h5" component="h5">Institutions</Typography>
                </Box>
            </section>
            <section>
                <Box>
                    {renderedInstitutions}
                </Box>
            </section>
        </Fragment>
    );
}