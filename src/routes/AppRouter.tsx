import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import App from "../App";
import Home from "../pages/Home";
import LoginForm from "../pages/Login/Login";
import { ConstantKeys } from "../constants/ConstantKeys.constants";
import Support from "../pages/Support";
import AboutUs from "../pages/AboutUs";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token =
    sessionStorage.getItem(ConstantKeys.accessToken) ||
    localStorage.getItem(ConstantKeys.accessToken);

  if (!token) {
    return <Navigate to={AppRoutes.login} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.testing,
        element: (
          <ProtectedRoute>
            <div>TESTING</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.organizations,
        element: (
          <ProtectedRoute>
            <div>ORGANIZATIONS</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.users,
        element: (
          <ProtectedRoute>
            <div>USERS</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.monitoring,
        element: (
          <ProtectedRoute>
            <div>MONITORING</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.systemConfiguration,
        element: (
          <ProtectedRoute>
            <div>SYSTEM CONFIGURATION</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.rules,
        element: (
          <ProtectedRoute>
            <div>RULES</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.events,
        element: (
          <ProtectedRoute>
            <div>EVENTS</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.analytics,
        element: (
          <ProtectedRoute>
            <div>ANALYTICS</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.myAccount,
        element: (
          <ProtectedRoute>
            <div>MY ACCOUNT</div>
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.aboutUs,
        element: (
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.support,
        element: (
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        ),
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
