import {
  DynamicFilterForm,
  type FilterField,
} from "../../../components/Filter/DynamicFilter";
import type { CustomerDevicesFilterData } from "../CustomerDevices/useCustomerDevices";
import { useForm } from "react-hook-form";

const OS_TYPES = [
  { key: "IOS", node: "iOS" },
  { key: "ANDROID", node: "Android" },
  { key: "WINDOWS", node: "Windows" },
  { key: "MACOS", node: "macOS" },
  { key: "LINUX", node: "Linux" },
  { key: "OTHER", node: "Other" },
];

interface CustomerFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: CustomerDevicesFilterData) => void;
  filterData?: CustomerDevicesFilterData;
}

const CustomerDevicesFilter: React.FC<CustomerFilterFormProps> = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}) => {
  const { control, reset, getValues } = useForm<CustomerDevicesFilterData>({
    defaultValues: {
      deviceUniqueId: filterData?.deviceUniqueId ?? "",
      deviceManufacturer: filterData?.deviceManufacturer ?? "",
      deviceModel: filterData?.deviceModel ?? "",
      osType: filterData?.osType ?? "",
      dateFrom: filterData?.dateFrom ?? "",
      dateTo: filterData?.dateTo ?? "",
    },
  });

  // dynamic field list
  const fields: FilterField<CustomerDevicesFilterData>[] = [
    {
      type: "text",
      name: "deviceUniqueId",
      label: "Device ID",
      placeholder: "Enter Device ID",
    },
    {
      type: "text",
      name: "deviceManufacturer",
      label: "Device Manufacturer",
      placeholder: "Enter deviceManufacturer",
    },
    {
      type: "text",
      name: "deviceModel",
      label: "Device Model",
      placeholder: "Enter deviceModel",
    },
    {
      type: "dropdown",
      name: "osType",
      label: "OS Type",
      options: OS_TYPES,
    },
    { type: "date", name: "dateFrom", label: "Date From" },
    { type: "date", name: "dateTo", label: "Date To" },
  ];

  const onSubmit = (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    const v = getValues();
    const cleaned: CustomerDevicesFilterData = {
      deviceUniqueId: v.deviceUniqueId?.trim() || undefined,
      deviceManufacturer: v.deviceManufacturer?.trim() || undefined,
      deviceModel: v.deviceModel?.trim() || undefined,
      osType: v.osType || undefined,
      dateFrom: v.dateFrom || undefined,
      dateTo: v.dateTo || undefined,
    };
    handleSearchSubmit(cleaned);
    closeDrawer();
  };

  const handleClear = () => {
    reset();
    handleSearchSubmit({});
  };

  return (
    <DynamicFilterForm<CustomerDevicesFilterData>
      title="Filter Customer Devices"
      isOpen={isOpen}
      closeDrawer={closeDrawer}
      handleClear={handleClear}
      fields={fields}
      control={control}
      onSubmit={onSubmit}
    />
  );
};

export default CustomerDevicesFilter;
