import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
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
import Tasks from "./Tasks";
import EditTaskPage from "./EditTaskPage";
import * as utils from "./utils";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      error: "",
      tasks: [],
      completedTasks: [],
      activeTasks: [],
    };
    this.renderHomepage = this.renderHomepage.bind(this);
    this.updateTaskFieldValue = this.updateTaskFieldValue.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.setCheckBoxState = this.setCheckBoxState.bind(this);
    this.updateTaskObject = this.updateTaskObject.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateTaskFieldValue(e) {
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

  // handles the deletion of a task.
  deleteTask(taskId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(taskId),
      }),
    };
    fetch(`/api/delete/${taskId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.componentDidMount();
      });
  }

  async componentDidMount() {
    let data = await utils.getTasks();
    const tasks = utils.filterTasks(data);
    const completedTasks = tasks.completedTasks;
    const activeTasks = tasks.activeTasks;
    this.setState({
      ...this.state,
      tasks: data,
      completedTasks,
      activeTasks,
    });
  }

  setCheckBoxState(event) {
    const taskId = event.target.value;
    let updatedTasks = this.state.tasks;
    updatedTasks.forEach((task) => {
      if (task.id === parseInt(taskId)) {
        task.completed = event.target.checked;
        {
          this.updateTaskObject(task);
        }
      }
    });
    this.setState({
      ...this.state,
      tasks: updatedTasks,
    });
  }

  updateTaskObject(task) {
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
          // console.log(result);
          this.componentDidMount();
        });
    }
  }

  renderHomepage() {
    const location = useLocation();

    useEffect(() => {
      this.componentDidMount();
    }, [location]);

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
            // border: "1px solid blue",
          }}
        >
          <Grid2 xs={8} sx={{ width: "100%" }}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                required={true}
                variant="standard"
                label="Add New Task"
                error={this.state.error}
                helperText={this.state.error}
                value={this.state.task}
                sx={{ width: "100%", marginBottom: "5px" }}
                onChange={this.updateTaskFieldValue}
                onKeyDown={this.addNewTask}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "54px", width: "100%" }}
                onClick={this.addNewTask}
              >
                Add Task
              </Button>
            </FormControl>
          </Grid2>
        </Grid2>

        {/* container Grid for tasks. */}
        <Grid2 container spacing={1} sx={{ width: "100%", height: "auto" }}>
          {utils.arrangeTasks(this.state.activeTasks)}
        </Grid2>

        {/* container containing the tasks link. */}
        <Grid2
          container
          spacing={1}
          sx={{
            width: "100%",
            height: "auto",
            justifyContent: "space-between",
          }}
        >
          <Grid2 xs={6}>
            <Typography
              component={Link}
              className="home-links"
              to="/tasks"
              sx={{ color: "primary.main" }}
              state={{ type: "Active" }}
            >
              View All
            </Typography>
          </Grid2>
          <Grid2 xs={6}>
            <Typography
              component={Link}
              className="home-links"
              to="/tasks"
              sx={{ color: "primary.main" }}
              state={{ type: "Completed" }}
            >
              completed
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
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:taskId/edit" element={<EditTaskPage />} />
        </Routes>
      </Router>
    );
  }
}
