import {
  Typography,
  Grid2,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { Component, useEffect, useState, useRef } from "react";

function EditTaskPage() {
  const params = useParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();

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

  const updateTaskObject = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: parseInt(state.taskObject.id),
          completed: false,
          title: state.taskTitle,
        }),
      };
      fetch(`/api/update-task`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // redirect user to homepage.
          navigate("/");
        });
    }
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
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                  onChange={updateTaskField}
                  onKeyDown={updateTaskObject}
                ></TextField>
              ) : (
                <TextField
                  required={true}
                  variant="standard"
                  defaultValue=""
                  inputRef={inputRef}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                  onChange={updateTaskField}
                  onKeyDown={updateTaskObject}
                ></TextField>
              )}
            </FormControl>
          </Grid2>
          <Grid2 sx={{ textAlign: "center" }}>
            <Button
              id="update-button"
              variant={state.buttonVariant}
              color="primary"
              onClick={updateTaskObject}
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
