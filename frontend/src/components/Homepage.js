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
      tasks: [],
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
    if (event.key === "Enter" || event.type === "click") {
      if (this.state.task.trim() !== "") {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.state.task,
          }),
        };
        fetch("/api/create-task", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } else {
        this.setState({
          error: "Task Required",
        });
      }
    }
  }

  // get all the tasks
  async componentDidMount() {
    alert();
  }

  renderHomepage() {
    return (
      <Grid2
        container
        direction={"column"}
        spacing={1}
        sx={{ width: "100%", height: "100%" }}
      >
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
                error={this.state.error}
                helperText={this.state.error}
                variant="outlined"
                value={this.state.task}
                sx={{ width: "100%" }}
                onChange={this.updateTask}
                onKeyDown={this.addNewTask}
              />
            </FormControl>
          </Grid2>
          <Grid2
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "54px", padding: "25px" }}
              onClick={this.addNewTask}
            >
              Add Task
            </Button>
          </Grid2>
        </Grid2>
        <Grid2 xs={12} align="center">
          {/* loop around all the tasks and display them, each inside its Grid item */}
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
