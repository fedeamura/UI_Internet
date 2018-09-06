import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { login } from "@Redux/Actions/usuario";
import { mostrarAlerta } from "@Redux/Actions/alerta";

const mapDispatchToProps = dispatch => ({
  onBotonLoginClick: () => {
    dispatch(login({ nombre: "fede" }));
  },
  onBotonAlertaClick: () => {
    dispatch(mostrarAlerta("Mensaje de prueba "));
  }
});

class Test2 extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.props.onBotonLoginClick}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.props.onBotonAlertaClick}
        >
          Mensaje
        </Button>
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Test2));
