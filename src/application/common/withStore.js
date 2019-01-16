import React, { Component } from "react";
import { findKey, keys, includes } from "lodash";

const findFirstExistingStateKeyInProps = (state, props) => {
  const propsKeys = keys(props);
  return findKey(state, (value, key) => includes(propsKeys, key));
};

export default (WrappedComponent, store) =>
  class extends Component {
    constructor(...args) {
      super(...args);
      this.state = store.toJSON();
      this.emitChange = this.emitChange.bind(this);
    }

    componentDidMount() {
      store.events.on("change", this.emitChange);
    }

    componentWillUnmount() {
      store.events.off("change", this.emitChange);
    }

    emitChange() {
      this.setState(store.toJSON());
    }

    render() {
      const existingStateKeyInProps = findFirstExistingStateKeyInProps(this.state, this.props);
      if (existingStateKeyInProps) {
        throw new Error(`Error. Property ${existingStateKeyInProps} already exist.`);
      }
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
