import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import type { ViewRulesFormValues } from "../RulesFilter/useRulesFilter";
import type {
  DropDownCategory,
  DropDownValue,
} from "../../../services/dropdownServices";
import type {
  CreateRulesPayload,
  DeleteRuleByIdPayload,
  DropDownsAttributes,
  DropDownsPayload,
  GetRuleByIdPayload,
  // GetRulesParametersPayload,
  UpdateRulesPayload,
  GetRuleByIdResponse,
} from "../rulesServices";
import { useLocation } from "react-router-dom";
import { getDropDownsValue } from "../../../services/dropdownServices";
import { LoadingState } from "../../../types/types";
// GetRulesParameterResponse,
import ScoringRulesSdks from "../rulesServices";

function useViewScoringRules() {
  const [editorContent, setEditorContent] = useState("");
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [asapectValues, setAspectValues] = useState<DropDownValue[]>([]);
  const [controlValues, setControleValues] = useState<DropDownValue[]>([]);
  const [platfromValues, setPlatformValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);
  const [riskLevelValues, setRiskLevelValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, seteventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);
  const [ruleData, setRuleData] = useState<GetRuleByIdResponse>();
  //   const [parametersData, setParametersData] =
  //     useState<GetRulesParameterResponse>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [loadingState, setloadingState] = useState<LoadingState>(
    LoadingState.Loading
  );

  const ruleName = ruleData?.name;

  const location = useLocation();
  const { id, action } = location.state || {
    id: undefined,
    action: undefined,
  };

  const [screenAction, setScreenAction] = useState<string>(action);
  const isEditing = useMemo(
    () => !!id && screenAction === "edit",
    [id, screenAction]
  );
  const isViewing = useMemo(
    () => !!id && screenAction === "view",
    [id, screenAction]
  );
  const isAdding = useMemo(() => !id && !screenAction, [id, screenAction]);

  const { control, handleSubmit, formState, watch, setValue, reset } =
    useForm<ViewRulesFormValues>({
      mode: "onTouched",
      defaultValues: {
        id: 0,
        name: "",
        description: "",
        status: "",
        condition: "",
        riskLevel: "",
        identifier: {
          eventSourceDevice: "",
          scheme: "",
          aspectCode: "",
          controlCode: "",
          platform: "",
        },
        creationTimestamp: "",
        lastUpdatedTimestamp: "",
      },
    });

  const selectedScheme = watch("identifier.scheme");
  const selectedAspect = watch("identifier.aspectCode");
  const selectedControl = watch("identifier.controlCode");
  const selectedEventSource = watch("identifier.eventSourceDevice");
  const selectedPlatForm = watch("identifier.platform");

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
        if (selectedScheme) {
          const aspectCategory = dropDownValues.find(
            (item) => item.code === "aspect"
          );
          setAspectValues(aspectCategory ? aspectCategory.values : []);
        }
        if (selectedAspect) {
          const controlCategory = dropDownValues.find(
            (item) => item.code === "control"
          );
          setControleValues(controlCategory ? controlCategory.values : []);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRuleData = async (id: number) => {
    setloadingState(LoadingState.Loading);
    const data: GetRuleByIdPayload = {
      id: id,
    };
    await ScoringRulesSdks.getRulesById(data)
      .then((value) => {
        setloadingState(LoadingState.Success);
        console.log("test Rule by Id", value);
        setRuleData(value);
      })
      .catch((error) => {
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error);
        setIsPopupOpen(true);
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
  //   const fetchParameterData = async () => {
  //     const data: GetRulesParametersPayload = {
  //       identifier: watch().identifier,
  //     };

  //     await ScoringRulesSdks.getRulesParameters(data)
  //       .then((value) => {
  //         setParametersData(value);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  useEffect(() => {
    if (isViewing || isEditing) {
      fetchRuleData(id);
    }
    fetchRiskLevelAndStatus();
    fetchDropDownsValues([]);
  }, []);

  useEffect(() => {
    if (selectedEventSource) {
      setAspectValues([]);
      setControleValues([]);

      fetchDropDownsValues([
        {
          key: "event_source_device",
          value: selectedEventSource,
        },
      ]);
    }
  }, [selectedEventSource]);

  useEffect(() => {
    if (selectedEventSource && selectedScheme) {
      setAspectValues([]);
      setControleValues([]);

      fetchDropDownsValues([
        {
          key: "event_source_device",
          value: selectedEventSource,
        },
        {
          key: "scoring_scheme",
          value: selectedScheme,
        },
      ]);
    }
  }, [selectedScheme]);

  useEffect(() => {
    if (selectedEventSource && selectedScheme && selectedAspect) {
      setControleValues([]);
      fetchDropDownsValues([
        {
          key: "event_source_device",
          value: selectedEventSource,
        },
        {
          key: "scoring_scheme",
          value: selectedScheme,
        },
        {
          key: "aspect",
          value: selectedAspect,
        },
      ]);
    }
  }, [selectedAspect]);

  useEffect(() => {
    if (
      selectedEventSource &&
      selectedScheme &&
      selectedAspect &&
      selectedControl
    ) {
      setPlatformValues([]);
      fetchDropDownsValues([
        {
          key: "event_source_device",
          value: selectedEventSource,
        },
        {
          key: "scoring_scheme",
          value: selectedScheme,
        },
        {
          key: "aspect",
          value: selectedAspect,
        },
        {
          key: "control",
          value: selectedControl,
        },
      ]);
    }
  }, [selectedControl]);

  useEffect(() => {
    if (
      selectedControl &&
      selectedPlatForm &&
      selectedEventSource &&
      selectedScheme &&
      selectedAspect
    ) {
      //   fetchParameterData();
    }
  }, [
    selectedPlatForm,
    selectedEventSource,
    selectedScheme,
    selectedAspect,
    selectedControl,
  ]);

  useEffect(() => {
    if (ruleData) {
      reset(ruleData);
      setTimeout(() => {
        setValue(
          "identifier.controlCode",
          ruleData.identifier.controlCode || ""
        );
      }, 1);
      setEditorContent(ruleData.condition);
    }
  }, [ruleData, reset, setValue]);

  const onSubmit = (data: ViewRulesFormValues) => {
    if (isAdding) {
      setloadingState(LoadingState.Loading);
      const body: CreateRulesPayload = {
        name: data.name ?? "",
        description: data.description ?? "",
        identifier: {
          eventSourceDevice: data.identifier?.eventSourceDevice ?? "",
          scheme: data.identifier?.scheme ?? "",
          aspectCode: data.identifier?.aspectCode ?? "",
          controlCode: data.identifier?.controlCode ?? "",
          platform: data.identifier?.platform ?? "",
        },
        condition: editorContent,
        riskLevel: data.riskLevel ?? "",
      };
      ScoringRulesSdks.createRule(body)
        .then(() => {
          setloadingState(LoadingState.Success);
          setPopupType("successModal");
          setIsPopupOpen(true);
          setPopupMessage(
            "The Scoring Rule Details have been successfully Created."
          );
        })
        .catch((error) => {
          setloadingState(LoadingState.Error);
          setPopupType("errorModal");
          setPopupMessage(error);
          setIsPopupOpen(true);
          console.log(error);
        });
    }
    if (isEditing) {
      setloadingState(LoadingState.Loading);
      const updateBody: UpdateRulesPayload = {
        name: data.name ?? "",
        riskLevel: data.riskLevel ?? "",
        condition: editorContent,
        status: data.status?.toUpperCase() ?? "",
        description: data.description ?? "",
      };
      ScoringRulesSdks.updateRule(updateBody, id)
        .then(() => {
          setloadingState(LoadingState.Success);
          setPopupType("successModal");
          setIsPopupOpen(true);
          setPopupMessage(
            "The Scoring Rule Details have been successfully updated."
          );
        })
        .catch((error) => {
          setloadingState(LoadingState.Error);
          console.log(error);
          setPopupType("errorModal");
          setPopupMessage(error);
          setIsPopupOpen(true);
        });
    }
  };

  const deleteRule = async (ruleId?: number) => {
    setloadingState(LoadingState.Loading);
    const data: DeleteRuleByIdPayload = {
      id: ruleId ?? id,
    };
    await ScoringRulesSdks.deleteRulesById(data)
      .then(() => {
        setloadingState(LoadingState.Success);
        setPopupType("successModal");
        setIsPopupOpen(true);
        setPopupMessage(
          "The Scoring Rule Details have been successfully deleted."
        );
      })
      .catch((error) => {
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const formValues = watch().identifier;

  const isFormValid = Boolean(
    formValues?.eventSourceDevice &&
      formValues?.scheme &&
      formValues?.aspectCode &&
      formValues?.controlCode &&
      formValues?.platform
  );

  return {
    control,
    onSubmit,
    handleSubmit,
    formState,
    editorContent,
    setEditorContent,
    schemeValues,
    asapectValues,
    controlValues,
    platfromValues,
    statusValues,
    eventSourceDeviceValues,
    riskLevelValues,
    deleteRule,
    isAdding,
    // parametersData,
    isViewing,
    setScreenAction,
    isEditing,
    screenAction,
    isPopupOpen,
    reset,
    setIsPopupOpen,
    popupType,
    setPopupType,
    popupMessage,
    setPopupMessage,
    loadingState,
    watch,
    formValues,
    isFormValid,
    ruleName,
  };
}

export default useViewScoringRules;
