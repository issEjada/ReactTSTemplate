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
  const [data, setData] = useState<Value[]>();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loadingState, setloadingState] = useState<LoadingState>();
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupFields, setPopupFields] = useState<FieldConfig[]>([]);
  const [popupMode, setPopupMode] = useState<"add" | "update">("update");
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
        setError(err);
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
    console.log("handleConfirmDelete", itemToDelete);

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

  return {
    rowProps,
    data,
    attributes,
    loadingState,
    error,
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
    setIsPopupOpen
  };
};
