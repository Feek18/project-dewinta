import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.jsx";
import TableCol from "./components/fragments/TableCol.jsx";
import DashboardTable from "./components/pages/DashboardTable.jsx";
import DashboardServices from "./components/pages/DashboardServices.jsx";

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
    element: <DashboardTable />,
  },
  {
    path: "/dashboard-services",
    element: <DashboardServices />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>
);
