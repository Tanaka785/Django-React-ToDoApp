import { Typography, Grid2, Checkbox, Button } from "@mui/material";
import React, { Component, act, useEffect, useState } from "react";
import * as utils from "./utils";

import { Link, useLocation } from "react-router-dom";

function Tasks() {
  const location = useLocation();
  const type = location.state?.type;
  // console.log(type);
  const [state, setState] = useState({
    activeTitle: type,
    dullTitle: type === "Active" ? "Completed" : "Active",
    tasks: [],
    error: "",
  });
  // console.log(state.type);

  const setCheckBoxState = (event) => {
    const taskId = event.target.value;
    let updatedTasks = state.tasks;
    updatedTasks.forEach((task) => {
      if (task.id === parseInt(taskId)) {
        task.completed = event.target.checked;
        utils.updateTask(task);
      }
    });
    setState({
      ...state,
      tasks: updatedTasks,
    });
  };

  const fetchTasks = async () => {
    try {
      const data = await utils.getTasks();
      const tasks = utils.filterTasks(data);
      // console.log(tasks);
      setState((prevState) => ({
        ...prevState,
        tasks:
          state.activeTitle === "Active"
            ? tasks.activeTasks
            : tasks.completedTasks,
      }));
      // console.log(data);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: "Error fetching tasks",
      }));
      console.error(error);
    }
  };
  // get the tasks, and update state.
  useEffect(() => {
    fetchTasks();
    // console.log(state.tasks);
  }, [state.tasks]);

  useEffect(() => {
    const tasks = utils.filterTasks(state.tasks);
    const activeTasks = tasks.activeTasks;
    const completedTasks = tasks.completedTasks;
    if (state.activeTitle === "Active") {
      setState((prevState) => ({
        ...prevState,
        tasks: activeTasks,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tasks: completedTasks,
      }));
    }
  }, []);

  const updateTasksList = (event) => {
    event.preventDefault();
    // Swap the titles without using useEffect here
    const tempTitle = state.activeTitle;
    const tasks = utils.filterTasks(state.tasks);
    setState((prevState) => ({
      ...prevState,
      activeTitle: prevState.dullTitle,
      dullTitle: tempTitle,
      tasks: tasks.activeTasks,
    }));
    fetchTasks();
  };

  return (
    <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
      <Grid2
        xs={12}
        sx={{
          backgroundColor: "primary.main",
          paddingLeft: "15px",
          paddingTop: "30px",
          paddingBottom: "30px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          {state.activeTitle} Tasks
        </Typography>
        <Grid2
          sx={{
            // border: "1px dotted white",
            justifyContent: "space-between",
          }}
        >
          <Grid2>
            <Typography
              variant="h6"
              component={Link}
              onClick={updateTasksList}
              className="links"
              sx={{ color: "black", textDecoration: "underline solid white" }}
            >
              {state.dullTitle}
            </Typography>
          </Grid2>
          <Grid2>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              className="links"
              sx={{
                color: "black",
                textDecoration: "underline solid white",
              }}
            >
              Home
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 xs={12} sx={{ textAlign: "center" }}>
        {state.tasks.map((task, index) => (
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
                onChange={setCheckBoxState}
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
              <Button variant="text" onClick={() => {}} sx={{ color: "red" }}>
                DELETE
              </Button>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default Tasks;
