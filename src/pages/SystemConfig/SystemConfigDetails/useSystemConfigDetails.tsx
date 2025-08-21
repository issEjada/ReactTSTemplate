import { useEffect, useState } from "react";
import { LoadingState } from "../../../types/types";
import {
  SystemConfigServices,
  type Attribute,
  type GetConfigurationDataPayload,
  type Value,
} from "../systemConfigService";
import { useLocation } from "react-router-dom";
import {
  getDropDownsValue,
  type DropDownCategory,
} from "../../../services/dropdownServices";

export interface FieldConfig {
  id?: string | number;
  label: string;
  key: string;
  value: string | number;
  hasLov?: boolean;
  options?: { key: string; node: string }[];
  disabled?: boolean;
}

export const useSystemConfigDetails = () => {
  const [dropDownOptions, setDropDownOptions] = useState<
    { key: string; node: string }[]
  >([]);
  const [data, setData] = useState<Value[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loadingState, setloadingState] = useState<LoadingState>();
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);
  const [isScoringPopupOPen, setIsScoringPopupOpen] = useState<boolean>(false);
  const [popupFields, setPopupFields] = useState<FieldConfig[]>([]);
  const [popupMode, setPopupMode] = useState<"add" | "update" | "error">(
    "update"
  );
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const location = useLocation();
  const rowProps: {
    id: string;
    name: string;
    desc: string;
    allowAddRow: boolean;
  } = location.state;
  const [configDesc, setConfigDesc] = useState<string>(rowProps.desc);

  const fetchData = async () => {
    setloadingState(LoadingState.Loading);
    setError(null);

    const data: GetConfigurationDataPayload = {
      page: currentPage,
      maxPageSize: itemsPerPage,
    };

    await SystemConfigServices.getConfigurationById(rowProps.id, data)
      .then((response) => {
        setAttributes(response.properties.attributes);
        setData(response.properties.values);
        setTotalCount(response.properties.meta.totalItems || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch system Configuration:", err);
        setloadingState(LoadingState.Error);
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
  };

  useEffect(() => {
    fetchData();
  }, [rowProps.id, itemsPerPage, currentPage]);

  const getDropDownOptions = async (attributeKey: string) => {
    try {
      const response = await getDropDownsValue({
        code: attributeKey.toLocaleLowerCase(),
      });
      const DropDownResponse = response as DropDownCategory;
      return DropDownResponse.values.map((item) => ({
        key: item.key,
        node: item.valueEn,
      }));
    } catch (error) {
      console.error("Error fetching country options:", error);
      return [];
    }
  };

  // Fetch DropDown options when attributes change and have data
  useEffect(() => {
    if (attributes.length > 0 && attributes[0]?.hasLov && attributes[0]?.key) {
      const fetchDropDownOptions = async () => {
        const options = await getDropDownOptions(attributes[0].key);
        setDropDownOptions(options);
      };
      fetchDropDownOptions();
    }
  }, [attributes]);

  // Handle Delete Actions
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setloadingState(LoadingState.Loading);
    setError(null);
    const payload = {
      description: configDesc,
      properties: {
        action: "Delete",
        values: [
          {
            id: itemToDelete,
          },
        ],
      },
    };

    await SystemConfigServices.updateConfiguration(rowProps.id, payload)
      .then(() => {
        fetchData();
        setIsDeletePopupOpen(false);
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting configuration:", error);
        setError(`${error}`);
        setPopupMode("error");
      })
      .finally(() => {
        setloadingState(LoadingState.Success);
      });
  };
  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  // Hanlde Add Actions
  const handleAddConfirm = () => {
    setPopupMode("add");
    setPopupFields(
      attributes.map((attr) => ({
        label: attr.name,
        key: attr.key,
        value: "",
        hasLov: attr.hasLov,
        options: attr.hasLov ? dropDownOptions : undefined,
        disabled: !attr.editable,
      }))
    );
    setIsPopupOpen(true);
  };

  // Handle Save
  const handleSave = async (formValues: Value | Value[]) => {
    const action = popupMode === "add" ? "Add" : "Update";

    // Prepare the value objects based on the mode
    let valueObjects: Array<Record<string, string | number | undefined>>;

    if (popupMode === "add") {
      // For add, create a new object with all values (converted to strings)
      valueObjects = [
        {
          ...Object.fromEntries(
            Object.entries(formValues).map(([key, val]) => [key, String(val)])
          ),
        },
      ];
    } else {
      // For update, check if popupFields has values
      if (popupFields.length > 0) {
        // If popupFields has values, use the ID from the first field
        valueObjects = [
          {
            id: popupFields[0].id,
            ...Object.fromEntries(
              Object.entries(formValues)
                .filter(([key]) => {
                  const attribute = attributes.find((attr) => attr.key === key);
                  return attribute?.editable;
                })
                .map(([key, val]) => [key, String(val)])
            ),
          },
        ];
      } else {
        // If popupFields is empty, use all existing IDs from the stored values (array)
        valueObjects = data.map((val: Value) => ({
          id: val.id,
          ...Object.fromEntries(
            Object.entries(val)
              .filter(([key]) => key !== "id")
              .filter(([key]) => {
                const attribute = attributes.find((attr) => attr.key === key);
                return attribute?.editable;
              })
              .map(([key, val]) => [key, String(val)])
          ),
        }));
      }
    }

    const payload = {
      description: configDesc,
      properties: {
        action,
        values: valueObjects,
      },
    };
    setloadingState(LoadingState.Loading);
    await SystemConfigServices.updateConfiguration(rowProps.id, payload)
      .then(() => {
        fetchData();
        setIsPopupOpen(false);
        setIsScoringPopupOpen(false);
        setIsSuccessPopupOpen(true);
      })
      .catch((error) => {
        setError(`${error}`);
        setPopupMode("error");
        setIsSuccessPopupOpen(true);
      })
      .finally(() => setloadingState(LoadingState.Success));
  };

  //handle update Description
  const handleDescriptionUpdate = async (newDescription: string) => {
    const payload = {
      description: newDescription,
    };
    setloadingState(LoadingState.Loading);
    await SystemConfigServices.updateConfiguration(rowProps.id, payload)
      .then(() => {
        setConfigDesc(newDescription);
        setPopupMode("update");
        setIsSuccessPopupOpen(true);
      })
      .catch(() => {
        setError(`${error}`);
        setPopupMode("error");
      })
      .finally(() => setloadingState(LoadingState.Success));
  };

  const handleUpdateScoring = () => {
    setIsScoringPopupOpen(true);
  };

  return {
    rowProps,
    data,
    attributes,
    loadingState,
    error,
    setError,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    refetch: fetchData,
    setIsDeletePopupOpen,
    isDeletePopupOpen,
    handleConfirmDelete,
    handleCancelDelete,
    setItemToDelete,
    configDesc,
    setConfigDesc,
    handleAddConfirm,
    isPopupOpen,
    popupFields,
    popupMode,
    setIsPopupOpen,
    setPopupMode,
    setPopupFields,
    handleSave,
    dropDownOptions,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    handleDescriptionUpdate,
    handleUpdateScoring,
    setData,
    setIsScoringPopupOpen,
    isScoringPopupOPen,
  };
};
