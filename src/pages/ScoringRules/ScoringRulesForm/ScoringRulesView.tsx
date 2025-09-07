import { useNavigate } from "react-router-dom";
import useViewScoringRules from "./useScoringRuleForm";
import { LoadingState } from "../../../types/types";
import DynamicView from "../../../components/DynamicView";
import Spinner from "../../../components/Spinner";

const ScoringRuleView = () => {
  const navigate = useNavigate();
  const { ruleData, loadingState, setScreenAction } = useViewScoringRules();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    setScreenAction("edit");
    navigate("/scoring-rules/edit-rule", {
      state: { id: ruleData?.id, action: "edit" },
    });
  };

  if (loadingState === LoadingState.Loading) {
    return <Spinner />;
  }

  return (
    <DynamicView
      title="Scoring Rule details"
      fields={[
        { title: "Rule Name", value: ruleData?.name },
        { title: "Risk Level", value: ruleData?.riskLevel },
        { title: "Description", value: ruleData?.description },
        {
          title: "Event Source Device",
          value: ruleData?.identifier?.eventSourceDevice,
        },
        { title: "Scheme", value: ruleData?.identifier?.scheme },
        { title: "Aspect Code", value: ruleData?.identifier.aspectCode },
        { title: "Control", value: ruleData?.identifier.controlCode },
        { title: "Platform", value: ruleData?.identifier.platform },
        { title: "Status", value: ruleData?.status },
        // { title: "Creation Timestamp", value: ruleData?.creationTimestamp },
        // {
        //   title: "Last Updated Timestamp",
        //   value: ruleData?.lastUpdatedTimestamp,
        // },
        { title: "Condition", value: ruleData?.condition },
      ]}
      actions={[
        { label: "Back", onClick: () => handleCancel(), variant: "secondary" },
        { label: "Update Rule", onClick: handleEditClick, variant: "primary" },
      ]}
    />
  );
};

export default ScoringRuleView;
