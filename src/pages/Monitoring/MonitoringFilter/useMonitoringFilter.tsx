import { useEffect, useState } from "react";
import type {
  DropDownCategory,
  DropDownsPayload,
  DropDownsAttributes,
  DropDownValue,
} from "../../../services/dropdownServices";
import { getDropDownsValue } from "../../../services/dropdownServices";
import { useForm } from "react-hook-form";

export interface DecisionRulesIdentifier {
  eventSourceDevice: string;
  scheme: string;
}
export interface GetEventDropDownsPayload {
  identifier: DecisionRulesIdentifier;
  status: string | null;
}

export interface ViewSessionsFormValues {
  id?: number;
  sessionId?: string;
  deviceId?: string;
  channel?: string;
  industry?: string;
  ip?: string;
  country?: string;
  city?: string;
  status?: "VIEWED" | "NOT_VIEWED" | "";
  fromCreationTimestamp?: string;
  toCreationTimestamp?: string;
  scheme?: string;
  eventSourceDevice?: string;
  eventName?: string;
  customerIdentity?: string;
}

export const useMonitoringFilter = (
  closeDrawer: () => void,
  filterData: ViewSessionsFormValues | undefined,
  handleSearchSubmit: (searchData: ViewSessionsFormValues) => void
) => {
  const [channelValues, setChannelValues] = useState<DropDownValue[]>([]);
  const [eventSourceDeviceValues, setEventSourceDeviceValues] = useState<
    DropDownValue[]
  >([]);
  const [schemeValues, setSchemeValues] = useState<DropDownValue[]>([]);
  const [eventNameValues, setEventNameValues] = useState<DropDownValue[]>([]);
  const [countryValues, setCountryValues] = useState<DropDownValue[]>([]);
  const [cityValues, setCityValues] = useState<DropDownValue[]>([]);
  const [statusValues, setStatusValues] = useState<DropDownValue[]>([]);

  const defaultValues: ViewSessionsFormValues = {
    id: undefined,
    sessionId: undefined,
    deviceId: undefined,
    channel: undefined,
    industry: undefined,
    ip: undefined,
    country: undefined,
    city: undefined,
    status: undefined,
    fromCreationTimestamp: undefined,
    toCreationTimestamp: undefined,
    eventSourceDevice: undefined,
    eventName: undefined,
    scheme: undefined,
    customerIdentity: undefined,
  };

  const { control, handleSubmit, formState, reset, watch, setValue } =
    useForm<ViewSessionsFormValues>({
      mode: "onTouched",
      defaultValues: filterData ?? defaultValues,
    });

  const fetchDropDownsValues = async (attributes: DropDownsAttributes[]) => {
    const data: DropDownsPayload = {
      code: "user_sessions_filters",
      attributes,
    };
    await getDropDownsValue(data)
      .then((value) => {
        const dropDownValues = value.values as DropDownCategory[];

        const countryCategory = dropDownValues.find(
          (item) => item.code === "country"
        );

        const schemeCategory = dropDownValues.find(
          (item) => item.code === "scheme"
        );

        const cityCategory = dropDownValues.find(
          (item) => item.code === "city"
        );

        const channelCategory = dropDownValues.find(
          (item) => item.code === "channel"
        );

        const eventSourceDeviceCategory = dropDownValues.find(
          (item) => item.code === "event_source_device"
        );

        const statusCategory = dropDownValues.find(
          (item) => item.code === "user_session_status"
        );

        const eventNameCategory = dropDownValues.find(
          (item) => item.code === "user_session_platform"
        );

        setSchemeValues(schemeCategory ? schemeCategory.values : []);
        setCountryValues(countryCategory ? countryCategory.values : []);
        setEventSourceDeviceValues(
          eventSourceDeviceCategory ? eventSourceDeviceCategory.values : []
        );
        setCityValues(cityCategory ? cityCategory.values : []);
        setChannelValues(channelCategory ? channelCategory.values : []);
        setStatusValues(statusCategory ? statusCategory.values : []);
        setEventNameValues(eventNameCategory ? eventNameCategory.values : []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDropDownsValues([]);
  }, []);
  const cleanObject = <T extends object>(obj: T): Partial<T> => {
    const newObj: Partial<T> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (typeof value === "string" && value !== "") {
          newObj[key] = value;
        } else if (typeof value === "number" && value !== 0) {
          newObj[key] = value;
        } else if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          const cleanedSubObject = cleanObject(value as object);
          if (Object.keys(cleanedSubObject).length > 0) {
            newObj[key] = cleanedSubObject as T[Extract<keyof T, string>];
          }
        }
      }
    }
    return newObj;
  };

  const onSubmit = (data: ViewSessionsFormValues) => {
    const filteredData = cleanObject(data);
    handleSearchSubmit(filteredData as ViewSessionsFormValues);
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
    channelValues,
    eventSourceDeviceValues,
    schemeValues,
    eventNameValues,
    countryValues,
    cityValues,
    statusValues,
  };
};
