import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import {
  Typography,
  Button,
  Grid2,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
    };
    this.renderHomepage = this.renderHomepage.bind(this);
  }

  renderHomepage() {
    return (
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 xs={12} align="center">
          <Typography component={"h1"}>
            <b>TO-DO</b>
          </Typography>
        </Grid2>
        <Grid2 container direction={"row"}>
          <Grid2 xs={8}>
            <FormControl>
              <TextField
                required={true}
                label="Add New Task"
                value={this.state.task}
              />
            </FormControl>
          </Grid2>
          <Grid2 xs={4}>
            <Button variant="contained" color="primary">
              Add Task
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    );
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<this.renderHomepage />} />
        </Routes>
      </Router>
    );
  }
}
