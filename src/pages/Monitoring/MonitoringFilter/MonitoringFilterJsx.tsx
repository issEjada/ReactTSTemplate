import {
  useMonitoringFilter,
  type ViewSessionsFormValues,
} from "./useMonitoringFilter";
import {
  DynamicFilterForm,
  type FilterField,
} from "../../../components/Filter/DynamicFilter";

export interface SessionsFilterProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: ViewSessionsFormValues) => void;
  filterData: ViewSessionsFormValues | undefined;
}

export const MonitoringFilterForm = ({
  isOpen,
  closeDrawer,
  filterData,
  handleSearchSubmit,
}: SessionsFilterProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    channelValues,
    eventSourceDeviceValues,
    schemeValues,
    eventNameValues,
    countryValues,
    cityValues,
    statusValues,
  } = useMonitoringFilter(closeDrawer, filterData, handleSearchSubmit);

  // 👇 Build dynamic fields list
  const fields: FilterField<ViewSessionsFormValues>[] = [
    {
      type: "text",
      name: "sessionId",
      label: "Session ID",
      placeholder: "Enter Session ID",
    },
    {
      type: "text",
      name: "deviceId",
      label: "Device ID",
      placeholder: "Enter Device ID",
    },
    {
      type: "dropdown",
      name: "channel",
      label: "Channel",
      options: channelValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "text",
      name: "customerIdentity",
      label: "Identity",
      placeholder: "Enter Customer Identity",
    },
    {
      type: "dropdown",
      name: "eventSourceDevice",
      label: "Event Source Device",
      options: eventSourceDeviceValues.map((i) => ({
        key: i.key,
        node: i.valueEn,
      })),
    },
    {
      type: "dropdown",
      name: "scheme",
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
      name: "country",
      label: "Country",
      options: countryValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "city",
      label: "City",
      options: cityValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      options: statusValues.map((i) => ({ key: i.key, node: i.valueEn })),
    },
    {
      type: "text",
      name: "ip",
      label: "IP Address",
      placeholder: "Enter IP Address",
    },
    { type: "date", name: "fromDate", label: "Date From" },
    { type: "date", name: "toDate", label: "Date To" },
    { type: "time", name: "fromTime", label: "From Time" },
    { type: "time", name: "toTime", label: "To Time" },
  ];

  return (
    <DynamicFilterForm<ViewSessionsFormValues>
      title="Filter Monitoring Sessions"
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

export default MonitoringFilterForm;
