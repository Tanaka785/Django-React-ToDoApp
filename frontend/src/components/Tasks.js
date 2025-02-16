import { Typography, Grid2 } from "@mui/material";
import React, { Component } from "react";

export default class Tasks extends Component {
  constructor(props) {
      super(props);
      this.state = {
          title: "Active",
      }
  }

  render() {
    return (
      <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
        <Grid2 xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">{this.state.title}</Typography>
        </Grid2>
      </Grid2>
    );
  }
}
