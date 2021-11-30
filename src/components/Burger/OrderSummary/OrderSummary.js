import React, { Component } from "react";
// import PropTypes from 'prop-types';
import Auxiliar from "../../../hoc/Auxiliar/Auxiliar";
import Button from "../../UI/Button/Button";
import "./OrderSummary.css";
class orderSummary extends Component {
  //Esto podría ser un componente funcional , no debe ser clase en ese caso.
  componentDidUpdate() {}
  keyToName(key) {
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
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{this.keyToName(igKey)}</span>: {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Auxiliar>
        <div className="orderSummary">
          <div className="orderSummaryCard">
            <h3>Mi compra</h3>
            <p>Una deliciosa burger con los siguientes ingredientes:</p>
            <ul>{ingredientsSummary}</ul>
            <p>
              {" "}
              <strong>Precio total: {this.props.price.toFixed(2)} €</strong>
            </p>
          </div>
          <div
            className="orderSummaryCard"
            style={{
              textAlign: "center",
              background: "antiquewhite",
              borderRadius: "10px",
              padding: "1px",
            }}
          >
            {!this.props.view ? (
              <Auxiliar>
                <p>¿Continuar con el pago?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="danger">
                  Cancelar
                </Button>
                <Button clicked={this.props.purchaseContinue} btnType="success">
                  Aceptar
                </Button>
              </Auxiliar>
            ) : (
              <Auxiliar>
                <p>¿Cerrar?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="success">
                  Cerrrar
                </Button>
              </Auxiliar>
            )}
          </div>
        </div>
      </Auxiliar>
    );
  }
}

// orderSummary.propTypes = {

// };

export default orderSummary;
