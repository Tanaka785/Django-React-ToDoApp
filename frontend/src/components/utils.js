import React from "react";
import { Grid2, Button, Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// get tasks from api endpoint.
export async function getTasks() {
  return fetch("/api/tasks")
    .then((response) => response.json())
    .then((data) => data);
}

// arranges the tasks.
export function arrangeTasks(tasks) {
  return tasks.map((task, index) => (
    <Grid2
      container
      key={task.id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: "10px",
        borderBottom: "1px solid",
        borderColor: "whitesmoke",
        boxShadow: "0px 2px 2px rgba(119, 136, 153, 0.5)",
        width: "100%",
        borderRadius: "5px",
      }}
    >
      <Grid2>
        <Checkbox
          id={task.id}
          checked={task.completed}
          inputProps={{ "aria-label": "Mark task as completed" }}
          value={task.id}
          onChange={() => {}}
        />
      </Grid2>
      <Grid2 sx={{ flexWrap: "wrap", textAlign: "start" }}>
        <Typography className="task_id" variant="h6">
          {task.title}
        </Typography>
      </Grid2>
      <Grid2 sx={{ ml: "auto" }}>
        <Button variant="text" component={Link} to={`/tasks/${task.id}/edit`}>
          EDIT
        </Button>
        <Button variant="text" onClick={() => {}} sx={{ color: "red" }}>
          DELETE
        </Button>
      </Grid2>
    </Grid2>
  ));
}
