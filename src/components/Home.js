import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import ethereum_logo from '../static/images/eth-diamond-black.png';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
    ethLogo: {
        height: 81,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
    },
    validateButtonWrapper: {
        padding: theme.spacing(1)
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export default function Home(props) {
    const classes = useStyles(props);
    const { push } = useHistory();
    const web3Capable = useSelector((state) => state.connection.web3Capable);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        if (!web3Capable) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <section>
                <Container maxWidth="md">
                    <CardMedia className={classes.ethLogo} image={ethereum_logo} title="Ethereum diamond" />
                    <Box pt={4} pb={8} textAlign="center">
                        <Typography variant="overline" component="span">Welcome to CryptoCerts</Typography>
                        <Typography variant="h3" component="h2">A decentralized academic certificate registry for Web3</Typography>
                        <Box mt={4}>
                            <span
                                className={classes.validateButtonWrapper}
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            >
                                <Button
                                    color="primary"
                                    endIcon={<ArrowRightAltIcon />}
                                    onClick={() => push('/validate')}
                                    disabled={!web3Capable}
                                >
                                    Validate a document
                            </Button>
                            </span>
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
                                <Typography variant="body1" component="p">
                                    Institutions are able to issue and assign academic certificates to their students in an decentralized 
                                    and immutable way utilizing smart contracts running on the distributed ledger of the Ethereum blockchain.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box mb={2} display="flex" alignItems="center">
                                    <SchoolIcon color="primary" className={classes.icon} />
                                    <Typography variant="h6" component="h3">Students</Typography>
                                </Box>
                                <Typography variant="body1" component="p">
                                    Students can browse the certificates assigned to them and prove ownership by their private key.
                                    Using CryptoCerts, they can also fetch a copy of the actual document, stored distributedly in the InterPlanetary File System (IPFS).
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box mb={2} display="flex" alignItems="center">
                                    <PersonIcon color="primary" className={classes.icon} />
                                    <Typography variant="h6" component="h3">Guests</Typography>
                                </Box>
                                <Typography variant="body1" component="p">
                                    Third-party guests are able to validate any genuine digital document in their possesion against the blockchain
                                    records in order to verify its integrity and authenticity.
                                 </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </section>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>Requires a Web3 provider installed</Typography>
            </Popover>
        </React.Fragment>
    );
}