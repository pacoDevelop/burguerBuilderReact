import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import CustomInput from "../../components/UI/Input/CustomInput";
// import PropTypes from 'prop-types';
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import CustomizedSwitch from "../../components/UI/Switch/CustomSwitch";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.password = React.createRef();
    this.email = React.createRef();
    this.state = {
      singup: null,
      switch: false,
      labelButton: "Registrarse",
    };
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.singup.email, this.state.singup.password, this.state.switch);
  };

  onHandleChange = (event) => {
    this.setState({
      switch: event.target.checked,
      labelButton: event.target.checked ? "Iniciar sesión" : "Registrarse",
    });
  };
  onChangeDataOrderHandler = () => {
    const singup = {
      email: this.email.current.value,
      password: this.password.current.value,
    };
    this.setState({ singup: singup });
  };
  render() {
    let btnSingup = <Button btnType="singup outline">{this.state.labelButton}</Button>;

    let customSwitch = (
      <CustomizedSwitch
        styled={["#703b09a1", "grey", "#703b09a1"]}
        checked={this.state.switch}
        value={this.state.singup ? this.state.singup.email : ""}
        handleChange={this.onHandleChange}
        textLeft="SIGNUP"
        textRight="LOGIN"
      />
    );

    // let btnLogin = <Button btnType="login outline">Iniciar sesión</Button>;

    let form = (
      <form onSubmit={this.orderHandler}>
        <CustomInput
          onChange={this.onChangeDataOrderHandler}
          required
          value={this.state.singup ? this.state.singup.email : ""}
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
          required
          value={this.state.singup ? this.state.singup.password : ""}
          ref={this.password}
          inputProps={{
            maxLength: 100,
            minLength: 8,
          }}
          id="password"
          label="Contraseña"
          variant="outlined"
          onChange={this.onChangeDataOrderHandler}
        />

        {btnSingup}
        {customSwitch}
      </form>
    );
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }

    const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>;
    }

    return (
      <div className="container">
        {authRedirect}
        <div className="Auth ">
          <h2>Introduzca sus datos</h2>
          {form}
          <h3>{errorMessage}</h3>
        </div>
      </div>
    );
  }
}

// Auth.propTypes = {

// };

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, method) => {
      dispatch(actions.auth(email, pass, method));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
