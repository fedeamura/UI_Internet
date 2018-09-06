import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import "./style.css";
import _ from "lodash";

//Router
import { Route, withRouter } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { history } from "@Redux/Store/index";
import { ConnectedRouter } from "connected-react-router";

//REDUX
import { connect } from "react-redux";
import { push } from "connected-react-router";

//Compontes
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

//Mis Componentes
import MiDrawer from "./_DrawerNavigation/index";
import MiToolbar from "@Componentes/MiToolbar";
import Menu from "./menu";

const mapStateToProps = state => {
  return {
    usuario: state.Usuario.usuario
  };
};

const mapDispatchToProps = dispatch => ({
  redireccionar: url => {
    dispatch(push(url));
  }
});

const limite = "lg";
class App extends React.Component {
  constructor(props) {
    super(props);

    let paraMobile = !isWidthUp(limite, props.width);
    this.state = {
      open: paraMobile ? false : true,
      paraMobile: paraMobile
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    setTimeout(() => {
      let paraMobile = !isWidthUp(limite, this.props.width);
      this.setState({
        open: false,
        paraMobile: paraMobile
      });
    }, 500);
  };

  toggleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, width, location } = this.props;

    let paginaActual = _.find(Menu, item => {
      return item.url == location.pathname;
    });

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.root}>
          {/* Toolbar */}
          <MiToolbar
            paraMobile={this.state.paraMobile}
            titulo={paginaActual.titulo}
            width={width}
            leftIcon={
              <IconButton
                color="inherit"
                aria-label="Abrir menu"
                onClick={this.toggleDrawerOpen}
                className={classNames(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
            }
          />

          {/* Drawer */}
          <MiDrawer
            width={width}
            paginaActual={paginaActual}
            paraMobile={this.state.paraMobile}
            onClose={this.handleDrawerClose}
            onPaginaClick={this.props.redireccionar}
            onOpen={this.handleDrawerOpen}
            open={this.state.open}
          />

          {/* Contenido */}
          <div className={classes.main}>
            <div className={classes.separadorToolbar} />
            <div className={classes.content}>
              <Route path="/" component={Content} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const Content = () => {
  return (
    <ConnectedRouter history={history}>
      <AnimatedSwitch
        atEnter={{ opacity: 0, top: 20 }}
        atLeave={{ opacity: 0, top: 0 }}
        atActive={{ opacity: 1, top: 0 }}
        className={"switch-wrapper"}
      >
        {Menu.map((item, index) => {
          return (
            <Route
              key={index}
              exact={item.exact}
              path={item.url}
              component={item.component}
            />
          );
        })}
      </AnimatedSwitch>
    </ConnectedRouter>
  );
};

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh"
  },
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  separadorToolbar: theme.mixins.toolbar,
  content: {
    flex: 1,
    width: "100%"
  },
  switchWrapper: {
    position: "relative",
    width: "100%",
    flex: 1
  }
});

let componente = undefined;
componente = withStyles(styles)(App);
componente = withWidth()(componente);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;
