import React from "react";
// import PropTypes from 'prop-types';
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";
const navigationItems = (props) => {
  return (
    <ul className="navigationItems">
      <NavigationItem link="/" active>
        Constructor de burger
      </NavigationItem>
      {props.isAuthenticated ? <NavigationItem link="/orders">Pedidos</NavigationItem> : null}
      {props.isAuthenticated ? (
        <NavigationItem link="/logout">Cerrar Sesión</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Autentificar </NavigationItem>
      )}
    </ul>
  );
};

// navigationItems.propTypes = {

// };

export default navigationItems;
