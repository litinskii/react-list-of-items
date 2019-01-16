import React from "react";
import PropTypes from "prop-types";
import SomeComponent from "../SomeComponent";
import "./FirstPageInnerFirst.scss";

const FirstPageInnerFirst = ({ match }) => (
  <div className="FirstPageInnerFirst">
    <div className="FirstPageInnerFirst__params-id">{`FirstPageInnerFirst ID: ${match.params.id}`}</div>
    <SomeComponent />
  </div>
);

FirstPageInnerFirst.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default FirstPageInnerFirst;
