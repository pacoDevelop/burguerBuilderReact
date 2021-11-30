import Button from "../UI/Button/Button";
import React from "react";
// import PropTypes from 'prop-types';
import "./Order.css";
const order = (props) => {
  const keyToName = (key) => {
    switch (key) {
      case "meat":
        return "Carne";
      case "salad":
        return "Lechuga";
      case "cheese":
        return "Queso";
      case "bacon":
        return "Bacon";
      default:
        return key;
    }
  };

  const keyToColor = (key, amount) => {
    amount = amount > 19 ? 19 : amount;
    switch (key) {
      case "meat":
        return `#a52a2a${20 + amount * 4}`;
      case "salad":
        return `#00ff00${20 + amount * 4}`;
      case "cheese":
        return `#ffff00${20 + amount * 4}`;
      case "bacon":
        return `#ff005e${20 + amount * 4}`;
      default:
        return key;
    }
  };
  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      //   <li key={igKey}>
      <span
        key={igKey}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "3px 4px",
          border: "1px solid #ccc",
          padding: "3px",
          borderRadius: "10px",
          background: keyToColor(igKey, props.ingredients[igKey]),
        }}
      >
        {keyToName(igKey)}
        {"("}
        {props.ingredients[igKey]}
        {")"}
      </span>

      //   </li>
    );
  });
  return (
    <div onClick={props.viewOrder} className="order">
      <p>Ingredientes:</p>
      {ingredients}
      <p style={{ textAlign: "right" }}>
        Precio: <strong>{props.price ? props.price.toFixed(2) : "ERROR"}€</strong>
      </p>
      <Button clicked={props.removeOrder} btnType="delete">
        Eliminar
      </Button>
    </div>
  );
};

// order.propTypes = {

// };

export default order;
