import { useEventFilterForm } from "./useEventFilterForm";
import type { EventFormValues } from "../eventsServices";
import {
  DynamicFilterForm,
  type FilterField,
} from "../../../components/Filter/DynamicFilter";

interface EventsFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: EventFormValues) => void;
  filterData?: EventFormValues | undefined;
}

export const EventFilterForm = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}: EventsFilterFormProps) => {
  const {
    onSubmit,
    handleClear,
    control,
    schemeValues,
    statusValues,
    eventSourceDeviceValues,
  } = useEventFilterForm({ closeDrawer, handleSearchSubmit, filterData });

  // 👇 Build fields dynamically using FilterField type
  const fields: FilterField<EventFormValues>[] = [
    {
      type: "text",
      name: "name",
      label: "Event Name",
      placeholder: "Enter Event Name",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      placeholder: "Type Description",
    },
    {
      type: "text",
      name: "code",
      label: "Event Code",
      placeholder: "Enter Event Code",
    },
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      options: statusValues.map((item) => ({
        key: item.key,
        node: item.valueEn,
      })),
    },
    {
      type: "dropdown",
      name: "identifier.eventSourceDevice",
      label: "Event Source Device",
      options: eventSourceDeviceValues.map((item) => ({
        key: item.key,
        node: item.valueEn,
      })),
    },
    {
      type: "dropdown",
      name: "identifier.scheme",
      label: "Scheme",
      options: schemeValues.map((item) => ({
        key: item.key,
        node: item.valueEn,
      })),
    },
    { type: "date", name: "fromCreationTimestamp", label: "Date From" },
    { type: "date", name: "toCreationTimestamp", label: "Date To" },
  ];

  return (
    <DynamicFilterForm<EventFormValues>
      title="Filter Events"
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

export default EventFilterForm;
