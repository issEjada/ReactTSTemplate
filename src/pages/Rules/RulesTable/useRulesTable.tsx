import { useState, useEffect } from "react";
import type {
  GetScoringRulesInterface,
  GetScoringRulesItemInterface,
  RuleIdentifierInterface,
} from "../rulesServices";
import { scoringRulesService } from "../rulesServices";
import type { ViewRulesFormValues } from "../RulesFilter/useRulesFilter";

// 🟨 Format for table
const formatTableData = (
  data: GetScoringRulesInterface
): GetScoringRulesItemInterface[] => {
  return data.scoringRules?.map((item) => ({
    ...item, // Include all properties from the original item
    id: item.id,
    name: item.name,
    description: item.description,
    status: item.status,
    riskLevel: item.riskLevel,
    identifier: item.identifier, // Ensure identifier is included
    creationTimestamp: item.creationTimestamp,
    lastUpdatedTimestamp: item.lastUpdatedTimestamp,
  }));
};

export const useScoringRulesTable = () => {
  const [data, setData] = useState<GetScoringRulesItemInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<ViewRulesFormValues | undefined>(
    undefined
  );

  const handleSearchSubmit = (searchData: ViewRulesFormValues) => {
    const filteredData = Object.entries(searchData).reduce(
      (acc, [key, value]) => {
        if (typeof value === "string" && value.trim() !== "") {
          (acc as any)[key] = value;
          setCurrentPage(1);
        } else if (typeof value === "number" && value !== 0) {
          (acc as any)[key] = value;
          setCurrentPage(1);
        } else if (typeof value === "object" && value !== null) {
          // Filter nested identifier object
          const filteredIdentifier = Object.entries(value).reduce(
            (idAcc, [idKey, idValue]) => {
              if (
                idKey === "scoring_scheme" &&
                typeof idValue === "string" &&
                idValue.trim() !== ""
              ) {
                (idAcc as any)["scheme"] = idValue; // Move scoring_scheme to scheme
              } else if (typeof idValue === "string" && idValue.trim() !== "") {
                (idAcc as any)[idKey] = idValue;
              }
              return idAcc;
            },
            {} as Partial<RuleIdentifierInterface>
          );

          // Only set identifier if it has values
          if (Object.keys(filteredIdentifier).length > 0) {
            (acc as any)[key] = filteredIdentifier;
            setCurrentPage(1);
          }
        }

        return acc;
      },
      {} as ViewRulesFormValues
    );
    setFilters(filteredData);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await scoringRulesService.getScoringRulesList({
        page: currentPage,
        maxPageSize: itemsPerPage,
        ...filters,
      });
      setData(formatTableData(result.data));
      setTotalCount(result.data.meta?.totalItems || 0);
    } catch (err: unknown) {
      console.error("Failed to fetch scoring rules:", err);
      setError("Error loading rules");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRule = async (id: number) => {
    try {
      await scoringRulesService.deleteRuleById(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, filters]);

  return {
    data,
    isLoading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    filters,
    setFilters,
    refetch: fetchData,
    deleteRule,
    handleSearchSubmit,
  };
};
