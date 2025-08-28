import {
  useScoringRulesFilter,
  type ViewRulesFormValues,
} from "./useScoringRulesFilter";
import {
  DynamicFilterForm,
  type FilterField,
} from "../../../components/Filter/DynamicFilter";

export interface RulesFilterProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: ViewRulesFormValues) => void;
  filterData: ViewRulesFormValues | undefined;
}

export const ScoringRulesFilterForm = ({
  isOpen,
  closeDrawer,
  filterData,
  handleSearchSubmit,
}: RulesFilterProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    asapectValues,
    controlValues,
    platfromValues,
    riskLevelValues,
    schemeValues,
    statusValues,
    eventSourceDeviceValues,
  } = useScoringRulesFilter(closeDrawer, filterData, handleSearchSubmit);

  // 👇 Fields config
  const fields: FilterField<ViewRulesFormValues>[] = [
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
      type: "dropdown",
      name: "status",
      label: "Status",
      options: statusValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "riskLevel",
      label: "Risk Level",
      options: riskLevelValues.map((i) => ({ key: i.key, node: i.valueEn })),
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
      name: "identifier.aspectCode",
      label: "Aspect",
      options: asapectValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "identifier.controlCode",
      label: "Control",
      options: controlValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "identifier.platform",
      label: "Platform",
      options: platfromValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    { type: "date", name: "fromCreationTimestamp", label: "Date From" },
    { type: "date", name: "toCreationTimestamp", label: "Date To" },
  ];

  return (
    <DynamicFilterForm<ViewRulesFormValues>
      title="Filter Scoring Rules"
      isOpen={isOpen}
      closeDrawer={closeDrawer}
      handleClear={() => handleClear({ preventDefault: () => {} })}
      fields={fields}
      control={control}
      onSubmit={(e) => {
        e?.preventDefault();
        onSubmit();
        closeDrawer();
      }}
    />
  );
};

export default ScoringRulesFilterForm;
