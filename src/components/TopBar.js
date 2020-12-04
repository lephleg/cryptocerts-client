import React from 'react';
import clsx from "clsx"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: props => `calc(100% - ${props.drawerWidth}px)`,
        marginLeft: props => props.drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    }
}));

export default function TopBar(props) {
    const classes = useStyles(props);
    return (
        <AppBar color="primary" position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: props.drawerOpen })}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={clsx(classes.menuButton, props.drawerOpen && classes.hide)}
                    color="inherit"
                    aria-label="menu"
                    onClick={props.handleOpenClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6">
                    {props.page}
                </Typography>
                <Button color="inherit">
                    Connect
                </Button>
            </Toolbar>
        </AppBar>
    );
}