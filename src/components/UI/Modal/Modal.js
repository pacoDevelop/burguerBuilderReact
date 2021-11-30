import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Auxiliar from "../../../hoc/Auxiliar/Auxiliar";
// import PropTypes from 'prop-types';
import "./Modal.css";
class modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate() {}

  render() {
    return (
      <Auxiliar>
        <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
        <div
          className="modal"
          style={{
            opacity: this.props.show ? "1" : "0",
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliar>
    );
  }
}

// modal.propTypes = {

// };

export default modal;
