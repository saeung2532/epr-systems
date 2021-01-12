import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";

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

export default function App() {
  return (
    <Router>
      <Switch>
        <LoginRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}
