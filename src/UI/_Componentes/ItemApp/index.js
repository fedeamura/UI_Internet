import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

//Mis componentes
import MiCard from "@Utils/MiCard";

class ItemApp extends React.Component {
  static defaultProps = {
    titulo: "Sin titulo",
    icono: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const { classes, titulo, icono } = this.props;

    return (
      <MiCard
        elevation={this.state.hover ? 8 : 2}
        className={classes.card}
        contentClassName={classes.content}
        onClick={this.props.onClick}
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}
      >
        <Avatar
          alt="Icono"
          src={icono}
          className={classNames(classes.icono, classes.bigAvatar)}
        />

        <Typography
          className={classes.titulo}
          variant="headline"
          component="h2"
        >
          {titulo}
        </Typography>
      </MiCard>
    );
  }
}

const styles = theme => ({
  card: {
    transition: "all 0.3s"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  icono: {
    width: 72,
    height: 72,
    alignSelf: "center"
  },
  titulo: {
    alignSelf: "center"
  }
});

let componente = ItemApp;
componente = withStyles(styles)(componente);
export default componente;
