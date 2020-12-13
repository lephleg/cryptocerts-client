import React, { useContext } from 'react';
import { DrawerContext } from '../context/DrawerProvider';
import clsx from "clsx"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ConnectionContext } from '../context/ConnectionProvider';
import { useSelector } from 'react-redux';

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
        width: drawerContext => `calc(100% - ${drawerContext.width}px)`,
        marginLeft: drawerContext => drawerContext.width,
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

export default function TopBar() {
    const appName = 'CryptoCerts';
    const drawerContext = useContext(DrawerContext);
    const classes = useStyles(drawerContext);
    const { handleConnect, handleDisconnect } = useContext(ConnectionContext);
    const connected = useSelector((state) => state.connection.connected);

    return (
        <AppBar color="primary" position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: drawerContext.open })}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={clsx(classes.menuButton, drawerContext.open && classes.hide)}
                    color="inherit"
                    aria-label="menu"
                    onClick={drawerContext.setOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6">
                    {appName}
                </Typography>
                <Button
                    color="inherit"
                    onClick={!connected ? handleConnect : handleDisconnect}
                >
                    {!connected ? "Connect" : "Disconnect"}
                </Button>
            </Toolbar>
        </AppBar>
    );
}