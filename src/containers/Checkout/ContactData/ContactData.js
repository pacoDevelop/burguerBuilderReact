import React, { Component } from "react";
// import PropTypes from 'prop-types';
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CustomInput from "../../../components/UI/Input/CustomInput";
import CustomSelect from "../../../components/UI/Select/CustomSelect";
import axiosBurger from "../../../axios-burger";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

// const inputStyle = {
//   display: "block",
//   width: "300px",
//   marginRight: "auto",
//   marginLeft: "auto",
//   textAlign: "center",
// };
class ContactData extends Component {
  constructor(props) {
    super(props);
    this._name = React.createRef();
    this.email = React.createRef();
    this.street = React.createRef();
    this.country = React.createRef();
    this.zipCode = React.createRef();
    this.deleveryMethod = React.createRef();
    this.state = {
      validate: true,
      msg: "",
    };
  }

  orderHandler = (event) => {
    event.preventDefault();
    if (this.state.validate) {
      const order = this.onChangeDataOrderHandler();
      this.props.onOrderBurger(order, this.props.token);
    }
  };

  onChangeDataOrderHandler = () => {
    let msg = "Faltan campos por rellenar";
    let validate = true;

    const textFields = [
      this._name,
      this.street,
      this.zipCode,
      this.country,
      this.email,
      this.street,
      this.deleveryMethod,
    ];
    if (
      validate &&
      ((this.props.ings && Object.keys(this.props.ings).length === 0) || !this.props.price || this.props.price < 2.7)
    ) {
      validate = false;
      msg = "No hay suficientes ingredientes";
    }

    textFields.forEach((textField) => {
      if (validate & (!textField.current.value || (textField.current.value && textField.current.value === ""))) {
        validate = false;
        msg = "Faltan campos por rellenar";
        return null;
      }
    });
    if (!validate) {
      this.setState({ validate: validate, msg: msg });
      return null;
    } else {
      this.setState({ validate: validate });
    }

    const orderData = {
      name: this._name.current.value,
      address: {
        country: this.country.current.value,
        street: this.street.current.value,
        zipCode: this.zipCode.current.value,
      },
      email: this.email.current.value,
    };
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: orderData,
      userId: this.props.userId,
      deleveryMethod:
        this.deleveryMethod.current.value === "1"
          ? "fast"
          : this.deleveryMethod.current.value === "2"
          ? "lowcost"
          : null,
    };

    return order;
  };
  render() {
    let btn = (
      <Button disabled={!this.state.validate} btnType="success outline">
        Comprar
      </Button>
    );
    if (!this.state.validate) {
      btn = (
        <div>
          {btn} <p style={{ color: "red" }}>{this.state.msg}</p>
        </div>
      );
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        <CustomInput
          required
          ref={this._name}
          inputProps={{
            maxLength: 100,
            minLength: 2,
          }}
          id="name"
          label="Nombre"
          variant="outlined"
          onChange={this.onChangeDataOrderHandler}
        />
        <CustomInput
          onChange={this.onChangeDataOrderHandler}
          required
          ref={this.email}
          inputProps={{
            maxLength: 100,
            minLength: 2,
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          }}
          id="email"
          label="Email"
          variant="outlined"
        />
        <CustomInput
          onChange={this.onChangeDataOrderHandler}
          required
          ref={this.street}
          inputProps={{
            maxLength: 100,
            minLength: 2,
          }}
          id="street"
          label="Calle"
          variant="outlined"
        />
        <CustomInput
          onChange={this.onChangeDataOrderHandler}
          required
          ref={this.country}
          inputProps={{
            maxLength: 100,
            minLength: 2,
          }}
          id="country"
          label="País"
          variant="outlined"
        />
        <CustomInput
          onChange={this.onChangeDataOrderHandler}
          required
          ref={this.zipCode}
          inputProps={{
            maxLength: 10,
            minLength: 4,
          }}
          id="postal"
          label="Codigo postal"
          variant="outlined"
        />
        <CustomSelect
          onChange={this.onChangeDataOrderHandler}
          ref={this.deleveryMethod}
          label="Metodo de entrega"
          name="deleveryMethod"
        >
          <option value="1">Rápida</option>
          <option value="2">Barata</option>
        </CustomSelect>
        {/* <CustomInput type="text" name="name" placeholder="Nombre" />
        <CustomInput type="email" name="email" placeholder="Email" />
        <CustomInput type="text" name="street" placeholder="Calle" />
        <CustomInput type="text" name="postal" placeholder="Codigo postal" /> */}
        {btn}
      </form>
    );
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }
    return (
      <div className="contactData">
        <h4>Introduzca sus datos</h4>
        {form}
      </div>
    );
  }
}

// ContactData.propTypes = {

// };
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosBurger));
// export default ContactData;
