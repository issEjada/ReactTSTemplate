import { useForm } from "react-hook-form";
import { LoadingState } from "../../../types/types";
// import { formatTime } from "../../../helpers";
import { useEffect, useMemo, useState } from "react";
import type {
  DecisionRulesFormValues,
  CreateDecisionPayload,
  GetDecisionParametersPayload,
  GetDecisionRuleByIdResponse,
  GetEventDropDownsPayload,
  UpdateDecisionPayload,
} from "../decisionRulesServices";
import type {
  GetRuleByIdPayload,
  DeleteRuleByIdPayload,
} from "../../../types/types";
import {
  getDropDownsValue,
  type DropDownsAttributes,
  type DropDownsPayload,
  type DropDownValue,
  type DropDownCategory,
} from "../../../services/dropdownServices";
import type { GetRulesParameterResponse } from "../../ScoringRules/scoringRulesServices";
import { DecisionRulesServices } from "../decisionRulesServices";
import { useLocation } from "react-router-dom";
import { formatTime } from "../../../utils/helpers";

export const useViewDecisionRules = () => {
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);
  const [decisionValues, setDecisionValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, seteventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);
  const [eventNameValues, setEventNameValues] = useState<DropDownValue[]>([]);
  const [editorContent, setEditorContent] = useState<string>("");
  const [parametersData, setParameterData] = useState<
    GetRulesParameterResponse | undefined
  >();
  const [ruleData, setRuleData] = useState<GetDecisionRuleByIdResponse>();
  const [popupType, setPopupType] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>();

  const [loadingState, setloadingState] = useState<LoadingState>(
    LoadingState.Loading
  );

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

  const { control, handleSubmit, formState, reset, watch } =
    useForm<DecisionRulesFormValues>({
      mode: "onTouched",
      defaultValues: {
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
      },
    });

  const identifier = watch().identifier!;
  const filteredIdentifier = Object.fromEntries(
    Object.entries(identifier).map(([field, obj]) => [field, obj?.key ?? ""])
  );
  const selectedScheme =
    filteredIdentifier["scheme"] || watch("identifier.scheme");
  const selectedEventSource =
    filteredIdentifier["eventSourceDevice"] ||
    watch("identifier.eventSourceDevice");

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
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error.message);
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
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error.message);
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
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error.message);
      });
  };

  const fetchRuleData = async (id: number) => {
    setloadingState(LoadingState.Loading);
    const data: GetRuleByIdPayload = {
      id: id,
    };
    await DecisionRulesServices.getDecisionRulesById(data)
      .then((value) => {
        if (value.creationTimestamp) {
          value.creationTimestamp = formatTime(value.creationTimestamp);
        }
        if (value.lastUpdatedTimestamp) {
          value.lastUpdatedTimestamp = formatTime(value.lastUpdatedTimestamp);
        }
        setRuleData(value);
        setloadingState(LoadingState.Success);
      })
      .catch((error) => {
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error);
      });
  };

  const fetchParameterData = async () => {
    const data: GetDecisionParametersPayload = {
      identifier: {
        eventSourceDevice: selectedEventSource,
        scheme: selectedScheme,
      },
    };

    await DecisionRulesServices.getRulesParameters(data)
      .then((value) => {
        setParameterData(value);
      })
      .catch((error) => {
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error.message);
      });
  };

  const fetchEventDropDownsData = async () => {
    const data: GetEventDropDownsPayload = {
      identifier: {
        eventSourceDevice: selectedEventSource,
        scheme: selectedScheme,
      },
      status: "ENABLED",
    };
    await DecisionRulesServices.getEventDropDownsValue(data)
      .then((value) => {
        if ("values" in value) {
          const dropDownValues = value as DropDownCategory;
          setEventNameValues(dropDownValues.values);
        }
      })
      .catch((error) => {
        setEventNameValues([]);
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error.message);
      });
  };

  useEffect(() => {
    if (isViewing || isEditing) {
      fetchRuleData(id);
    }
    fetchDecisionAndStatus();
    fetchDropDownsValues([]);
  }, []);

  useEffect(() => {
    if (ruleData) {
      reset({
        ...ruleData,
        id: ruleData.id?.toString(),
      });
      setEditorContent(ruleData.condition);
    }
  }, [ruleData, reset]);

  useEffect(() => {
    if (selectedEventSource && selectedScheme && !isViewing) {
      fetchEventDropDownsData();
      fetchParameterData();
    }
  }, [selectedEventSource, selectedScheme, isViewing]);

  const onSubmit = (data: DecisionRulesFormValues) => {
    if (isAdding) {
      setloadingState(LoadingState.Loading);
      const {
        eventName,
        name,
        description,
        identifier,
        criteriaName,
        decision,
      } = data;
      const bodyData: CreateDecisionPayload = {
        name: name!,
        identifier: identifier!,
        eventCode: eventName!,
        criteriaName: criteriaName!,
        condition: editorContent,
        decision: decision!,
        description: description!,
      };

      DecisionRulesServices.createDecisionRule(bodyData)
        .then(() => {
          setPopupType("successModal");
          setPopupMessage(
            "The Decision Rule Details have been successfully Created."
          );
          setloadingState(LoadingState.Success);
        })
        .catch((error) => {
          setloadingState(LoadingState.Error);
          setPopupType("errorModal");
          setPopupMessage(error);
        });
    }

    if (isEditing) {
      setloadingState(LoadingState.Loading);
      const updateBody: UpdateDecisionPayload = {
        condition: editorContent,
        criteriaName: data.criteriaName!,
        decision: data.decision!,
        description: data.description!,
        eventCode: data.eventName!,
        name: data.name!,
        status: data.status?.toUpperCase() || "",
      };
      DecisionRulesServices.updateDecisionRule(updateBody, id)
        .then(() => {
          setloadingState(LoadingState.Success);
          setPopupType("successModal");
          setPopupMessage(
            "The Decision Rule Details have been successfully updated."
          );
        })
        .catch((error) => {
          setloadingState(LoadingState.Error);
          setPopupType("errorModal");
          setPopupMessage(error);
        });
    }
  };

  const deleteDecisionRule = async (ruleId?: number) => {
    setloadingState(LoadingState.Loading);
    const data: DeleteRuleByIdPayload = {
      id: ruleId ?? id,
    };
    return DecisionRulesServices.deleteDecisionRules(data)
      .then(() => {
        setloadingState(LoadingState.Success);
        setPopupType("successModal");

        setPopupMessage("The Decision Rule have been successfully deleted.");
      })
      .catch((error) => {
        setloadingState(LoadingState.Error);
        setPopupType("errorModal");
        setPopupMessage(error);
        throw error;
      });
  };

  const formValues = watch().identifier;
  const isFormValid = Boolean(
    formValues?.eventSourceDevice && formValues?.scheme
  );

  return {
    control,
    formState,
    onSubmit,
    schemeValues,
    statusValues,
    decisionValues,
    eventSourceDeviceValues,
    eventNameValues,
    editorContent,
    setEditorContent,
    parametersData,
    isAdding,
    isViewing,
    isEditing,
    setScreenAction,
    screenAction,
    deleteDecisionRule,
    popupType,
    popupMessage,
    setPopupType,
    loadingState,
    watch,
    formValues,
    isFormValid,
    handleSubmit,
    reset,
    ruleData,
  };
};
