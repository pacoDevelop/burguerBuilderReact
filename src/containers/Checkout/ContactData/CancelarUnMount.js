import React, { Component } from "react";
import PropTypes from "prop-types";

class test extends Component {
  constructor(props) {
    super(props);
    this.unregisterLeaveHook = props.router.setRouteLeaveHook(
      props.route,
      this.routerWillLeave.bind(this)
    );
  }

  routerWillLeave(nextLocation) {
    return false;
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    this.unregisterLeaveHook();
  }

  render() {
    return <div></div>;
  }
}

test.propTypes = {};

export default test;
