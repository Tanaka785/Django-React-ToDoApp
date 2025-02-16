export function getTasks() {
  return fetch("/api/tasks")
    .then((response) => response.json())
    .then((data) => data);
}
