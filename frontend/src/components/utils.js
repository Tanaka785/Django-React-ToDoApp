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

export function updateTask(task) {
  const taskStatus = task.completed;
  // update task through the backend.
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: parseInt(task.id),
      completed: taskStatus,
      title: task.title,
    }),
  };
  return fetch(`/api/update-task`, requestOptions)
    .then((response) => response.json())
    .then((result) => result);
}

export async function deleteTask(taskId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: parseInt(taskId),
    }),
  };
  return fetch(`/api/delete/${taskId}`, requestOptions)
    .then((response) => response.json())
    .then((data) => data);
}
