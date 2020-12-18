import React from 'react';
import DrawerProvider from '../context/DrawerProvider'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./TopBar";
import SlideDrawer from "./SlideDrawer";
import Content from './Content';
import Notification from './Notification';
import NetworkAlertDialog from './NetworkAlertDialog';
import Web3AlertDialog from './Web3AlertDialog';
import MetamaskDialog from './MetamaskDialog';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
});

export default function MainLayout(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <DrawerProvider>
                <TopBar />
                <SlideDrawer />
                <Content>
                    {props.children}
                </Content>
            </DrawerProvider>
            <Web3AlertDialog />
            <NetworkAlertDialog />
            <MetamaskDialog />
            <Notification />
        </div>
    );
}