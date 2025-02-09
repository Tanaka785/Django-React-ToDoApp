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
      error: "",
    };
    this.renderHomepage = this.renderHomepage.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  updateTask(e) {
    this.setState({
      ...this.state,
      task: e.target.value,
    });
  }

  addNewTask(event) {
    if (event.key === "Enter") {
      if (this.state.task === "") {
        // the task field is not empty.
      } else {
        // the task field is empty.
      }
    }
  }

  renderHomepage() {
    return (
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2 xs={12} align="center">
          <Typography component={"h1"}>
            <b>TO-DO</b>
          </Typography>
        </Grid2>
        <Grid2 container direction={"row"} sx={{ width: "100%" }}>
          <Grid2 xs={8} sx={{ width: "80%" }}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                required={true}
                label="Add New Task"
                value={this.state.task}
                sx={{ width: "100%" }}
                onChange={this.updateTask}
                onKeyPress={this.addNewTask}
              />
            </FormControl>
          </Grid2>
          <Grid2 xs={4} align="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "97%", padding: "14px" }}
              onClick={this.addNewTask}
            >
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
