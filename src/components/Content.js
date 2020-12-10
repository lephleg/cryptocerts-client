import React, { useContext } from 'react';
import { DrawerContext } from '../context/DrawerProvider';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

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
        marginLeft: drawerContext => -drawerContext.width,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // needed in order to be merged with content rule
        marginLeft: drawerContext => 0,
    }
}));

export default function Content(props) {

    const drawerContext = useContext(DrawerContext);
    const classes = useStyles(drawerContext);

    return (
        <main className={clsx(classes.content, {
            [classes.contentShift]: drawerContext.open,
        })}>
            <div className={classes.drawerHeader} />
            <Container maxWidth='lg'>
                {props.children}
            </Container>
        </main>
    );
}