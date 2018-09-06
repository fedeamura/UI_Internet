import React from "react";
import ReactDOM from "react-dom";
import App from "@UI/App";
import registerServiceWorker from "./registerServiceWorker";

//REDUX
import { Provider } from "react-redux";
import Store, { history } from "@Redux/Store/index";

//Router
import { ConnectedRouter } from "connected-react-router";

//Theme
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { hot } from "react-hot-loader";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#FFFFFF"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#149257"
    },
    // error: red,
    // // Used by `getContrastText()` to maximize the contrast between the background and
    // // the text.
    // contrastThreshold: 3,
    // // Used to shift a color's luminance by approximately
    // // two indexes within its tonal palette.
    // // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
    background: {
      // paper: '#fff',
      default: "#eee",
    }
  }
});

let HotApp = hot(module)(App);
ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <HotApp />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
