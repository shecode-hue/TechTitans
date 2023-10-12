import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import "cirrus-ui";

import { UserContextProvider } from "./context/user-context/UserContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  // </React.StrictMode>
);
