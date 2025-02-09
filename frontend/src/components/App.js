import React from "react";
import { createRoot } from "react-dom/client";
import { Box } from "@mui/material";
import Homepage from "./Homepage";

function App() {
  return (
    <Box
      className="center"
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Homepage />
    </Box>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
