import React from "react";
import { NavLink } from "react-router-dom";

const Links = () => (
  <div className="Links">
    <NavLink exact activeClassName="Link--active" className="Link" to="/first-page/first-page-inner-first/1">
      FirstPageInnerFirst ID 1
    </NavLink>
    <NavLink exact activeClassName="Link--active" className="Link" to="/first-page/first-page-inner-first/2">
      FirstPageInnerFirst ID 2
    </NavLink>
    <NavLink activeClassName="Link--active" className="Link" to="/first-page/first-page-inner-second">
      FirstPageInnerSecond
    </NavLink>
  </div>
);

export default Links;
