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
  // DeleteIcon,
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
    this.setCheckBoxState = this.setCheckBoxState.bind(this);
    this.markTaskAsCompleted = this.markTaskAsCompleted.bind(this);
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
            this.setState(
              {
                ...this.state,
                task: "",
              },
              () => {
                this.componentDidMount();
              }
            );
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
            // console.log(this.state.tasks);
          }
        );
      });
  }

  setCheckBoxState(event) {
    const taskId = event.target.value;
    let updatedTasks = this.state.tasks;
    updatedTasks.forEach((task) => {
      if (task.id === parseInt(taskId)) {
        task.completed = event.target.checked;
        {
          this.markTaskAsCompleted(task);
        }
      }
    });
    this.setState({
      ...this.state,
      tasks: updatedTasks,
    });
  }

  markTaskAsCompleted(task) {
    if (task.completed === true) {
      // update task through the backend.
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: parseInt(task.id),
          completed: true,
          title: task.title,
        }),
      };
      fetch(`/api/update-task`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
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
        {/* container Grid for the TO-DO heading. */}
        <Grid2
          container
          spacing={1}
          sx={{ width: "100%", height: "auto" }}
          justifyContent={"center"}
        >
          <Grid2 xs={12}>
            <Typography component={"h1"}>
              <b>TO-DO</b>
            </Typography>
          </Grid2>
        </Grid2>

        {/* container Grid for the textfield and add task button. */}
        <Grid2
          container
          spacing={1}
          sx={{
            width: "100%",
            display: "flex",
            height: "auto",
            border: "1px solid blue",
          }}
        >
          <Grid2 xs={8} sx={{ width: "80%" }}>
            <FormControl sx={{ width: "100%", width: { xs: "100%" } }}>
              <TextField
                required={true}
                label="Add New Task"i
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
          <Grid2 xs={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "54px", width: "100%" }}
              onClick={this.addNewTask}
            >
              Add Task
            </Button>
          </Grid2>
        </Grid2>

        {/* container Grid for tasks. */}
        <Grid2 container spacing={1} sx={{ width: "100%", height: "auto" }}>
          {this.state.tasks.slice(0, 3).map((task, index) => (
            <Grid2
              container
              key={task.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid",
                borderColor: "whitesmoke",
                boxShadow: "0px 2px 2px rgba(119, 136, 153, 0.5)",
                width: "100%",
                borderRadius: "5px",
              }}
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                inputProps={{ "aria-label": "Mark task as completed" }}
                value={task.id}
                onChange={this.setCheckBoxState}
              />
              <Typography variant="h6">{task.title}</Typography>
              <Button
                variant="text"
                // startIcon={<DeleteIcon />}
                sx={{
                  color: "red",
                }}
              >
                DELETE
              </Button>
            </Grid2>
          ))}
          <Grid2 xs={12}>
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
