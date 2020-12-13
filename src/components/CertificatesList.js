import React, { Fragment, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, makeStyles } from '@material-ui/core';
import { fetchCertificates, selectAllCertificates } from '../features/certificates/certificatesSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    title: {
        textAlign: "center"
    }
});

export default function CertificatesList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const certificatesStatus = useSelector((state) => state.certificates.status);

    useEffect(() => {
        if (certificatesStatus === 'idle') {
            dispatch(fetchCertificates());
        }
    }, [certificatesStatus, dispatch])

    let certificates = useSelector(selectAllCertificates);

    const renderedCertificates = certificates.map((certificate => {
        return <Typography variant="body1" component="p" key={certificate.id}>{certificate.id} - {certificate.title}</Typography>
    }))

    return (
        <Fragment>
            <section>
                <Box className={classes.title}>
                    <Typography variant="h5" component="h5">Certificates</Typography>
                </Box>
            </section>
            <section>
                <Box>
                    {renderedCertificates}
                </Box>
            </section>
        </Fragment>
    );
}