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
import DescriptionIcon from '@material-ui/icons/Description';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

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

  const web3Capable = useSelector((state) => state.connection.web3Capable);
  const role = useSelector((state) => state.connection.role);

  const isAdmin = role === 'admin';
  const isInstitution = role === 'institution';
  const isInstitutionOrStudent = role === 'institution' || role === 'student';

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
      <Divider className={clsx({
        [classes.hide]: !web3Capable,
      })} />
      <List className={clsx({
        [classes.hide]: !web3Capable && !isAdmin,
      })}>
        <ListItemLink hide={!web3Capable} key={2} to="/institutions" primary="Institutions" icon={<AccountBalanceIcon />} />
        <ListItemLink hide={!isAdmin} key={3} to="/create-institution" primary="Create Institution" icon={<AddCircleIcon />} />
      </List>
      <Divider className={clsx({
        [classes.hide]: !isInstitutionOrStudent,
      })} />
      <List className={clsx({
        [classes.hide]: !isInstitutionOrStudent,
      })}>
        <ListItemLink hide={!isInstitutionOrStudent} key={4} to="/certificates" primary="Certificates" icon={<DescriptionIcon />} />
        <ListItemLink hide={!isInstitution} key={5} to="/create-certificate" primary="Create Certificate" icon={<AddCircleIcon />} />
      </List>
      <Divider className={clsx({
        [classes.hide]: !web3Capable,
      })} />
      <List className={clsx({
        [classes.hide]: !web3Capable,
      })}>
        <ListItemLink hide={!web3Capable} key={6} to="/validate" primary="Validate" icon={<VerifiedUserIcon />} />
      </List>
    </Drawer>
  );
}
