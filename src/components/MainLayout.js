import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./TopBar";
import SlideDrawer from "./SlideDrawer";
import Content from './Content';
import ConnectDialog from './ConnectDialog';
import CustomAlert from './CustomAlert';

const drawerWidth = 240;

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

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar
                title={props.title}
                drawerWidth={drawerWidth}
                drawerOpen={drawerOpen}
                handleOpenClick={handleDrawerOpen}
                handleConnect={props.handleConnect}
            />
            <SlideDrawer
                drawerWidth={drawerWidth}
                drawerOpen={drawerOpen}
                handleCloseClick={handleDrawerClose}
            />
            <Content
                drawerWidth={drawerWidth}
                drawerOpen={drawerOpen}
            >
                {props.children}
            </Content>
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