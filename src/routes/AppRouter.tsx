import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import App from "../App";
import Home from "../pages/Home";
import LoginForm from "../pages/Login";
import { ConstantKeys } from "../constants/ConstantKeys.constants";
import Support from "../pages/Support";
import AboutUs from "../pages/AboutUs";
import { ScoringRulesTable } from "../pages/ScoringRules/ScoringRulesTable/ScoringRulesTable";
import { MonitoringTable } from "../pages/Monitoring/MonitoringTable/MonitoringTable";
import MonitoringView from "../pages/Monitoring/MonitoringView/MonitoringView";
import RuleForm from "../pages/ScoringRules/ScoringRulesForm/ScoringRuleForm";
import { DecisionRulesTable } from "../pages/DecisionRules/DecisionRulesTable/DecisionRulesTable";
import DecisionRuleForm from "../pages/DecisionRules/DecisionRulesForm/DecisionRuleForm";

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
            <MonitoringTable />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.monitoringView,
        element: (
          <ProtectedRoute>
            <MonitoringView />
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
        path: AppRoutes.scoringRules,
        element: (
          <ProtectedRoute>
            <ScoringRulesTable />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.addScoringRule,
        element: (
          <ProtectedRoute>
            <RuleForm />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.viewScoringRule,
        element: (
          <ProtectedRoute>
            <RuleForm />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.editScoringRule,
        element: (
          <ProtectedRoute>
            <RuleForm />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.decisionRules,
        element: (
          <ProtectedRoute>
            <DecisionRulesTable />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.addDecisionRule,
        element: (
          <ProtectedRoute>
            <DecisionRuleForm />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.viewDecisionRule,
        element: (
          <ProtectedRoute>
            <DecisionRuleForm />
          </ProtectedRoute>
        ),
        errorElement: <></>,
      },
      {
        path: AppRoutes.editDecisionRule,
        element: (
          <ProtectedRoute>
            <DecisionRuleForm />
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
