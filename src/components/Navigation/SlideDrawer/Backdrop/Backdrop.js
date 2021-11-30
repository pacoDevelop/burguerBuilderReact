import React from "react";
import "./Backdrop.css";
const backdrop = (props) => {
  return props.show ? (
    <div onClick={props.clicked} className="backdropSlideDrawer">
      {props.children}
    </div>
  ) : null;
};

export default backdrop;
