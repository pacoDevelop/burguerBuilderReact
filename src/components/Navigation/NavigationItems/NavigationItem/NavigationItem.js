import React from "react";
import { NavLink } from "react-router-dom";
// import PropTypes from 'prop-types';
import "./NavigationItem.css";
const navigationItem = (props) => {
  return (
    <li className="navigationItem">
      <NavLink exact to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
};

// navigationItem.propTypes = {

// };

export default navigationItem;
