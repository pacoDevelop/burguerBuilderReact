import axiosBurger from "../../axios-burger";
import config from "../../config";
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axiosBurger
      .post(config.api.orders + token, orderData)
      .then((response) => {
        setTimeout(() => {
          if (response && response.status === 200) {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
          }
        }, 3000);
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdesSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdesFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdesStart = (orders) => {
  return { type: actionTypes.FETCH_ORDERS_START, orders: orders };
};

export const fetchOrders = (userId, token) => {
  return (dispatch) => {
    axiosBurger
      // .get(config.api.orders + token)
      .get(config.api.ordersUserId(userId, token))
      .then((res) => {
        const fetchedOders = [];
        for (let key in res.data) {
          fetchedOders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdesSuccess(fetchedOders));
      })
      .catch((err) => {
        dispatch(fetchOrdesFail(err));
      });
  };
};

export const removeOrder = (id, event, token, userId) => {
  event.stopPropagation();
  return (dispatch) => {
    axiosBurger
      .delete(config.api.ordersRemove(id, token))
      .then((res) => {
        dispatch(fetchOrders(userId, token));
      })
      .catch((err) => {
        dispatch(fetchOrdesFail(err));
      });
  };
};
