import React, { Component } from "react";

export default (WrappedComponent, store) =>
  class extends Component {
    constructor(...args) {
      super(...args);
      store.resetToDefaults();
    }

    componentWillUnmount() {
      store.resetToDefaults();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
