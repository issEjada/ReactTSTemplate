import { useEffect, useState } from "react";
import type {
  DecisionRulesFormValues,
  DeleteRuleByIdPayload,
  UpdateDecisionPayload,
} from "../decisionRulesServices";
import {
  DecisionRulesServices,
  type GetDecisionDataPayload,
  type GetDecisionRulesItem,
} from "../decisionRulesServices";
// import { formatTime } from "../../../helpers";

import { cleanObject } from "../../../utils/helpers";
import { LoadingState } from "../../../types/types";

export const useDecisionRulesTable = () => {
  const [data, setData] = useState<GetDecisionRulesItem[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<DecisionRulesFormValues | undefined>(
    undefined
  );
  const [loadingState, setloadingState] = useState<LoadingState>(
    LoadingState.Loading
  );

  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [totalListSize, setTotalListSize] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRuleId, setSelectedRuleId] = useState<number>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>("");

  const handleOpenDrawer = () => {
    setIsFilterOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterOpen(false);
  };

  const handleSearchSubmit = (searchData: DecisionRulesFormValues) => {
    const filteredData = cleanObject(searchData);
    setFilters(filteredData as DecisionRulesFormValues);
    setCurrentPage(1);
  };

  const fetchDecisionData = async () => {
    setloadingState(LoadingState.Loading);
    const data: GetDecisionDataPayload = {
      page: currentPage,
      maxPageSize: itemsPerPage,
      ...filters,
    };

    try {
      const value = await DecisionRulesServices.getDecisionData(data);
      const formattedDecision = value.data.decisionRules.map((dec) => ({
        ...dec,
        // creationTimestamp: formatTime(dec.creationTimestamp),
      }));
      setData(formattedDecision);
      setTotalListSize(
        value.meta?.totalPages ? value.meta.totalPages * itemsPerPage : 0
      );
      setTotalCount(value.meta?.totalItems || 0);
      setloadingState(LoadingState.Success);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(String(error));
      setloadingState(LoadingState.Error);
      setPopupType("errorModal");
      setPopupMessage(String(error));
      setIsPopupOpen(true);
    }
  };

  useEffect(() => {
    fetchDecisionData();
  }, [itemsPerPage, currentPage, filters]);

  const deleteDecisionRule = async (ruleId?: number) => {
    setloadingState(LoadingState.Loading);
    const data: DeleteRuleByIdPayload = {
      id: ruleId ?? 0,
    };
    return DecisionRulesServices.deleteDecisionRules(data)
      .then(() => {
        setloadingState(LoadingState.Success);
        setPopupType("successModal");
        setIsPopupOpen(true);
        setPopupMessage("The Decision Rule have been successfully deleted.");
      })
      .catch((error) => {
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error);
        setIsPopupOpen(true);
        throw error; // Re-throw the error to be caught by the caller
      });
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    setloadingState(LoadingState.Loading);
    const newStatus = currentStatus === "ENABLED" ? "DISABLED" : "ENABLED";
    const payload: UpdateDecisionPayload = {
      status: newStatus,
    };

    try {
      await DecisionRulesServices.updateDecisionRule(payload, id);
      await fetchDecisionData(); // Refetch data to update the table
      setloadingState(LoadingState.Success);
    } catch (err) {
      console.error("Failed to update decision rule status:", err);
      setError("Failed to update decision rule status.");
      setloadingState(LoadingState.Error);
    }
  };

  const onDeleteRule = async () => {
    try {
      setloadingState(LoadingState.Loading);
      await deleteDecisionRule(selectedRuleId);
      setIsPopupOpen(true);
      setPopupType("successModal");
      setPopupMessage("Decision rule deleted successfully");
      await fetchDecisionData(); // Use fetchDecisionData instead of refetch
      setloadingState(LoadingState.Success);
    } catch (error) {
      console.error("Error deleting decision rule:", error);
      setPopupType("errorModal");
      setPopupMessage("Failed to delete decision rule");
      setIsPopupOpen(true);
      setloadingState(LoadingState.Error);
    }
  };

  return {
    isFilterOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    filters,
    setFilters,
    handleSearchSubmit,
    totalListSize,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    loadingState,
    onDeleteRule,
    setSelectedRuleId,
    setIsPopupOpen,
    setPopupType,
    setPopupMessage,
    popupMessage,
    isPopupOpen,
    popupType,
    deleteDecisionRule,
    refetch: fetchDecisionData,
    totalCount,
    data,
    error,
    handleToggleStatus,
  };
};
