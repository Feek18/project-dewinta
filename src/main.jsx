import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.jsx";
import TableCol from "./components/fragments/TableCol.jsx";
import DashTable from "./components/pages/DashTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard-table",
    element: <DashTable />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>
);
