import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./Homepage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center" style={{ border: '1px solid blue'}}>
        <Homepage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />, appDiv);
