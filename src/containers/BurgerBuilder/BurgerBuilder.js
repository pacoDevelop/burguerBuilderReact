import React, { Component } from "react";

import Auxiliar from "../../hoc/Auxiliar/Auxiliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
// import Context from "../../context/context";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-burger";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
// import axiosInstance from "../../axios";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    // loading: false,
    // error: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }
  updatePurchaseState() {
    const sum = Object.keys(this.props.ings)
      .map((igkey) => {
        return this.props.ings[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseContinueHandlerRedirect = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p
        style={{
          textAlign: "center",
          fontWeight: "900",
          fontSize: "30px",
          padding: "100px",
        }}
      >
        Error al comunicarse con el servidor
      </p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxiliar>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemove}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState()}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
          ></BuildControls>
        </Auxiliar>
      );
      orderSummary = (
        <OrderSummary
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandlerRedirect}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );

      // if (this.state.loading) {
      //   orderSummary = <Spinner />;
      // }
    }
    return (
      <Auxiliar>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliar>
    );
  }
}

/* <Context.Provider
  value={{
    ingredientAdded: this.addIngredientHandler,
    ingredientRemove: this.removeIngredientHandler,
    disabledInfo: disabledInfo,
    purchasable: this.state.purchasable,
  }}
> */

/* </Context.Provider> */
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchTpProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch(actions.addIngredient(ingName));
    },
    onIngredientRemove: (ingName) => {
      dispatch(actions.removeIngredient(ingName));
    },
    initIngredients: () => {
      dispatch(actions.initIngredients());
    },
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => {
      dispatch(actions.setAuthRedirectPath(path));
    },
  };
};

export default connect(mapStateToProps, mapDispatchTpProps)(withErrorHandler(BurgerBuilder, axios));

//IMPORTANTE EL ORDER EN EL CONNECT
