import { useEffect, useState } from "react";
import type {
  DropDownCategory,
  DropDownsPayload,
  DropDownsAttributes,
  DropDownValue,
} from "../../../services/dropdownServices";
import { getDropDownsValue } from "../../../services/dropdownServices";
import { useForm } from "react-hook-form";
import {
  DecisionRulesServices,
  type DecisionRulesFormValues,
  type GetEventDropDownsPayload,
} from "../decisionRulesServices";
import {
  cleanObject,
  formatFromTime,
  formatToTime,
} from "../../../utils/helpers";

export const useDecisionRulesFilter = (
  closeDrawer: () => void,
  filterData: DecisionRulesFormValues | undefined,
  handleSearchSubmit: (searchData: DecisionRulesFormValues) => void
) => {
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);
  const [eventNameValues, setEventNameValues] = useState<DropDownValue[]>([]);
  const [decisionValues, setDecisionValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, seteventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);

  const defaultValues: DecisionRulesFormValues = {
    id: "",
    name: "",
    description: "",
    identifier: {
      eventSourceDevice: "",
      scheme: "",
    },
    eventName: "",
    criteriaName: "",
    condition: "",
    decision: "",
    status: "",
    fromCreationTimestamp: "",
    toCreationTimestamp: "",
  };

  const { control, handleSubmit, formState, reset, watch, getValues } =
    useForm<DecisionRulesFormValues>({
      mode: "onTouched",
      defaultValues: filterData ?? defaultValues,
    });

  const selectedScheme = watch("identifier.scheme");
  const selectedEventSource = watch("identifier.eventSourceDevice");
  const selectedStatus = watch("status");

  const fetchDropDownsValues = async (attributes: DropDownsAttributes[]) => {
    const data: DropDownsPayload = {
      code: "decision_rule_identifier",
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

  const fetchDecisionAndStatus = async () => {
    await getDropDownsValue({
      code: "decision",
      attributes: [],
    })
      .then((value) => {
        if ("values" in value) {
          const category = value as DropDownCategory;
          setDecisionValues(category.values);
        }
      })
      .catch((error) => {
        console.log(error);
      });

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

  const fetchEventDropDownsData = async () => {
    const data: GetEventDropDownsPayload = {
      identifier: {
        eventSourceDevice: getValues("identifier.eventSourceDevice"),
        scheme: getValues("identifier.scheme"),
      },

      status: selectedStatus || null,
    };
    await DecisionRulesServices.getEventDropDownsValue(data)
      .then((value) => {
        if ("values" in value) {
          const dropDownValues = value as DropDownCategory;
          setEventNameValues(dropDownValues.values);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDecisionAndStatus();
    fetchDropDownsValues([]);
  }, []);

  useEffect(() => {
    if (selectedEventSource && selectedScheme) {
      fetchEventDropDownsData();
    }
  }, [selectedEventSource, selectedScheme]);

  const onSubmit = (data: DecisionRulesFormValues) => {
    const filteredData = cleanObject(data);
    filteredData.fromCreationTimestamp = formatFromTime(
      filteredData.fromCreationTimestamp ?? ""
    );
    filteredData.toCreationTimestamp = formatToTime(
      filteredData.toCreationTimestamp ?? ""
    );
    handleSearchSubmit(filteredData as DecisionRulesFormValues);
    closeDrawer();
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    reset();
    closeDrawer(); // Ensure closeDrawer is called to update the isOpen state in the parent component
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
    decisionValues,
    statusValues,
    eventNameValues,
  };
};
