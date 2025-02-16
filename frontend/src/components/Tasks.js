import { Typography, Grid2, Checkbox, Button } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import * as utils from "./utils";

import { Link } from "react-router-dom";

function Tasks() {
  const [state, setState] = useState({
    title: "Active",
    tasks: [],
    error: "",
  });

  // get the tasks, and update state.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await utils.getTasks();
        setState((prevState) => ({
          ...prevState,
          tasks: data,
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
    fetchTasks();
  }, []);

  return (
    <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
      <Grid2 xs={12} sx={{ backgroundColor: 'primary.main', padding: '10px'}}>
        <Typography variant="h4" sx={{ color: 'white'}}>{state.title} Tasks</Typography>
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
                onChange={() => {}}
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
      <Grid2 xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6" component={Link} to="/">
          Home
        </Typography>
      </Grid2>
    </Grid2>
  );
}

export default Tasks;
