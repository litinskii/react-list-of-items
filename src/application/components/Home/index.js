import React, { Component } from "react";
import PropTypes from "prop-types";
import withStore from "../../common/withStore";
import withResetStoreOnMountAndUnMount from "../../common/withResetStoreOnMountAndUnMount";
import store from "./store";
import globalStore from "../globalStore";
import "./Home.scss";
import LoaderOverlay from "../LoaderOverlay";

const countClicks = async () => {
  await store.incrementHomePageClicksCount();
  globalStore.loadAllClicksCount();
};

class Home extends Component {
  async componentDidMount() {
    store.loadHomePageClicksCount();
  }

  render() {
    const { homePageClicksCount, loading } = this.props;
    return (
      <div className="Home e2e-home" onClick={countClicks}>
        {loading ? <LoaderOverlay /> : undefined}
        <div className="Home__clicks e2e-home-clicked-counter">{`Home clicks: ${homePageClicksCount}`}</div>
      </div>
    );
  }
}

Home.propTypes = {
  homePageClicksCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withResetStoreOnMountAndUnMount(withStore(Home, store), store);
