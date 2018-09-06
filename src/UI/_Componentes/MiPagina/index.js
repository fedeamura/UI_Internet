import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import MiToolbar from "@Componentes/MiToolbar";

class MiPagina extends React.PureComponent {
  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <MiToolbar leftIcon={this.props.toolbarLeftIcon} titulo="#CBA147" />
          {/* Contenido */}
          <div className={classes.main}>
            <div className={classes.separadorToolbar} />
            <div className={classes.content}>{this.props.children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

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
  }
});

let componente = MiPagina;
componente = withStyles(styles)(componente);
export default componente;
