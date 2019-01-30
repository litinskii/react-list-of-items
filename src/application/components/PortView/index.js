import { Component, createRef } from "react";

class PortView extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default PortView;
