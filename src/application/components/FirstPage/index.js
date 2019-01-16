import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import "./FirstPage.scss";
import FirstPageInnerFirst from "../FirstPageInnerFirst";
import FirstPageInnerSecond from "../FirstPageInnerSecond";
import Links from "./Links";
import withStore from "../../common/withStore";
import withResetStoreOnMountAndUnMount from "../../common/withResetStoreOnMountAndUnMount";
import store from "./store";

const FirstPage = ({ firstPageClicksCount }) => (
  <div className="FirstPage" onClick={() => store.set({ firstPageClicksCount: firstPageClicksCount + 1 })}>
    <div className="FirstPage__clicks">{`FirstPage clicks: ${firstPageClicksCount}`}</div>
    <Links />
    <Switch>
      <Route path="/first-page/first-page-inner-first/:id" component={FirstPageInnerFirst} />
      <Route path="/first-page/first-page-inner-second" component={FirstPageInnerSecond} />
      <Redirect from="/first-page" to="/first-page/first-page-inner-first/1" />
    </Switch>
  </div>
);

FirstPage.propTypes = {
  firstPageClicksCount: PropTypes.number.isRequired
};

export default withResetStoreOnMountAndUnMount(withStore(FirstPage, store), store);
