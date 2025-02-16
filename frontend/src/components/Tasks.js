import { Typography, Grid2, Checkbox, Button } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import * as utils from "./utils";

import { Link, useLocation } from "react-router-dom";

function Tasks() {
  const location = useLocation();
  const type = location.state?.type;
  const [state, setState] = useState({
    activeTitle: type,
    dullTitle: type === "Active" ? "Completed" : "Active",
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

  const updateHeading = () => {
    const temp = state.activeTitle;
    setState((prevState) => ({
      ...prevState,
      activeTitle: state.dullTitle,
      dullTitle: temp,
    }));
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
            <Typography variant="h6" component={Link} onClick={updateHeading}>
              {state.dullTitle}
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
    </Grid2>
  );
}

export default Tasks;
