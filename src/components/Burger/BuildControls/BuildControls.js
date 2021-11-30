import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
// import PropTypes from 'prop-types';
// import Context from "../../../context/context";
import icoBacon from "../../../assets/images/bacon.png";
import icoMeat from "../../../assets/images/meat.png";
import icoSalad from "../../../assets/images/lechuga.png";
import icoCheese from "../../../assets/images/queso.png";
const controls = [
  { label: "Lechuga", type: "salad", image: icoSalad },
  { label: "Bacon", type: "bacon", image: icoBacon },
  { label: "Queso", type: "cheese", image: icoCheese },
  { label: "Carne", type: "meat", image: icoMeat },
];
const buildControls = (props) => {
  //   const context = useContext(Context);
  // console.log(context);
  return (
    <div className="buildControls">
      <p>
        Precio actual: <strong>{props.price.toFixed(2)} €</strong>
      </p>
      <div className="panel">
        {controls.map((ctrl) => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            //   added={() => props.ingredientAdded(ctrl.type)}
            added={() => props.ingredientAdded(ctrl.type)}
            remove={() => props.ingredientRemove(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
            image={ctrl.image !== "" ? ctrl.image : null}
          />
        ))}
      </div>
      <button onClick={props.ordered} disabled={!props.purchasable} className="orderButton">
        {props.isAuth ? "COMPRAR AHORA" : "INICIE SESIÓN"}
      </button>
    </div>
  );
};

// BuildControls.propTypes = {

// };

export default buildControls;
