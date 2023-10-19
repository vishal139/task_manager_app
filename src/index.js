import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import TaskProvider from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TaskProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </TaskProvider>
  </React.StrictMode>
);
