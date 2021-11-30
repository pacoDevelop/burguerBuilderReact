import React from "react";
import Burger from "../../Burger/Burger";
// import PropTypes from 'prop-types';
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";
const checkoutSummary = (props) => {
  return (
    <div className="checkoutSummary">
      <h1>¡Esperemos que le guste!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="danger" clicked={props.onCheckoutCancelled}>
        Cancelar
      </Button>
      <Button btnType="success" clicked={props.onCheckoutContinued}>
        Aceptar
      </Button>
    </div>
  );
};

// checkoutSummary.propTypes = {

// };

export default checkoutSummary;
