import React, { Component } from "react";
import PropTypes from "prop-types";
import withStore from "../../common/withStore";
import globalStore from "../globalStore";
import "./GlobalClicksCount.scss";

class GlobalClicksCount extends Component {
  async componentDidMount() {
    globalStore.loadAllClicksCount();
  }

  render() {
    const { clickCount } = this.props;
    return (
      <div className="GlobalClicksCount">
        <div className="GlobalClicksCount__clicks">{`All time HomePage and SomeComponentInner clicks: ${clickCount}`}</div>
      </div>
    );
  }
}

GlobalClicksCount.propTypes = {
  clickCount: PropTypes.number.isRequired
};

export default withStore(GlobalClicksCount, globalStore);
