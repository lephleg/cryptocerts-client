import React, { useContext } from 'react';
import { DrawerContext } from '../context/DrawerProvider';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';

function ListItemLink(props) {
  const { icon, primary, to, hide } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  const renderedListItem = (
    <li>
      <ListItem button component={renderLink} >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );

  return !hide ? renderedListItem : null;
}

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerContext => drawerContext.width,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerContext => drawerContext.width
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

export default function SlideDrawer(props) {

  const drawerContext = useContext(DrawerContext);
  const classes = useStyles(drawerContext);
  const connectedStatus = useSelector((state) => state.connection.connected);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerContext.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={drawerContext.setClosed}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItemLink key={1} to="/" primary="Home" icon={<HomeIcon />} />
      </List>
      <Divider />
      <List>
        <ListItemLink key={2} to="/institutions" primary="Institutions" icon={<AccountBalanceIcon />} />
        <ListItemLink hide={!connectedStatus} key={3} to="/create-institution" primary="Create Institution" icon={<AddCircleIcon />} />
        <ListItemLink key={4} to="/validate" primary="Validate" icon={<VerifiedUserIcon />} />
      </List>
    </Drawer>
  );
}
