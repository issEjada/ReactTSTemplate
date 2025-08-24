import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import type {
  DropDownsPayload,
  DropDownCategory,
  DropDownsAttributes,
  DropDownValue,
} from "../../../services/dropdownServices";
import type { GetRuleByIdPayload } from "../../ScoringRules/scoringRulesServices";
import type {
  CreateEventPayload,
  UpdateEventPayload,
  EventFormValues,
} from "../eventsServices";
import { getDropDownsValue } from "../../../services/dropdownServices";
import { EventsServices } from "../eventsServices";
import { useLocation } from "react-router-dom";
import { LoadingState } from "../../../types/types";
// import { formatTime } from "../../../helpers";

export const useViewEvents = () => {
  const [loadingState, setloadingState] = useState<LoadingState>(
    LoadingState.Loading
  );
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, seteventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);
  const [eventData, setEventData] = useState<EventFormValues>();
  const [popupType, setPopupType] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>();

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

  const { control, handleSubmit, formState, reset } = useForm<EventFormValues>({
    mode: "onTouched",
    defaultValues: {
      id: 0,
      name: "",
      code: "",
      description: "",
      identifier: {
        eventSourceDevice: "",
        scheme: "",
      },
      status: "",
    },
  });

  const fetchDropDownsValues = async (attributes: DropDownsAttributes[]) => {
    setloadingState(LoadingState.Loading);
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
        setPopupType("errorModal");
        setPopupMessage(error);
        setloadingState(LoadingState.Error);
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
  };

  const fetchStatus = async () => {
    setloadingState(LoadingState.Loading);
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
        setPopupType("errorModal");
        setPopupMessage(error);
        setloadingState(LoadingState.Error);
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
  };

  const fetchEventData = async (id: number) => {
    setloadingState(LoadingState.Loading);
    const data: GetRuleByIdPayload = {
      id: id,
    };
    await EventsServices.getEventById(data)
      .then((value) => {
        // if (value.creationTimestamp) {
        //   value.creationTimestamp = formatTime(value.creationTimestamp);
        // }
        // if (value.lastUpdatedTimestamp) {
        //   value.lastUpdatedTimestamp = formatTime(value.lastUpdatedTimestamp);
        // }
        console.log("test Rule by Id", value);
        setEventData(value);
      })
      .catch((error) => {
        console.log("fetch rule Data", error);
        setPopupType("errorModal");
        setPopupMessage(error);
        setloadingState(LoadingState.Error);
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
  };

  useEffect(() => {
    if (isViewing || isEditing) {
      fetchEventData(id);
    }
    fetchStatus();
    fetchDropDownsValues([]);
  }, []);

  useEffect(() => {
    if (eventData) {
      reset(eventData);
    }
  }, [eventData, reset]);

  const onSubmit = (data: EventFormValues) => {
    if (isAdding) {
      setloadingState(LoadingState.Loading);
      const { ...restData } = data;
      const bodyData: CreateEventPayload = {
        ...restData,
      };

      EventsServices.createEvent(bodyData)
        .then(() => {
          setPopupType("successModal");
          setPopupMessage("The Event Details have been successfully Created.");
          setloadingState(LoadingState.Success);
        })
        .catch((error) => {
          setPopupType("errorModal");
          setPopupMessage(error);
          setloadingState(LoadingState.Error);
        })
        .finally(() => {});
    }

    if (isEditing) {
      setloadingState(LoadingState.Loading);
      const updateBody: UpdateEventPayload = {
        description: data.description,
        name: data.name,
        status: data.status?.toUpperCase(),
        identifier: data.identifier,
      };
      EventsServices.updateEvent(updateBody, id)
        .then(() => {
          setPopupType("successModal");
          setPopupMessage("The Event Details have been successfully updated.");
          setloadingState(LoadingState.Success);
        })
        .catch((error) => {
          console.log(error);
          setPopupType("errorModal");
          setPopupMessage(error);
          setloadingState(LoadingState.Error);
        })
        .finally(() => {});
    }
  };

  return {
    control,
    formState,
    onSubmit,
    handleSubmit,
    schemeValues,
    statusValues,
    eventSourceDeviceValues,
    isAdding,
    isViewing,
    isEditing,
    setScreenAction,
    screenAction,
    popupType,
    popupMessage,
    setPopupType,
    loadingState,
    eventData,
    reset,
  };
};
