import React, { Component } from "react";
// import PropTypes from 'prop-types';
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-burger";
import config from "../../../config";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CustomInput from "../../../components/UI/Input/CustomInput";
import CustomSelect from "../../../components/UI/Select/CustomSelect";

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
    this.setNameInputRef = null;
    this.setEmailInputRef = null;
    this.setDeleveryMethodSelectRef = null;
    this.setStreetInputRef = null;
    this.setZipcodeInputRef = null;
  }
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (!this.props.ingredients || !this.props.price || this.props.price < 4) {
      return;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max hernandez",
        address: {
          street: "Test  1",
          zipCode: "23213",
          country: "Spain",
        },
        email: "test@test.com",
      },
      deleveryMethod: "fastest",
    };
    axios
      // .post("/orders.json", order)
      .post(config.api.orders, order)
      .then((response) => {
        setTimeout(() => {
          this.setState({ loading: false, purchasing: false });
          this.props.history.push("/");
        }, 3000);
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    let btn = (
      <Button clicked={this.orderHandler} btnType="success">
        Comprar
      </Button>
    );
    // if (!this.props.ingredients || !this.props.price || this.props.price < 4) {
    //   btn = <p style={{ color: "red" }}>No hay ingredientes</p>;
    // }

    let form = (
      <form>
        <CustomInput
          ref={(refName) => {
            this.setNameInputRef = refName;
          }}
          id="name"
          label="Nombre"
          variant="outlined"
        />
        <CustomInput
          ref={(refEmail) => {
            this.setEmailInputRef = refEmail;
          }}
          id="email"
          label="Email"
          variant="outlined"
        />
        <CustomInput
          ref={(refStreet) => {
            this.setStreetInputRef = refStreet;
          }}
          id="street"
          label="Calle"
          variant="outlined"
        />
        <CustomInput
          ref={(refDeleveryMethod) => {
            this.setDeleveryMethodSelectRef = refDeleveryMethod;
          }}
          id="postal"
          label="Codigo postal"
          variant="outlined"
        />
        <CustomSelect
          ref={(refDeleveryMethod) => {
            this.setDeleveryMethodSelectRef = refDeleveryMethod;
          }}
          label="Metodo de entrega"
          name="deleveryMethod"
        >
          <option value={1}>Rápida</option>
          <option value={2}>Barata</option>
        </CustomSelect>
        {/* <CustomInput type="text" name="name" placeholder="Nombre" />
        <CustomInput type="email" name="email" placeholder="Email" />
        <CustomInput type="text" name="street" placeholder="Calle" />
        <CustomInput type="text" name="postal" placeholder="Codigo postal" /> */}
        {btn}
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
