import React, { Component } from "react";
import { connect } from "react-redux";
import axiosBurger from "../../axios-burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Order from "../../components/Order/Order";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import config from "../../config";
// import PropTypes from 'prop-types';
import "./Orders.css";
class Orders extends Component {
  state = {
    order: null,
    openOrder: false,
  };
  componentDidMount() {
    this.props.onFetchOrders(this.props.userId, this.props.token);
  }

  closeHandler = () => {
    this.setState({ openOrder: false });
  };

  onViewOrder = (order) => {
    this.setState({ openOrder: true, order: order });
  };

  render() {
    const orderSummary = this.state.order ? (
      <OrderSummary
        purchaseCanceled={this.closeHandler}
        view={true}
        ingredients={this.state.order.ingredients}
        price={this.state.order.price}
      />
    ) : null;

    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div className="orders">
          {this.props.orders.map((order, key) => (
            <Order
              removeOrder={(event) => {
                this.props.onRemoveOrder(
                  config.api.firebase ? order.id : order._id,
                  event,
                  this.props.token,
                  this.props.userId
                );
              }}
              viewOrder={() => {
                this.onViewOrder(order);
              }}
              ingredients={order.ingredients}
              price={order.price}
              key={order.id}
            />
          ))}

          <Modal modalClosed={this.closeHandler} show={this.state.openOrder}>
            {orderSummary}
          </Modal>
        </div>
      );
    }
    // this.props.orders.map((order) => console.log(order.price));
    return orders;
  }
}

// Orders.propTypes = {

// };
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (userId, token) => dispatch(actions.fetchOrders(userId, token)),
    onRemoveOrder: (id, event, token, userId) => dispatch(actions.removeOrder(id, event, token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosBurger));
