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
  cleanObject,
  formatFromTime,
  formatToTime,
} from "../../../utils/helpers";
import type { ViewScoringRulesFormValues } from "../scoringRulesServices";

export const useScoringRulesFilter = (
  closeDrawer: () => void,
  filterData: ViewScoringRulesFormValues | undefined,
  handleSearchSubmit: (searchData: ViewScoringRulesFormValues) => void
) => {
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [asapectValues, setAspectValues] = useState<DropDownValue[]>([]);
  const [controlValues, setControleValues] = useState<DropDownValue[]>([]);
  const [platfromValues, setPlatformValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);
  const [riskLevelValues, setRiskLevelValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, seteventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);

  const defaultValues: ViewScoringRulesFormValues = {
    id: 0,
    name: "",
    description: "",
    status: "",
    condition: "",
    riskLevel: "",
    identifier: {
      eventSourceDevice: "",
      scoring_scheme: "",
      aspectCode: "",
      controlCode: "",
      platform: "",
      scheme: "",
    },
    creationTimestamp: "",
    lastUpdatedTimestamp: "",
    fromCreationTimestamp: "",
    toCreationTimestamp: "",
  };

  const { control, handleSubmit, formState, reset, watch, setValue } =
    useForm<ViewScoringRulesFormValues>({
      mode: "onTouched",
      defaultValues: filterData ?? defaultValues,
    });

  const selectedScheme = watch("identifier.scheme");
  const selectedAspect = watch("identifier.aspectCode");

  const fetchDropDownsValues = async (attributes: DropDownsAttributes[]) => {
    const data: DropDownsPayload = {
      code: "scoring_rule_identifier",
      attributes,
    };
    await getDropDownsValue(data)
      .then((value) => {
        const dropDownValues = value.values as DropDownCategory[];

        const schemeCategory = dropDownValues.find(
          (item) => item.code === "scoring_scheme"
        );
        const platformCategory = dropDownValues.find(
          (item) => item.code === "platform"
        );
        const eventSourceDeviceCategory = dropDownValues.find(
          (item) => item.code === "event_source_device"
        );

        setSchemeValues(schemeCategory ? schemeCategory.values : []);
        setPlatformValues(platformCategory ? platformCategory.values : []);
        seteventSourceDeviceValues(
          eventSourceDeviceCategory ? eventSourceDeviceCategory.values : []
        );

        const aspectCategory = dropDownValues.find(
          (item) => item.code === "aspect"
        );
        setAspectValues(aspectCategory ? aspectCategory.values : []);

        const controlCategory = dropDownValues.find(
          (item) => item.code === "control"
        );
        setControleValues(controlCategory ? controlCategory.values : []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRiskLevelAndStatus = async () => {
    await getDropDownsValue({
      code: "risk_level",
      attributes: [],
    })
      .then((value) => {
        if ("values" in value) {
          const category = value as DropDownCategory;
          setRiskLevelValues(category.values);
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

  useEffect(() => {
    fetchRiskLevelAndStatus();
    fetchDropDownsValues([]);
  }, []);

  useEffect(() => {
    if (selectedScheme) {
      setAspectValues([]);
      setControleValues([]);

      fetchDropDownsValues([
        {
          key: "scoring_scheme",
          value: selectedScheme,
        },
      ]);
    }
  }, [selectedScheme]);

  useEffect(() => {
    if (selectedAspect) {
      setControleValues([]);
      fetchDropDownsValues([
        {
          key: "aspect",
          value: selectedAspect,
        },
      ]);
    }
  }, [selectedAspect]);

  const onSubmit = (data: ViewScoringRulesFormValues) => {
    const filteredData = cleanObject(data);
    filteredData.fromCreationTimestamp = formatFromTime(
      filteredData.fromCreationTimestamp ?? ""
    );
    filteredData.toCreationTimestamp = formatToTime(
      filteredData.toCreationTimestamp ?? ""
    );

    handleSearchSubmit(filteredData as ViewScoringRulesFormValues);
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
    setValue,
    schemeValues,
    eventSourceDeviceValues,
    riskLevelValues,
    asapectValues,
    controlValues,
    platfromValues,
    statusValues,
  };
};
