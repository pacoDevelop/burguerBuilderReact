import React from "react";
// import PropTypes from 'prop-types';
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToogle from "../SlideDrawer/DrawerToogle/DrawerToogle";
const Toolbar = (props) => {
  const classes = props.show ? ["toolbar"] : ["toolbar", "hidden"];
  return (
    <header className={classes.join(" ")}>
      <DrawerToogle open={props.open} />
      <Logo height="80%" />
      <nav className="desktopOnly">
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

// Toolbar.propTypes = {

// };

export default Toolbar;
