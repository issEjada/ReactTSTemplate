import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import App from "../App";
import LayoutWithSideBar from "../components/SideBar/LayoutWithSideBar";
export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithSideBar />,
    children: [
      {
        path: "",
        element: <div></div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.testing,
        element: <div>TESTING</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.organizations,
        element: <div>ORGANIZATIONS</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.users,
        element: <div>USERS</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.monitoring,
        element: <div>MONITORING</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.systemConfiguration,
        element: <div>SYSTEM CONFIGURATION</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.rules,
        element: <div>RULES</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.events,
        element: <div>EVENTS</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.analytics,
        element: <div>ANALYTICS</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.myAccount,
        element: <div>MY ACCOUNT</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.aboutUs,
        element: <div>ABOUT US</div>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.support,
        element: <div>SUPPORT</div>,
        errorElement: <></>,
      }
    ],
  },
  {
    path: AppRoutes.login,
    element: <App></App>,
    errorElement: <></>,
  },
]);
