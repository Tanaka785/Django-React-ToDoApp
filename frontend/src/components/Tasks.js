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
          {state.title} Tasks
        </Typography>
        <Grid2
          sx={{
            // border: "1px dotted white",
            justifyContent: "space-between",
          }}
        >
          <Grid2>
            <Typography variant="h6" component={Link} to="/">
              Completed
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="h6" component={Link} to="/">
              Home
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 xs={12} sx={{ textAlign: "center" }}>
        {utils.arrangeTasks(state.tasks)}
      </Grid2>
      {/* <Grid2 xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6" component={Link} to="/">
          Home
        </Typography>
      </Grid2> */}
    </Grid2>
  );
}

export default Tasks;
