import {
  Typography,
  Grid2,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";

function EditTaskPage() {
  const params = useParams();
  const [state, setState] = useState({
    taskObject: null,
    error: "",
  });

  // rerenders the component everytime it receives a new task.
  useEffect(() => {
    fetch(`/api/get-task?id=${params.taskId}`).then((response) => {
      if (response.ok) {
        response = response.json().then((data) => {
          setState({
            ...state,
            taskObject: data,
          });
        });
      } else {
        response = response.json().then((data) => {
          setState({
            ...state,
            error: data,
          });
        });
      }
    });
  }, [params.taskId]);

  const updateTaskField = () => {
    alert();
  }
  
  if (state.error) {
    return (
      <Grid2
        container
        spacing={1}
        direction={"column"}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <Grid2
          xs={12}
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">Page Not Found.</Typography>
          <Typography variant="h6" component={Link} to="/">
            Home
          </Typography>
        </Grid2>
      </Grid2>
    );
  }

  return (
    <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
      <Grid2 sx={{ width: "100%" }} xs={12}>
        <form>
          <Grid2 sx={{ width: "100%" }}>
            <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
              <TextField
                required={true}
                variant="standard"
                defaultValue={state.taskObject}
                onChange={updateTaskField}
              ></TextField>
            </FormControl>
          </Grid2>
          <Grid2 sx={{ textAlign: "center" }}>
            <Button type="submit" variant="disabled" color="primary">
              Update
            </Button>
          </Grid2>
          <Grid2 sx={{ textDecoration: "none", textAlign: "center" }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              home
            </Typography>
          </Grid2>
        </form>
      </Grid2>
    </Grid2>
  );
}

export default EditTaskPage;
