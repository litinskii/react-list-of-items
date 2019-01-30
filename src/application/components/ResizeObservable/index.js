import React, { Component, createRef, Fragment } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

const styleForContainersOfScroll = {
  pointerEvents: "none",
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  zIndex: -1,
  visibility: "hidden",
  maxWidth: "100%"
};

const styleForCollapsedScrolledElement = {
  width: "200%",
  height: "200%"
};

export default class extends Component {
  static displayName = "ResizeObservable";

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  state = { width: 0, height: 0 };

  componentDidMount() {
    this.setWidthAndHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    const { width, height } = this.state;
    const { onChange } = this.props;

    if (prevState.width !== width || prevState.height !== height) {
      const expand = this.refOfExpandContainer.current;
      const collapse = this.refOfCollapseContainer.current;

      expand.scrollLeft = 1;
      expand.scrollTop = 1;

      collapse.scrollLeft = width;
      collapse.scrollTop = height;

      onChange({ width, height });
    }
  }

  setWidthAndHeight = debounce(() => {
    const root = this.refOfExpandContainer.current;
    const width = root.offsetWidth;
    const height = root.offsetHeight;

    this.setState({ width, height });
  }, 500);

  refOfExpandContainer = createRef();
  refOfExpandScrolledElement = createRef();
  refOfCollapseContainer = createRef();

  render() {
    const { children } = this.props;
    const { width, height } = this.state;

    return (
      <Fragment>
        {children}
        <div ref={this.refOfExpandContainer} style={styleForContainersOfScroll} onScroll={this.setWidthAndHeight}>
          <div ref={this.refOfExpandScrolledElement} style={{ width: width + 1, height: height + 1 }} />
        </div>
        <div ref={this.refOfCollapseContainer} style={styleForContainersOfScroll} onScroll={this.setWidthAndHeight}>
          <div style={styleForCollapsedScrolledElement} />
        </div>
      </Fragment>
    );
  }
}
