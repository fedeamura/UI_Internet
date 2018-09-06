import React from "react";
import { withStyles } from "@material-ui/core/styles";

//Componentes
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IndicadorCargando from "@UI/_Utils/IndicadorCargando";

//REDUX
import { connect } from "react-redux";
import { login } from "@Redux/Actions/usuario";
import { replace } from "connected-react-router";

const mapDispatchToProps = dispatch => ({
  onLogin: usuario => {
    dispatch(login(usuario));
  },
  irAInicio: () => {
    dispatch(replace("/Inicio"));
  }
});

const mapStateToProps = state => {
  return {
    usuario: state.Usuario.usuario
  };
};

class Login extends React.Component {
  static defaultProps = {
    usuario: undefined
  };

  constructor(props) {
    super(props);

    let sinLogin = false;
    if (props.usuario == undefined) {
      sinLogin = true;
    }

    this.state = {
      username: "",
      password: "",
      sinLogin: sinLogin
    };
  }

  componentDidMount() {
    if (this.state.sinLogin == false) {
      this.props.onLogin(this.props.usuario);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.usuario != this.props.usuario) {
      if (nextProps.usuario != undefined) {
        this.props.irAInicio();
      }
    }
  }

  onInputUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onInputPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onBotonLoginClick = () => {
    this.setState({ cargando: true }, () => {
      setTimeout(() => {
        this.setState({ cargando: false });

        let usuario = { username: this.state.username };
        this.props.onLogin(usuario);
        // this.setState({ logeado: true });
      }, 1000);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <TextField
            id="inputUsername"
            label="Username"
            className={classes.textField}
            value={this.state.username}
            onChange={this.onInputUsernameChange}
            margin="normal"
          />
          <TextField
            id="inputPassword"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.onInputPasswordChange}
            margin="normal"
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.onBotonLoginClick}
          >
            Login
          </Button>

          <IndicadorCargando visible={this.state.cargando} />
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    height: "100vh"
  }
});

let componente = undefined;
componente = withStyles(styles)(Login);
componente = connect(
  mapStateToProps,
  mapDispatchToProps
)(componente);

export default componente;
