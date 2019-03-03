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

  componentDidUpdate(prevProps, prevState) {
    const { height } = this.state;
    const { children } = this.props;

    if (height !== prevState.height || Children.count(children) !== Children.count(prevProps.children)) {
      this.setSizes();
    }
  }

  setSizes = throttle(() => {
    const { height } = this.state;
    const { children } = this.props;
    const { scrollTop } = this.rootRef.current;

    if (!this.childRef.current) {
      this.setState({ topOffset: 0, startItemIndex: 0, bottomOffset: 0 });
      this.rootRef.current.scrollTop = 0;
      return;
    }

    const { marginTop, marginBottom } = getComputedStyle(this.childRef.current);
    const heightOfItem = this.childRef.current.offsetHeight + parseInt(marginTop, 10) + parseInt(marginBottom, 10);

    const sizeOfItemsToHidden = Math.ceil(scrollTop / heightOfItem);
    const startItemIndex = sizeOfItemsToHidden > 0 ? sizeOfItemsToHidden - 1 : 0;
    const topOffset = startItemIndex * heightOfItem;
    const sizeOfItemsToRender = Math.ceil(height / heightOfItem) + 1;
    const bottomOffset = Children.toArray(children).length * heightOfItem - sizeOfItemsToRender * heightOfItem - topOffset;
    this.setState({ topOffset, startItemIndex, sizeOfItemsToRender, bottomOffset: bottomOffset > 0 ? bottomOffset : 0 });
  }, 100);

  setHeight = ({ height }) => this.setState({ height });

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
