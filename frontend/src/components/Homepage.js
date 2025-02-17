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
  async deleteTask(taskId) {
    let data = await utils.deleteTask(taskId);
    this.componentDidMount();
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

  async updateTaskObject(task) {
    let data = await utils.updateTask(task);
    this.componentDidMount();
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
                sx={{ height: "54px", width: "100%", marginBottom: "5px" }}
                onClick={this.addNewTask}
              >
                Add Task
              </Button>
            </FormControl>
          </Grid2>
        </Grid2>

        {/* container Grid for tasks. */}
        <Grid2 container spacing={1} sx={{ width: "100%", height: "auto" }}>
          {this.state.activeTasks.slice(0, 3).map((task, index) => (
            <Grid2
              container
              key={task.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: "10px",
                borderBottom: "1px solid",
                borderColor: "whitesmoke",
                boxShadow: "0px 2px 2px rgba(119, 136, 153, 0.5)",
                width: "100%",
                borderRadius: "5px",
              }}
            >
              <Grid2>
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  inputProps={{ "aria-label": "Mark task as completed" }}
                  value={task.id}
                  onChange={this.setCheckBoxState}
                />
              </Grid2>
              <Grid2 sx={{ flexWrap: "wrap", textAlign: "start" }}>
                <Typography className="task_id" variant="h6">
                  {task.title}
                </Typography>
              </Grid2>
              <Grid2 sx={{ ml: "auto" }}>
                <Button
                  variant="text"
                  component={Link}
                  to={`/tasks/${task.id}/edit`}
                >
                  EDIT
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    this.deleteTask(task.id);
                  }}
                  sx={{ color: "red" }}
                >
                  DELETE
                </Button>
              </Grid2>
            </Grid2>
          ))}
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
