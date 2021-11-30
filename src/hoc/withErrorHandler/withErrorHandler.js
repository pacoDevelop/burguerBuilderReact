import React, { Component } from "react";
import Auxiliar from "../Auxiliar/Auxiliar";
import Modal from "../../components/UI/Modal/Modal";
// import PropTypes from 'prop-types';
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState(this.setState({ error: null }));
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    // componentDidMount() {
    //   axios.interceptors.request.use((req) => {
    //     this.setState(this.setState({ error: null }));
    //     return req;
    //   });
    //   axios.interceptors.response.use(
    //     (res) => res,
    //     (error) => {
    //       this.setState({ error: error });
    //     }
    //   );
    // }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliar>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliar>
      );
    }
  };
};

// withErrorHandler.propTypes = {

// };

export default withErrorHandler;
