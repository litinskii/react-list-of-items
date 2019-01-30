import React, { Component } from "react";
import PropTypes from "prop-types";
import { range, map } from "lodash";
import PortView from "../PortView";
import ResizeObservable from "../ResizeObservable";
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
        <div className="Home__list-of-items">
          <ResizeObservable onChange={console.log}>
            {map(range(size), i => (
              <div key={i} onClick={() => console.log(++i)} className="Home__list-of-item">
                {++i}
              </div>
            ))}
          </ResizeObservable>
        </div>
      </div>
    );
  }
}
