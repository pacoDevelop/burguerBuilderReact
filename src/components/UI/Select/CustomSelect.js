import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#bc581e",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    textAlign: "right",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NativeSelects = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    [props.name]: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          {props.label}
        </InputLabel>
        <Select
          inputRef={ref}
          native
          value={state.option}
          onChange={handleChange}
          label={props.label}
          inputProps={{
            name: props.name,
            id: "outlined-age-native-simple",
          }}
          {...props}
        >
          {/* <option aria-label="None" value="" /> */}
          {props.children}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
});

export default NativeSelects;
