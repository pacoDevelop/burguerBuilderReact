import React, { Component } from "react";
import Auxiliar from "../Auxiliar/Auxiliar";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SlideDrawer from "../../components/Navigation/SlideDrawer/SlideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSlideDrawer: false,
  };
  slideDrawerCloseHandler = () => {
    this.setState({ showSlideDrawer: false });
  };

  slideDrawerOpenHandler = () => {
    this.setState({ showSlideDrawer: true });
  };

  render() {
    return (
      <Auxiliar>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          show={!this.state.showSlideDrawer}
          open={this.slideDrawerOpenHandler}
        />
        <SlideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSlideDrawer}
          closed={this.slideDrawerCloseHandler}
        />
        <main className="Content">{this.props.children}</main>
      </Auxiliar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(Layout);
