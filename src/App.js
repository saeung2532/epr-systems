import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Drawer from "./components/layouts/Drawer";
import PrivateRoute from "./components/PrivateRoute";
import * as loginActions from "./actions/login.action";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import PlanPRPage from "./components/pages/PlanPRPage/PlanPRPage";
import PRStockPage from "./components/pages/PRStockPage/PRStockPage";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3)
  }
}));

export default function App() {
  const classes = useStyles();

  // Login Route
  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        loginActions.isLoggedIn() ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <div className={classes.root}>
            <Container className={classes.content} maxWidth={false}>
              <Component {...props} />
            </Container>
          </div>
        )
      }
    />
  );

  //Private Route
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        loginActions.isLoggedIn() ? (
          <div className={classes.root}>
            <Drawer />
            <Container className={classes.content} maxWidth={false}>
              <Component {...props} />
            </Container>
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );

  return (
    <Router basename={process.env.REACT_APP_IS_PRODUCTION === 1 ? "/demo" : ""}>
      <Switch>
        <PrivateRoute exact path="/" component={PlanPRPage} />
        <PrivateRoute exact path="/plan_pr" component={PlanPRPage} />
        <LoginRoute path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}