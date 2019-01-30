import React, { Component, createRef } from "react";

class PortView extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {}

  render() {
    const { props } = this;
    const { children } = this.props;

    return (
      <div {...props} ref={this.ref}>
        {children}
      </div>
    );
  }
}

export default PortView;
