import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CustomizedTables, { RowData } from "./components/Table";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Views from "./components/View";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomizedTables />,
    },
    {
      path: "/details",
      element: <Views />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} fallbackElement={<CustomizedTables />} />
    </div>
  );
}

export default App;
