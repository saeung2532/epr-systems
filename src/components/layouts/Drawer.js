import React, { useState } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ViewListIcon from "@material-ui/icons/ViewList";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StoreIcon from "@material-ui/icons/Store";
import ShopIcon from "@material-ui/icons/Shop";
import LayersIcon from "@material-ui/icons/Layers";
import BarChartIcon from "@material-ui/icons/BarChart";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PrintIcon from "@material-ui/icons/Print";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import * as loginActions from "./../../actions/login.action";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  draweropendrawer: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // width: theme.spacing(7) + 1,
    width: 0,
    [theme.breakpoints.up("sm")]: {
      // width: theme.spacing(9) + 1
      width: 0,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  isActive: {
    backgroundColor: "#e0f5fd",
    color: "#0080ff",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const MiniDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [opendrawer, setOpenDrawer] = useState(false);
  const [openmenuph, setOpenMenuPH] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);

  const handleDraweropendrawer = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuopendrawer = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    setOpenMenuPH(!openmenuph);
  };

  const logout = () => {
    dispatch(loginActions.logout(props.history));
    props.history.push("./");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color={
          process.env.REACT_APP_IS_PRODUCTION === "1" ? "primary" : "secondary"
        }
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: opendrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="opendrawer drawer"
            onClick={handleDraweropendrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: opendrawer,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Smart Purchase : Monthly Plan - Ver {process.env.REACT_APP_VERSION}
            <Typography variant="body1">{props.company}</Typography>
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.draweropendrawer]: opendrawer,
          [classes.drawerClose]: !opendrawer,
        })}
        classes={{
          paper: clsx({
            [classes.draweropendrawer]: opendrawer,
            [classes.drawerClose]: !opendrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* Monthly Plan */}
          <ListItem
            component={NavLink}
            to="/plan_pr"
            button
            key="plan_pr"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Plan MPR" />
          </ListItem>

          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="PH Manage" />
            {openmenuph ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openmenuph} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                component={NavLink}
                to="/confirm_pr"
                button
                key="confirm_pr"
                activeClassName={classes.isActive}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Confirm MPR" />
              </ListItem>
              <ListItem
                component={NavLink}
                to="/grouping_pr"
                button
                key="grouping_pr"
                activeClassName={classes.isActive}
              >
                <ListItemIcon>
                  <DynamicFeedIcon />
                </ListItemIcon>
                <ListItemText primary="Grouping PR" />
              </ListItem>
              <ListItem
                component={NavLink}
                to="/genpo"
                button
                key="genpo"
                activeClassName={classes.isActive}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Gen PO" />
              </ListItem>
            </List>
          </Collapse>

          {/* PR Stock */}
          {/* <ListItem
            component={NavLink}
            to="/pr_stock"
            button
            key="pr_stock"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <ShopIcon />
            </ListItemIcon>
            <ListItemText primary="PR Stock" />
          </ListItem> */}

          {/* PR NonStock */}
          {/* <ListItem
            component={NavLink}
            to="/pr_nonstock"
            button
            key="pr_nonstock"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="PR NonStock" />
          </ListItem> */}

          {/* PH Manage */}
          {/* <ListItem
            component={NavLink}
            to="/ph_manage"
            button
            key="ph_manage"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="PH Manage" />
          </ListItem> */}

          {/* Monitoring */}
          <ListItem
            component={NavLink}
            to="/monitoring"
            button
            key="monitoring"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Monitoring" />
          </ListItem>

          <ListItem
            component={NavLink}
            to="/printreport"
            button
            key="printreport"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Print Report" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(MiniDrawer);
