import React from "react";
// import PropTypes from "prop-types";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      }); //[,]
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length === 0 ? <p>¡Añada ingredientes!</p> : transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

// burger.propTypes = {};

export default burger;
