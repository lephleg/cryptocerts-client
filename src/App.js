import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "./components/TopBar";
import SlideDrawer from "./components/SlideDrawer";
import Content from './components/Content';

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    display: 'flex',
  }
});

export default function App() {
  const classes = useStyles();

  const [drawerOpen, setOpen] = React.useState(false);
  const [page, setPage] = React.useState('CryptoCerts');

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
          page={page}
          drawerWidth={drawerWidth}
          drawerOpen={drawerOpen}
          handleOpenClick={handleDrawerOpen}
        />
        <SlideDrawer
          drawerWidth={drawerWidth}
          drawerOpen={drawerOpen}
          handleCloseClick={handleDrawerClose}
        />
        <Content
          drawerWidth={drawerWidth}
          drawerOpen={drawerOpen}
        />
      </div>
  );
}
