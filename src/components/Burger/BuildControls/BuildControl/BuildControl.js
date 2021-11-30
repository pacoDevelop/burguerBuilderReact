import React from "react";
// import PropTypes from 'prop-types';
import "./BuildControl.css";
const buildControl = (props) => {
  return (
    <div className="buildControl">
      {props.image ? <img alt={props.label} src={props.image}></img> : null}
      <div className="label">{props.label}</div>
      {/* <button className="less">Menos</button>
      <button className="more">Más</button> */}
      <button className="less" disabled={props.disabled} onClick={props.remove}>
        -
      </button>
      <button onClick={props.added} className="more">
        +
      </button>
    </div>
  );
};

// buildControl.propTypes = {

// };

export default buildControl;
