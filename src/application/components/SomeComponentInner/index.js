import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SomeComponentInner.scss";
import withStore from "../../common/withStore";
import withResetStoreOnMountAndUnMount from "../../common/withResetStoreOnMountAndUnMount";
import firstPageStore from "../FirstPage/store";
import store from "./store";
import globalStore from "../globalStore";
import LoaderOverlay from "../LoaderOverlay";

const countClicks = async () => {
  await store.incrementClicksCount();
  globalStore.loadAllClicksCount();
};

class SomeComponentInner extends Component {
  componentDidMount() {
    store.loadClicksCount();
  }

  render() {
    const { firstPageClicksCount, someComponentInnerClicksCount, loading } = this.props;
    return (
      <div className="SomeComponentInner" onClick={countClicks}>
        {loading ? <LoaderOverlay /> : undefined}
        <div className="SomeComponentInner__clicks">{`FirstPage clicks: ${firstPageClicksCount}`}</div>
        <div className="SomeComponentInner__clicks">{`SomeComponentInner clicks: ${someComponentInnerClicksCount}`}</div>
      </div>
    );
  }
}

SomeComponentInner.propTypes = {
  firstPageClicksCount: PropTypes.number.isRequired,
  someComponentInnerClicksCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withStore(withResetStoreOnMountAndUnMount(withStore(SomeComponentInner, store), store), firstPageStore);
