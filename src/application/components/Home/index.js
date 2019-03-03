import React, { Component } from "react";
import { range, map } from "lodash";
import ViewPort from "../ViewPort";
import "./style.scss";

export default class extends Component {
  static displayName = "Home";

  state = {
    size: 100
  };

  render() {
    const { size } = this.state;

    return (
      <div className="Home">
        <div className="Home__sizes">
          <div className="Home__size" onClick={() => this.setState({ size: 100 })}>
            100
          </div>
          <div className="Home__size" onClick={() => this.setState({ size: 5000 })}>
            5000
          </div>
        </div>
        <ViewPort className="Home__list-of-items">
          {map(range(size), i => (
            <div key={i} className="Home__list-of-item">
              {i + 1}
            </div>
          ))}
        </ViewPort>
      </div>
    );
  }
}
