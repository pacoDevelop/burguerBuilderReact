import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel } from "@material-ui/core";

const customStyle = (ballColorNotCheck, ballColorCheck, backgroundColor) => {
  return {
    switchBase: {
      color: ballColorNotCheck,
      "&$checked": {
        color: ballColorCheck,
      },
      "&$checked + $track": {
        backgroundColor: backgroundColor,
      },
    },
    checked: {},
    track: {},
  };
};

// const useStyles = makeStyles(() => ({
//   label: {
//     color: "red",
//   },
// }));

export default function CustomizedSwitch(props) {
  // const [state, setState] = React.useState({
  //   checked: props.checked,
  // });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const CustomSwitch = withStyles(customStyle(...props.styled, props.checked))(Switch);
  // const classes = useStyles();

  return (
    <FormControlLabel
      control={<CustomSwitch checked={props.checked} onChange={props.handleChange} name="checked" />}
      // label={<Typography style={{ color: "grey" }}>{!props.checked ? "LOGIN" : "REGISTRO"}</Typography>}
      label={<Typography style={{ color: "grey" }}>LOGIN</Typography>}
    />

    // <Typography component="div">
    // <Grid component="label" container alignItems="center" spacing={1}>
    //   <Grid item>{props.textLeft}</Grid>
    //   <Grid item>
    // <CustomSwitch checked={props.checked} onChange={props.handleChange} name="checked" />

    //   </Grid>
    //   <Grid item>{props.textRight}</Grid>
    // </Grid>
    // </Typography>
  );
}
