import React from "react";
import { withStyles } from "@material-ui/core/styles";

class Test1 extends React.PureComponent {

  render() {
    const { classes } = this.props;

    return (
    <div>
      <label>Test1</label>
    </div>
    );
  }
}

const styles = theme => ({

});

export default withStyles(styles)(Test1);
