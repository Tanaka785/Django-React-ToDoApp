import {
  Typography,
  Grid2,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";

function EditTaskPage() {
  const params = useParams();
  const [state, setState] = useState({
    task: null,
    error: "",
  });

  // rerenders the component everytime it receives a new task.
  useEffect(() => {
    fetch(`/api/get-task?id=${params.taskId}`).then((response) => {
      if (response.ok) {
        response = response.json().then((data) => {
          setState({
            ...state,
            task: data,
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

  return (
    <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
      <Grid2 sx={{ width: "100%" }} xs={12}>
        <form>
          <Grid2 sx={{ width: "100%" }}>
            <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
              <TextField required={true} variant="standard"></TextField>
            </FormControl>
          </Grid2>
          <Grid2 sx={{ textAlign: "center" }}>
            <Button type="submit" variant="disabled" color="primary">
              Update
            </Button>
          </Grid2>
        </form>
      </Grid2>
    </Grid2>
  );
}

export default EditTaskPage;
