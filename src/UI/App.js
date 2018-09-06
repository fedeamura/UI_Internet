import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";

//Componentes
import Snackbar from "@material-ui/core/Snackbar";

//Router
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

//REDUX
import { connect } from "react-redux";
import { login } from "@Redux/Actions/usuario";
import { ocultarAlerta } from "@Redux/Actions/alerta";
import { replace } from "connected-react-router";

//Mis componentes
import Inicio from "./Inicio/index";
import Login from "./Login/index";
import DetalleApp from "@UI/DetalleApp/index";

import IndicadorCargando from "@UI/_Utils/IndicadorCargando";

const mapStateToProps = state => {
  return {
    alertas: state.Alerta.alertas,
    usuario: state.Usuario.usuario
  };
};

const mapDispatchToProps = dispatch => ({
  onAlertaClose: id => {
    dispatch(ocultarAlerta(id));
  },
  onSinLogin: () => {
    dispatch(replace("/"));
  },
  onLogin: usuario => {
    dispatch(login(usuario));
  }
});

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      validandoUsuario: true
    };
  }

  componentDidMount() {
    this.setState({ validandoUsuario: true }, () => {
      this.getUsuarioLogeado().then(user => {
        this.setState({ validandoUsuario: false });
        if (user != undefined) {
          this.props.onLogin(user);
        } else {
          this.props.onSinLogin();
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.usuario != this.props.usuario) {
      if (nextProps.usuario == undefined) {
        this.props.onSinLogin();
      }
    }
  }

  getUsuarioLogeado = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = sessionStorage.getItem("usuario");
        if (user == undefined || user == "undefined") return resolve(undefined);
        resolve(JSON.parse(user));
      }, 500);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />

        {/* Contenido */}
        <main className={classes.content}>
          <Route path="/" component={Content} />
        </main>

        {/* Alertas  */}
        {this.props.alertas.map((alerta, index) => {
          return (
            <Snackbar
              key={alerta.id}
              open={alerta.visible}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              autoHideDuration={5000}
              onClose={() => {
                this.props.onAlertaClose(alerta.id);
              }}
              ContentProps={{
                "aria-describedby": "message-id" + alerta.id
              }}
              message={
                <span id={"message-id" + alerta.id}>{alerta.mensaje}</span>
              }
            />
          );
        })}

        <IndicadorCargando visible={this.state.validandoUsuario} opacity={1} />
      </div>
    );
  }
}

const Content = () => {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0, top: 0 }}
      atLeave={{ opacity: 0, top: 0 }}
      atActive={{ opacity: 1, top: 0 }}
      className={"switch-wrapper"}
    >
      <Route exact path="/" component={Login} />
      <Route path="/Inicio" component={Inicio} />
      <Route path="/DetalleApp" component={DetalleApp} />
    </AnimatedSwitch>
  );
};

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  content: {
    display: "flex",
    flexGrow: 1,
    overflow: "auto"
  }
});

let componente = undefined;
componente = withStyles(styles)(App);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);
componente = withRouter(componente);
export default componente;
