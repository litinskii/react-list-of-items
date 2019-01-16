import React from "react";
import { NavLink, Link } from "react-router-dom";

const Links = () => (
  <div className="Links">
    <NavLink exact activeClassName="Link--active e2e-link-active" className="Link e2e-link-home" to="/">
      Home
    </NavLink>
    <NavLink activeClassName="Link--active" className="Link" to="/first-page">
      FirstPage
    </NavLink>
    <NavLink activeClassName="Link--active" className="Link" to="/second-page">
      SecondPage
    </NavLink>
    <Link className="Link" to="/not-found-page">
      NotFoundPage
    </Link>
  </div>
);

export default Links;
