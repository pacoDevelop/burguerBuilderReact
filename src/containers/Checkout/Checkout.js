import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import "./Checkout.css";
import { connect } from "react-redux";
// import PropTypes from 'prop-types';

class Checkout extends Component {
  // constructor(props) {
  //   super(props);
  //   props.onInitPurchase();
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    const purchasedRedirect = this.props.purchasing ? <Redirect to="/" /> : null;
    return (
      <div className="checkout">
        {purchasedRedirect}
        <CheckoutSummary
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ings}
        />
        <Route
          // when={true}
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

// Checkout.propTypes = {

// };
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchasing: state.order.purchased,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//   };
// };
export default connect(mapStateToProps)(Checkout);
