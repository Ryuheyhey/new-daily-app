import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00a3af",
    },
    secondary: {
      main: "#de3163",
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: '#00a3af',
    // },
    type: "dark",
  },
});

export default theme;
