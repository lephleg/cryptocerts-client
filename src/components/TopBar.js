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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SchoolIcon from '@material-ui/icons/School';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BuildIcon from '@material-ui/icons/Build';

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
    const role = useSelector((state) => state.connection.role);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnectAndClose = () => {
        handleClose();
        handleDisconnect();
    };

    let icon;
    if (role === 'admin') {
        icon = <BuildIcon fontSize="large"/>
    } else if (role === 'institution') {
        icon = <AccountBalanceIcon  fontSize="large"/>
    } else if (role === 'student') {
        icon = <SchoolIcon  fontSize="large"/>
    } else {
        icon = <AccountCircle  fontSize="large"/>
    }

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
                {!connected && (
                    <Button color="inherit" onClick={handleConnect}>Connect</Button>
                )}
                {connected && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            size="medium"
                        >
                            {icon}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleDisconnectAndClose}>Disconnect</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}