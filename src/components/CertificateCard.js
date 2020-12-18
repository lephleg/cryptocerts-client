import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { blue } from '@material-ui/core/colors';
import { useIpfs } from '../hooks/useIpfs';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { getMultihashFromBytes32 } from '../utils/multihash';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 230,
    },
    icon: {
        fontSize: 40,
    },
    centered: {
        textAlign: "center"
    },
    actionArea: {
        height: 215,
    },
    address: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    addressIcon: {
        fontSize: 16,
        margin: theme.spacing(1),
        color: blue[800]
    },
    iconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2),
    },
    actions: {
        flexDirection: "column",
        display: "flex",
    },
    downloadButton: {
        //
    },
    manageActionButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    manageActionButtonsWrapper: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(0)
    }
}));

function InstitutionAddress({ address }) {
    const classes = useStyles();
    return (
        <Box className={classes.address}>
            <AccountBalanceIcon className={classes.addressIcon} />
            <Typography noWrap variant="body2" color="textSecondary" component="p">
                {address}
            </Typography>
        </Box>
    )
}

function StudentAddress({ address }) {
    const classes = useStyles();
    return (
        <Box className={classes.address}>
            <SchoolIcon className={classes.addressIcon} />
            <Typography noWrap variant="body2" color="textSecondary" component="p">
                {address}
            </Typography>
        </Box>
    )
}

export default function CertificateCard({ certificate, ipfsReady }) {
    const classes = useStyles();
    const { downloadPdfFromIpfs } = useIpfs();
    const role = useSelector((state) => state.connection.role);

    const userIsStudent = role === 'student';
    const userIsInstitution = role === 'institution';

    // TODO: Implement certificate delete and edit functionality
    const canEdit = false;
    const canDelete = false;

    const handleDownloadClick = () => {
        let cid = getMultihashFromBytes32({
            digest: certificate.digest,
            hashFunction: certificate.hashFunction,
            size: certificate.size
        });
        let filename = certificate.id + "_" + certificate.title.replace(/ /g,"_") + ".pdf";
        downloadPdfFromIpfs(cid, filename);
    }

    return (
        <Card className={classes.root} elevation={2}>
            <CardActionArea className={classes.actionArea}>
                <Box className={classes.iconWrapper}>
                    <DescriptionIcon className={classes.icon} />
                </Box>
                <CardContent>
                    <Typography gutterBottom className={classes.centered} variant="subtitle1" component="h2">
                        {certificate.title}
                    </Typography>
                    {userIsStudent && <InstitutionAddress address={certificate.institution} />}
                    {userIsInstitution && <StudentAddress address={certificate.student} />}
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Box>
                    <Button
                        className={classes.downloadButton}
                        size="medium"
                        color="secondary"
                        variant="contained"
                        disabled={!ipfsReady}
                        startIcon={<PictureAsPdfIcon />}
                        onClick={handleDownloadClick}
                    >
                        Download
                    </Button>
                </Box>
                <Box className={classes.manageActionButtonsWrapper}>
                    <Button
                        className={classes.manageActionButton}
                        size="small"
                        color="primary"
                        disabled={!canEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        className={classes.manageActionButton}
                        size="small"
                        color="secondary"
                        disabled={!canDelete}
                    >
                        Delete
                </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
