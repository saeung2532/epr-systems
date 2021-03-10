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
  Switch,
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Drawer from "./components/layouts/Drawer";
import Header from "./components/layouts/Header";
import * as loginActions from "./actions/login.action";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";
import PlanPRPage from "./components/pages/PlanPRPage/PlanPRPage";
import ConfirmPRPage from "./components/pages/ConfirmPRPage/ConfirmPRPage";
import GroupPRPage from "./components/pages/GroupPRPage/GroupPRPage";
import GenPOPage from "./components/pages/GenPOPage/GenPOPage";
import MonitoringPage from "./components/pages/MonitoringPage/MonitoringPage";
import PrintReportPage from "./components/pages/PrintReportPage/PrintReportPage";
import ApprovePage from "./components/pages/ApprovePage/ApprovePage";
import TestPage from "./components/pages/TestPage/TestPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();

  // Login Route
  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
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
      render={(props) =>
        loginActions.isLoggedIn() ? (
          <div className={classes.root}>
            <Drawer company={loginActions.getTokenCompany()} />
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

  //Public Route
  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={
        (props) => (
          // loginActions.isLoggedIn() ? (
          <div className={classes.root}>
            {/* <Header company={loginActions.getApproveTokenCompany()} /> */}
            <Container className={classes.content} maxWidth={false}>
              <Component {...props} />
            </Container>
          </div>
        )
        // ) : (
        //   <Redirect
        //     to={{ pathname: "/login", state: { from: props.location } }}
        //   />
        // )
      }
    />
  );

  return (
    <Router
      basename={
        process.env.REACT_APP_IS_PRODUCTION === "1" ? "/monthlyplan" : ""
      }
    >
      <Switch>
        <LoginRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/plan_pr" component={PlanPRPage} />
        <PrivateRoute exact path="/confirm_pr" component={ConfirmPRPage} />
        <PrivateRoute exact path="/grouping_pr" component={GroupPRPage} />
        <PrivateRoute exact path="/genpo" component={GenPOPage} />
        <PrivateRoute exact path="/monitoring" component={MonitoringPage} />
        <PrivateRoute exact path="/printreport" component={PrintReportPage} />
        <PrivateRoute exact path="/test" component={TestPage} />
        <PublicRoute
          exact
          // path="/approve/:cono/:divi/:prno/:fromstatus/:tostatus/:approve/:token"
          path="/approve/:cono/:divi/:prno/:approve/:token"
          component={ApprovePage}
        />
        {/* The Default not found component */}
        {/* <Route render={(props) => <Redirect to="/" />} /> */}
      </Switch>
    </Router>
  );
}
