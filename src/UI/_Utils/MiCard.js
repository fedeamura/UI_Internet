import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class MiCard extends React.PureComponent {
  render() {
    let { classes } = this.props;

    return (
      <Card
        {...this.props}
        className={classNames(classes.card, this.props.className)}
      >
        <CardContent
          className={classNames(classes.content, this.props.contentClassName)}
        >
          {this.props.children}
        </CardContent>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    borderRadius: "1rem"
    // transition: "all 0.3s"
  },
  content: {}
});

export default withStyles(styles)(MiCard);
