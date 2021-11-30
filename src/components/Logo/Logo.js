import React from "react";
// import PropTypes from 'prop-types';
import burgerLogo from "../../assets/images/logo.png";
import "./Logo.css";
const logo = (props) => {
  return (
    <div className="logo" style={{ height: props.height }}>
      <img src={burgerLogo} alt="Mi Burger" />
    </div>
  );
};

// logo.propTypes = {

// };

export default logo;
