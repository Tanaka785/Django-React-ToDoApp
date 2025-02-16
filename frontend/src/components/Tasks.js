import { Typography, Grid2 } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import { getTasks } from "./utils";
import { Link } from "react-router-dom";

function Tasks() {
  const [state, setState] = useState({
    title: "Active",
  });
  return (
    <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
      <Grid2 xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4">{state.title}</Typography>
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
