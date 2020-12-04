import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import ethereum_logo from '../static/images/eth-diamond-black.png';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
    ethLogo: {
        height: 81,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
    }
}));

export default function Home(props) {
    const classes = useStyles(props);

    return (
        <React.Fragment>
            <section>
                <Container maxWidth="md">
                    <CardMedia className={classes.ethLogo} image={ethereum_logo} title="Ethereum diamond" />
                    <Box pt={4} pb={8} textAlign="center">
                        <Typography variant="overline" component="span">Welcome to CryptoCerts</Typography>
                        <Typography variant="h3" component="h2">A decentralized academic certificate registry for the Web 3</Typography>
                        <Box mt={4}>
                            <Button color="primary" endIcon={<ArrowRightAltIcon />}>Validate a document</Button>
                        </Box>
                    </Box>
                </Container>
            </section>
            <section>
                <Container maxWidth="lg">
                    <Box py={6}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <Box mb={2} display="flex" alignItems="center">
                                    <AccountBalanceIcon color="primary" className={classes.icon} />
                                    <Typography variant="h6" component="h3">Institutions</Typography>
                                </Box>
                                <Typography variant="body1" component="p">Intistutions are able to store their academic certificates in a decentralized immutable way using the distributed ledger of the Ethereum blockchain.</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box mb={2} display="flex" alignItems="center">
                                    <SchoolIcon color="primary" className={classes.icon} />
                                    <Typography variant="h6" component="h3">Students</Typography>
                                </Box>
                                <Typography variant="body1" component="p">Students can browse the certificates assigned to them by the institutions using their private key. In addition, they can fetch a copy of any of them, currently stored encrypted in the InterPlanetary File System (IPFS).</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box mb={2} display="flex" alignItems="center">
                                    <PersonIcon color="primary" className={classes.icon} />
                                    <Typography variant="h6" component="h3">Guests</Typography>
                                </Box>
                                <Typography variant="body1" component="p">Third-party guests are able to validate any digital document in their possesion against the blockchain certificate records in order to verify its authenticity.</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </section>
        </React.Fragment>
    );
}