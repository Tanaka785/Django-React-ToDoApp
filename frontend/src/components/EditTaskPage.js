import {
  Typography,
  Grid2,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import React, { Component, useEffect, useState, useRef } from "react";

function EditTaskPage() {
  const params = useParams();
  const inputRef = useRef(null);

  const [state, setState] = useState({
    taskObject: null,
    error: "",
    taskTitle: "",
    buttonVariant: "disabled",
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

  useEffect(() => {
    if (inputRef.current && state.taskObject) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [state.taskObject]);

  const updateTaskField = (event) => {
    const buttonVariant =
      event.target.value.trim() !== "" ? "contained" : "disabled";
    setState({
      ...state,
      buttonVariant: buttonVariant,
      taskTitle: event.target.value,
    });
  };

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
              {state.taskObject ? (
                <TextField
                  required={true}
                  variant="standard"
                  inputRef={inputRef}
                  defaultValue={state.taskObject.title}
                  onChange={updateTaskField}
                ></TextField>
              ) : (
                <TextField
                  required={true}
                  variant="standard"
                  defaultValue=""
                  inputRef={inputRef}
                  onChange={updateTaskField}
                ></TextField>
              )}
            </FormControl>
          </Grid2>
          <Grid2 sx={{ textAlign: "center" }}>
            <Button
              id="update-button"
              type="submit"
              variant={state.buttonVariant}
              color="primary"
              onClick={() => {}}
            >
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
