import React, { Component, Children, createRef, cloneElement } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import ResizeObservable from "../ResizeObservable";

export default class PortView extends Component {
  static displayName = "PortView";

  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
  };

  state = { topOffset: 0, startItemIndex: 0, sizeOfItemsToRender: 1, bottomOffset: 0, height: 0 };

  setSizes = throttle(() => {
    const { children } = this.props;
    const heightOfItem = this.childRef.current.offsetHeight;
    const { clientHeight, scrollTop } = this.rootRef.current;

    const startItemIndex = (Math.ceil(scrollTop / heightOfItem) || 1) - 1;
    const topOffset = startItemIndex * heightOfItem;
    const sizeOfItemsToRender = Math.ceil(clientHeight / heightOfItem) + 1;
    const bottomOffset = Children.toArray(children).length * heightOfItem - sizeOfItemsToRender * heightOfItem - topOffset;

    this.setState({ topOffset, startItemIndex, sizeOfItemsToRender, bottomOffset: bottomOffset > 0 ? bottomOffset : 0 });
  }, 250);

  setHeight = ({ height }) => this.setState({ height });

  conmponentDidUpdate(prevProps, prevState) {
    if (this.state.height !== prevState.height) {
      this.setSizes();
    }
  }

  rootRef = createRef();

  childRef = createRef();

  render() {
    const { children, className } = this.props;
    const { topOffset, sizeOfItemsToRender, bottomOffset, startItemIndex, height } = this.state;

    return (
      <div className={className} ref={this.rootRef} onScroll={this.setSizes}>
        <ResizeObservable onChange={this.setHeight}>
          <div style={{ minHeight: topOffset, height: topOffset }} />
          {Children.toArray(children)
            .slice(startItemIndex, startItemIndex + sizeOfItemsToRender)
            .map((child, i) => (i === 0 ? cloneElement(child, { ref: this.childRef, style: { visibility: !height && "hidden" } }) : child))}
          <div style={{ minHeight: bottomOffset, height: bottomOffset }} />
        </ResizeObservable>
      </div>
    );
  }
}
