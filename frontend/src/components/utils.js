import React from "react";
import { Grid2, Button, Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// get tasks from api endpoint.
export async function getTasks() {
  return fetch("/api/tasks")
    .then((response) => response.json())
    .then((data) => data);
}

export function filterTasks(tasks) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  return { activeTasks, completedTasks };
}

export function deleteTask(task) {
  confirm("We are here now!");
}

export function updateTask(task) {
  if (task.completed === true) {
    // update task through the backend.
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(task.id),
        completed: true,
        title: task.title,
      }),
    };
    return fetch(`/api/update-task`, requestOptions)
      .then((response) => response.json())
      .then((result) => result);
  }
}
