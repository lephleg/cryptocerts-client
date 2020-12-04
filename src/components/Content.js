import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: props => -props.drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // needed in order to be merged with content rule
        marginLeft: props => 0,
    }
}));

export default function Content(props) {
    const classes = useStyles(props);

    return (
        <main className={clsx(classes.content, {
            [classes.contentShift]: props.drawerOpen,
        })}>
            <div className={classes.drawerHeader} />
            <Container maxWidth="md">
                <Box py={8} textAlign="center">
                    <Typography variant="overline" component="span">Welcome to CryptoCerts</Typography>
                    <Typography variant="h3" component="h2">A decentralized academic certificate registry for the Web 3</Typography>
                    <Box mt={4}>
                        <Button color="primary" endIcon={<ArrowRightAltIcon />}>Validate a document</Button>
                    </Box>
                </Box>
            </Container>
        </main>
    );
}