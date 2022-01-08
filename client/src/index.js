import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const element = (
  <BrowserRouter>
    <div className="container">
      <App />
    </div>
  </BrowserRouter>
);

const container = document.getElementById("root");

ReactDOM.render(element, container);
