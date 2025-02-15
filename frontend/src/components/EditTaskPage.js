import {
  Typography,
  Grid2,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React, { Component } from "react";

function EditTaskPage() {

  const taskId = useParams();
  
  // function that checks if the task to be edited exists.
  const CheckIfTaskExits = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        id: taskId
      })
    }
  }

  return (
    <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
      <Grid2 sx={{ width: '100%'}} xs={12}>
        <form>
          <Grid2 sx={{ width: '100%'}}>
            <FormControl sx={{ width: '100%', marginBottom: "10px" }}>
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
