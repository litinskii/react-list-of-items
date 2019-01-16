import React from "react";
import "./LoaderOverlay.scss";

const LoaderOverlay = () => (
  <div className="LoaderOverlay">
    <img src="/assets/img/loader.gif" className="LoaderOverlay__image" alt="Loading..." />
  </div>
);

export default LoaderOverlay;
