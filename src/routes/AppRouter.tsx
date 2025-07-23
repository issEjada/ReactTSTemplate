import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import App from "../App";
import Home from "../pages/Home";
import LoginForm from "../pages/Login/Login";
import AboutUs from "../pages/AboutUs";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        element: <AboutUs/>,
        errorElement: <></>,
      },
      {
        path: AppRoutes.support,
        element: <div>SUPPORT</div>,
        errorElement: <></>,
      },
    ],
  },
  {
    path: AppRoutes.login,
    element: <LoginForm />,
    errorElement: <></>,
  },
]);
