import {
  DynamicFilterForm,
  type FilterField,
} from "../../../components/Filter/DynamicFilter";
import { useDecisionRulesFilter } from "./useDecisionRulesFilter";
import type { DecisionRulesFormValues } from "../decisionRulesServices";

interface DecisionFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: DecisionRulesFormValues) => void;
  filterData?: DecisionRulesFormValues;
}

export const DecisionRulesFilter = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}: DecisionFilterFormProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    schemeValues,
    statusValues,
    eventSourceDeviceValues,
    decisionValues,
    eventNameValues,
  } = useDecisionRulesFilter(closeDrawer, filterData, handleSearchSubmit);

  const fields: FilterField<DecisionRulesFormValues>[] = [
    {
      type: "text",
      name: "name",
      label: "Rule Name",
      placeholder: "Enter Rule Name",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      placeholder: "Type Description",
    },
    {
      type: "text",
      name: "criteriaName",
      label: "Criteria Name",
      placeholder: "Enter Criteria Name",
    },
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      options: statusValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "identifier.eventSourceDevice",
      label: "Event Source Device",
      options: eventSourceDeviceValues.map((i) => ({
        key: i.key,
        node: i.valueEn,
      })),
    },
    {
      type: "dropdown",
      name: "identifier.scheme",
      label: "Scheme",
      options: schemeValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "eventName",
      label: "Event Name",
      options: eventNameValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "decision",
      label: "Decision",
      options: decisionValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    { type: "date", name: "fromCreationTimestamp", label: "Date From" },
    { type: "date", name: "toCreationTimestamp", label: "Date To" },
  ];

  return (
    <DynamicFilterForm<DecisionRulesFormValues>
      title="Filter Decision Rules"
      isOpen={isOpen}
      closeDrawer={closeDrawer}
      handleClear={() => handleClear({ preventDefault: () => {} })}
      fields={fields}
      control={control}
      onSubmit={onSubmit}
    />
  );
};
