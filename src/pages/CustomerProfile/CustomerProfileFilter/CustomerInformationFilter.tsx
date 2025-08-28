import {
  DynamicFilterForm,
  type FilterField,
} from "../../../components/Filter/DynamicFilter";
import type { CustomerInsightsPayload } from "../customerProfileServices";
import { useForm } from "react-hook-form";

interface CustomerFilterFormProps {
  isOpen: boolean;
  closeDrawer: () => void;
  handleSearchSubmit: (searchData: CustomerInsightsPayload) => void;
  filterData?: CustomerInsightsPayload;
}

const CustomerInformationFilter: React.FC<CustomerFilterFormProps> = ({
  isOpen,
  closeDrawer,
  handleSearchSubmit,
  filterData,
}) => {
  const { control, reset, getValues } = useForm<CustomerInsightsPayload>({
    defaultValues: {
      userMobileNumber: filterData?.userMobileNumber ?? "",
      userId: filterData?.userId ?? "",
      clientUserId: filterData?.clientUserId ?? "",
    },
  });

  // 👇 Fields config
  const fields: FilterField<CustomerInsightsPayload>[] = [
    {
      type: "text",
      name: "userMobileNumber",
      label: "Mobile Number",
      placeholder: "Enter Mobile Number",
    },
    {
      type: "text",
      name: "userId",
      label: "User ID",
      placeholder: "Type User ID",
    },
    {
      type: "text",
      name: "clientUserId",
      label: "Client ID",
      placeholder: "Type Client ID",
    },
  ];

  const onSubmit = (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    const v = getValues();
    const cleaned: CustomerInsightsPayload = {
      userMobileNumber: v.userMobileNumber?.trim() || undefined,
      userId: v.userId?.trim() || undefined,
      clientUserId: v.clientUserId || undefined,
    };
    handleSearchSubmit(cleaned);
    closeDrawer();
  };

  const handleClear = () => {
    reset({ userMobileNumber: "", userId: "", clientUserId: "" });
    handleSearchSubmit({});
  };

  return (
    <DynamicFilterForm<CustomerInsightsPayload>
      title="Filter Customer Information"
      isOpen={isOpen}
      closeDrawer={closeDrawer}
      handleClear={handleClear}
      fields={fields}
      control={control}
      onSubmit={onSubmit}
    />
  );
};

export default CustomerInformationFilter;
