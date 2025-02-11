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
  Checkbox,
} from "@mui/material";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      completed: on,
      error: "",
      tasks: [],
    };
    this.renderHomepage = this.renderHomepage.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.setCheckBoxState = this.setCheckBoxState.bind(this);
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
            this.setState({
              ...this.state,
              task: "",
            });
            {this.componentDidMount()}
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
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          {
            tasks: data,
          },
          () => {
            console.log(this.state.tasks);
          }
        );
      });
  }

  setCheckBoxState(event) {
    if (event.target.value === "on") {
      this.setState({
        ...this.state,
        completed: true
      })
    } else {
      this.setState({
        ...this.state,
        completed: false,
      });
    }
  }

  renderHomepage() {
    return (
      <Grid2
        container
        direction={"column"}
        spacing={1}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
        }}
      >
        <Grid2 xs={12} align="start">
          <Typography component={"h1"}>
            <b>TO-DO</b>
          </Typography>
        </Grid2>
        <Grid2
          container
          direction={"row"}
          sx={{ display: "flex", width: "100%" }}
        >
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
        <Grid2 xs={12} sx={{ width: "100%", display: "block" }}>
          {this.state.tasks.slice(0, 3).map((task, index) => (
            <Grid2
              container
              direction={"row"}
              key={task.id}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid",
                borderColor: "lightgray",
                boxShadow: "0px 2px 2px rgba(119, 136, 153, 0.5)",
                width: "98.5%",
                borderRadius: "5px",
              }}
            >
              <Grid2 xs={3} sx={{ width: "10%" }}>
                <Checkbox
                  checked={this.state.completed}
                  inputProps={{ "aria-label": "Mark task as completed" }}
                  onChange={this.setCheckBoxState}
                />
              </Grid2>
              <Grid2 xs={6} sx={{ width: "60%" }}>
                <Typography variant="h6">{task.title}</Typography>
              </Grid2>
              <Grid2
                sx={{ textAlign: "center", width: "30%", textAlign: "end" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    border: "none",
                    color: "red",
                    backgroundColor: "white",
                  }}
                >
                  DELETE
                </Button>
              </Grid2>
            </Grid2>
          ))}
          <Grid2 xs={12} sx={{ textAlign: "center" }}>
            <Typography component={Link} to="/tasks">
              View All Tasks
            </Typography>
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
