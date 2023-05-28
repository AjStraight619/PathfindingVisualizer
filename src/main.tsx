import React from "react";
import ReactDOM from "react-dom/client";
import PathFinding from "./Pathfinding/PathFinding";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PathFinding />
  </React.StrictMode>
);
