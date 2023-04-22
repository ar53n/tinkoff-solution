import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorPage from "./error-page";
import Add from "./routes/add";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: "myApp",
  version: 1.0,
  storeName: "finance", // Should be alphanumeric, with underscores.
  description: "some description",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Add />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
