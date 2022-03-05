import React from "react";
import ReactDOM from "react-dom";
import "vazir-font/dist/Farsi-Digits/font-face-FD.css";
import "antd/dist/antd.css";
import "./index.css";
import StudentPanel from "./Containers/StudentPanel";

ReactDOM.render(
  <React.StrictMode>
    <StudentPanel />
  </React.StrictMode>,
  document.getElementById("root")
);
