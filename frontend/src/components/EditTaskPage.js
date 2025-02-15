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
        <Grid2 xs={12}
          sx={{ width: "100%" }}
        >
          <form>
            <Grid2 sx={{ width: "100%"}}>
              <FormControl sx={{ width: '100%', marginBottom: '10px'}}>
                <TextField required={true}></TextField>
              </FormControl>
            </Grid2>
            <Grid2 sx={{ width: "100%", textAlign: 'center'}}>
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
