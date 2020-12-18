import React, { Fragment, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Container, makeStyles } from '@material-ui/core';
import { fetchCertificates, selectAllCertificates } from '../features/certificates/certificatesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCarousel from './MaterialCarousel';
import CertificateCard from './CertificateCard';
import { useIpfs } from '../hooks/useIpfs';

const useStyles = makeStyles({
    title: {
        textAlign: "center"
    }
});

export default function CertificatesList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const certificatesStatus = useSelector((state) => state.certificates.status);
    const { ipfsState } = useIpfs();

    useEffect(() => {
        if (certificatesStatus === 'idle') {
            dispatch(fetchCertificates());
        }
    }, [certificatesStatus, dispatch])

    // TODO: filter based on user role
    let certificates = useSelector(selectAllCertificates);

    const renderedCertificates = certificates.map((certificate => {
        return <CertificateCard
            key={certificate.id}
            certificate={certificate}
            ipfsReady={ipfsState}
        />
    }))

    return (
        <Fragment>
            <section>
                <Container maxWidth="md" className={classes.title}>
                    <Box className={classes.centered}>
                        <Typography variant="h5" component="h5">Certificates</Typography>
                    </Box>
                </Container>
            </section>
            <section>
                <Container maxWidth="md" className={classes.centered}>
                    <MaterialCarousel itemsToShow={certificates.length < 3 ? certificates.length : 3}>
                        {renderedCertificates}
                    </MaterialCarousel>
                </Container>
            </section>
        </Fragment>
    );
}