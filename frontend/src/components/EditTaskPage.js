import {
  Typography,
  Grid2,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React, { Component } from "react";

export default class EditTaskPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid2 container spacing={1} direction={"column"} sx={{ width: "100%" }}>
        <Grid2 fullWidth xs={12}>
          <form>
            <Grid2 fullWidth>
              <FormControl fullWidth sx={{ marginBottom: "10px" }}>
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
}
