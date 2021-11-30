import React from "react";
// import PropTypes from 'prop-types';
import "./DrawerToogle.css";
const drawerToogle = (props) => {
  return (
    <div className="mobileOnly">
      <i
        style={{ color: "white", cursor: "pointer" }}
        onClick={props.open}
        className="material-icons"
      >
        menu
      </i>
    </div>
  );
};

// drawerToogle.propTypes = {

// };

export default drawerToogle;
