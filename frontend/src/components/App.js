import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./Homepage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Testing React Code</h1>
        )
    }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />, appDiv);
