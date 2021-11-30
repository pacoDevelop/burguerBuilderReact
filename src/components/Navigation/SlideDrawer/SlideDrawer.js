import React from "react"; // import PropTypes from 'prop-types';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Auxiliar from "../../../hoc/Auxiliar/Auxiliar";
import "./SlideDrawer.css";
import Backdrop from "./Backdrop/Backdrop";
const slideDrawer = (props) => {
  const attachedClasses = props.open ? ["slideDrawer", "open"] : ["slideDrawer", "close"];
  return (
    <Auxiliar>
      <Backdrop show={props.open} clicked={props.closed} />
      <div onClick={props.closed} className={attachedClasses.join(" ")}>
        <Logo style={{ marginBottom: "32px" }} height="10%" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliar>
  );
};

// slideDrawer.propTypes = {

// };

export default slideDrawer;
