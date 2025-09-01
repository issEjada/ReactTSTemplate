import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { useViewDecisionRules } from "./useDecisionRuleForm";
import { LoadingState } from "../../../types/types";
import DynamicView from "../../../components/DynamicView";

const DecisionRulesView = () => {
  const navigate = useNavigate();
  const { ruleData, loadingState, setScreenAction } = useViewDecisionRules();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    setScreenAction("edit");
    navigate("/decision-rules/edit-rule", {
      state: { id: ruleData?.id, action: "edit" },
    });
  };

  if (loadingState === LoadingState.Loading) {
    return <FullScreenSpinner />;
  }

  if (loadingState === LoadingState.Error || !ruleData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Decision Rule not found or an error occurred.
        </p>
      </div>
    );
  }

  return (
    <DynamicView
      title="Decision Rule details"
      fields={[
        { title: "Rule Name", value: ruleData?.name },
        { title: "Criteria Name", value: ruleData?.criteriaName },
        {
          title: "Event Source Device",
          value: ruleData?.identifier?.eventSourceDevice,
        },
        { title: "Scheme", value: ruleData?.identifier?.scheme },
        { title: "Decision", value: ruleData?.decision },
        { title: "Event Name", value: ruleData?.eventName },
        { title: "Status", value: ruleData?.status },
        { title: "Description", value: ruleData?.description },
        { title: "Condition", value: ruleData?.condition },
      ]}
      actions={[
        { label: "Back", onClick: () => handleCancel(), variant: "secondary" },
        { label: "Update Rule", onClick: handleEditClick, variant: "primary" },
      ]}
    />
  );
};

export default DecisionRulesView;
