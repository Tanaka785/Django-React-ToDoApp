import { Typography, Grid2 } from "@mui/material";
import React, { Component } from "react";

export default class EditTaskPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid2 container spacing={1} direction={"column"}>
        <Grid2>
          <Typography>Edit Task</Typography>
        </Grid2>
      </Grid2>
    );
  }
}
