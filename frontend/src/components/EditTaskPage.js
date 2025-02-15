import { Typography, Grid2, FormControl, TextField, Button } from "@mui/material";
import React, { Component } from "react";

export default class EditTaskPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid2 container spacing={1} direction={"column"}>
        <Grid2>
          <form>
            <FormControl>
              <TextField required={true}></TextField>
            </FormControl>
            <Button type="submit" variant="disabled" color="primary">
              Update
            </Button>
          </form>
        </Grid2>
      </Grid2>
    );
  }
}
