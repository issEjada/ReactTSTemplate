export const ConstantKeys = {
  accessToken: "accessToken",
  rememberMe: "rememberMe",
};

export const API = {
  scoringRules: "/scoring-rules-management/v1/scoring-rules/search",
  getRulesById: "/scoring-rules-management/v1/scoring-rules",
  getDropDownsValue: "/lov_management/v1/lov",
  getRuleParameter: "/rules-parameters/v1/scoring-rules-parameters",
  getHomeStatistics: "/homepage/v1/statistics",
  monitoring: "/user-sessions/v1/search",
  viewMonitoring: "/user-sessions/v1",
  statistics: "/user-sessions/v1/statistics",
  decisionRules: "/decision-rules-management/v1/decision-rules/search",
  getDecisionRuleById: "/decision-rules-management/v1/decision-rules",
  getDecisionParameter: "/rules-parameters/v1/decision-rules-parameters",
  getEventDropDownsValues: "/v1/events/lov",
  customerInsights: "/user-profile/v1/user-insights",
  actionAnalytics: "/user-profile/v1/actions-analytics",
  customerDevices: "/users/sdks/search",
  unBlockDevices: "/users/fpts",
  healthCheck:"/sdks/health-check-records",
};
