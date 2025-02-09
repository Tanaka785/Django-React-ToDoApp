import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.renderHomepage = this.renderHomepage.bind(this);
  }

  renderHomepage() {
    alert();
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<this.renderHomepage/>} />
        </Routes>
      </Router>
    );
  }
}
