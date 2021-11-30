import React from "react";
// import { Input } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
const useInputStyles = makeStyles({
  TextField: {
    // display: "block",
    width: "100%",
    // marginRight: "auto",
    // marginLeft: "auto",
    // textAlign: "center",
    margin: "5px",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff5722", //your color
    },
  },
});
const CustomInput = React.forwardRef((props, ref) => {
  const classes = useInputStyles({});
  // return <Input className={classes.input} {...props} />;
  return (
    <ThemeProvider theme={theme}>
      <TextField inputRef={ref} className={classes.TextField} {...props} />
    </ThemeProvider>
  );
});
export default CustomInput;
