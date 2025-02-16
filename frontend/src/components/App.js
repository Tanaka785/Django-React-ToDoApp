import React from "react";
import { createRoot } from "react-dom/client";
import { Grid2 } from "@mui/material"; // Make sure you are using MUI v5
import Homepage from "./Homepage";

function App() {
  return (
    <Grid2
      container
      className="center"
      xs={12}
      sm={6}
      md={6}
      lg={6}
      xl={6}
      sx={{
        width: { xs: "100%", sm: "70%", md: "70%", lg: "55%" },
        height: { xs: "80%", sm: "70%", md: "70%", lg: "70%" },
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: "4px",
        boxShadow: "0px 0px 14px rgba(119, 136, 153, 0.5)",
        overflowY: "auto",
      }}
    >
      <Homepage />
    </Grid2>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
