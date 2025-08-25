import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type {
  DropDownCategory,
  DropDownValue,
  DropDownsAttributes,
  DropDownsPayload,
} from "../../../services/dropdownServices";
import { getDropDownsValue } from "../../../services/dropdownServices";

import type { EventFormValues } from "../eventsServices";
import { formatFromTime, formatToTime } from "../../../utils/helpers";

interface useEventFilterFormProps {
  handleSearchSubmit: (searchData: EventFormValues) => void;
  closeDrawer: () => void;
  filterData: EventFormValues | undefined;
}
export const useEventFilterForm = ({
  closeDrawer,
  handleSearchSubmit,
  filterData,
}: useEventFilterFormProps) => {
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, seteventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);

  const defaultValues: EventFormValues = {
    id: 0,
    name: "",
    code: "",
    description: "",
    identifier: {
      eventSourceDevice: "",
      scheme: "",
    },
    status: "",
    creationTimestamp: "",
    lastUpdatedTimestamp: "",
    fromCreationTimestamp: "",
    toCreationTimestamp: "",
  };

  const { control, handleSubmit, formState, reset, watch } =
    useForm<EventFormValues>({
      mode: "onTouched",
      defaultValues: filterData ?? defaultValues,
    });

  const fetchDropDownsValues = async (attributes: DropDownsAttributes[]) => {
    const data: DropDownsPayload = {
      code: "event_identifier",
      attributes,
    };
    await getDropDownsValue(data)
      .then((value) => {
        const dropDownValues = value.values as DropDownCategory[];
        const schemeCategory = dropDownValues.find(
          (item) => item.code === "scheme"
        );
        const eventSourceDeviceCategory = dropDownValues.find(
          (item) => item.code === "event_source_device"
        );

        setSchemeValues(schemeCategory ? schemeCategory.values : []);
        seteventSourceDeviceValues(
          eventSourceDeviceCategory ? eventSourceDeviceCategory.values : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStatus = async () => {
    await getDropDownsValue({
      code: "scoring_rule_status",
      attributes: [],
    })
      .then((value) => {
        if ("values" in value) {
          const category = value as DropDownCategory;
          setStatusValues(category.values);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStatus();
    fetchDropDownsValues([]);
  }, []);

  const onSubmit = (data: EventFormValues) => {
    data.fromCreationTimestamp = data.fromCreationTimestamp
      ? formatFromTime(data.fromCreationTimestamp)
      : "";
    data.toCreationTimestamp = data.toCreationTimestamp
      ? formatToTime(data.toCreationTimestamp)
      : "";

    handleSearchSubmit(data);
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer();
  };

  const handleClear = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset(defaultValues);
    closeDrawer();
    handleSearchSubmit(defaultValues);
  };

  return {
    control,
    formState,
    handleCancel,
    handleClear,
    onSubmit: handleSubmit(onSubmit),
    watch,
    schemeValues,
    eventSourceDeviceValues,
    statusValues,
  };
};
