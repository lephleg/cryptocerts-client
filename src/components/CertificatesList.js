import React, { Fragment, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { fetchCertificates, selectAllUserCertificates } from '../features/certificates/certificatesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCarousel from './MaterialCarousel';
import CertificateCard from './CertificateCard';
import { useIpfs } from '../hooks/useIpfs';
import Header from './Header';

const useStyles = makeStyles({
    title: {
        textAlign: "center"
    }
});

export default function CertificatesList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const certificatesStatus = useSelector((state) => state.certificates.status);
    const role = useSelector((state) => state.connection.role);
    const { ipfsState } = useIpfs();

    useEffect(() => {
        if (certificatesStatus === 'idle') {
            dispatch(fetchCertificates());
        }
    }, [certificatesStatus, dispatch])

    let certificates = useSelector(selectAllUserCertificates);

    let subtitle;
    if (role === 'institution') {
        subtitle = "A list of all certificates issued by your institution";
    } else if (role === 'student') {
        subtitle = "A list of all certificates assigned to you by any institution";
    }

    const renderedCertificates = certificates.map((certificate => {
        return <CertificateCard
            key={certificate.id}
            certificate={certificate}
            ipfsReady={ipfsState}
        />
    }))

    return (
        <Fragment>
            <Header title="Certificates" subtitle={subtitle} />
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