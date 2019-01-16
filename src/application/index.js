import "babel-polyfill";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import NotFoundPage from "./components/NotFoundPage";
import Links from "./components/Links";
import GlobalClicksCount from "./components/GlobalClicksCount";
import "./index.scss";

ReactDOM.render(
  <Router>
    <Fragment>
      <Links />
      <GlobalClicksCount />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/first-page" component={FirstPage} />
        <Route path="/second-page" component={SecondPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  </Router>,
  document.getElementById("root")
);
