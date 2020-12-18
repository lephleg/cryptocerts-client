import React, { Fragment, useEffect } from 'react';
import { Container, makeStyles, Box, Typography, Paper } from '@material-ui/core';
import { fetchCertificates, selectAllUserCertificates } from '../redux/certificatesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCarousel from './MaterialCarousel';
import CertificateCard from './CertificateCard';
import { useIpfs } from '../hooks/useIpfs';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    title: {
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

    const certificates = useSelector(selectAllUserCertificates);
    const emptyList = certificates.length === 0;

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
                    {!emptyList &&
                        <MaterialCarousel itemsToShow={certificates.length < 3 ? certificates.length : 3}>
                            {renderedCertificates}
                        </MaterialCarousel>}
                    {emptyList &&
                        <Box className={classes.noItemsWrapper}>
                            <Paper className={classes.paper} elevation={1} variant="outlined">
                                <Typography variant={"caption"} color={"textSecondary"}>There are no certificates to show at the moment</Typography>
                            </Paper>
                        </Box>}
                </Container>
            </section>
        </Fragment>
    );
}