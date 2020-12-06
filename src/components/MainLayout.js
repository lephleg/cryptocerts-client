import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./TopBar";
import SlideDrawer from "./SlideDrawer";
import Content from './Content';
import ConnectDialog from './ConnectDialog';
import CustomAlert from './CustomAlert';

const DRAWER_WIDTH = 240;

export const DrawerContext = React.createContext({
    width: DRAWER_WIDTH,
    open: false,
    setOpen: () => { },
    setClosed: () => { }
});

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
});

export default function MainLayout(props) {
    const classes = useStyles();

    const [drawerOpen, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawerContext = {
        width: DRAWER_WIDTH,
        open: drawerOpen,
        setOpen: handleDrawerOpen,
        setClosed: handleDrawerClose
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <DrawerContext.Provider value={drawerContext}>
                <TopBar handleConnect={props.handleConnect} />
                <SlideDrawer />
                <Content>
                    {props.children}
                </Content>
            </DrawerContext.Provider>
            <ConnectDialog
                connectDialogOpen={props.connectDialogOpen}
            />
            <CustomAlert
                alertOpen={props.alertOpen}
                handleAlertOpen={props.handleAlertOpen}
                handleAlertClose={props.handleAlertClose}
                alertMessage={props.alertMessage}
            />
        </div>
    );
}