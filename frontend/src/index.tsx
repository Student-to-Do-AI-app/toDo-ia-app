import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import TasksPage from "./pages/TasksPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TasksPage />
    </Provider>
  </React.StrictMode>
);
