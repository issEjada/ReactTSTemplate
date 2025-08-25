import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { useViewDecisionRules } from "./useDecisionRuleForm";
import { LoadingState } from "../../../types/types";

const DecisionRulesView = () => {
  const navigate = useNavigate();
  const { ruleData, loadingState, setScreenAction } = useViewDecisionRules();

  const handleCancel = () => {
    navigate("/decision-rules");
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
    <div className="w-full min-h-screen flex flex-col pt-6 px-2 sm:px-4 md:px-6 gap-2">
      <div className="w-full px-1 py-5">
        <h1 className="text-[#181D27] text-lg md:text-xl font-medium leading-7 dark:text-white">
          Decision Rules Details
        </h1>
      </div>

      {/* Card */}
      <div className="w-full rounded-xl border border-[#E9EAEB] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A] p-4 sm:p-6 bg-white dark:bg-[#121418] dark:border-gray-800 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
          {/* Decision Rule Name */}
          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Decision Rule
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.name}
            </span>
          </div>
          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Criteria Name
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.criteriaName}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Event source device
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.identifier.eventSourceDevice}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Scheme
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.identifier.scheme}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Decision
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.decision}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Event name
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.eventName}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Status
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.status}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Description
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.description}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Creation date
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.creationTimestamp
                ? new Date(ruleData.creationTimestamp).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Creation time
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.creationTimestamp
                ? new Date(ruleData.creationTimestamp).toLocaleTimeString()
                : "N/A"}
            </span>
          </div>

          {/* Last Updated Timestamp */}
          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Last updated date
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.lastUpdatedTimestamp
                ? new Date(ruleData.lastUpdatedTimestamp).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          {/* Last Updated Time */}
          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Last updated time
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.lastUpdatedTimestamp
                ? new Date(ruleData.lastUpdatedTimestamp).toLocaleTimeString()
                : "N/A"}
            </span>
          </div>

          <div className="min-h-[56px] flex flex-col gap-2">
            <span className="text-base font-normal text-[#181D27] dark:text-white">
              Condition
            </span>
            <span className="text-base font-normal text-[#717680] break-all">
              {ruleData.condition}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          className="w-[75px] h-[44px] px-4 py-2 rounded-[8px] border border-gray-300 text-black bg-white hover:bg-gray-100 dark:bg-[#121418] dark:text-gray-300 dark:border-gray-700"
          onClick={handleCancel}
        >
          Back
        </button>
        <button
          className="w-[141px] h-[44px] px-4 py-2 rounded-[8px] bg-blue-700 text-white hover:bg-blue-700"
          onClick={handleEditClick}
        >
          Update rule
        </button>
      </div>
    </div>
  );
};

export default DecisionRulesView;
