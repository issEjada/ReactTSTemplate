import { useMemo } from "react";
import {
  DynamicTable,
  type CustomColumnDef,
} from "../../../components/DynamicTable";
import Spinner from "../../../components/Spinner";
import type { EventItem } from "../monitoringServices";
import { useMonitoringView } from "./useMonitoringView";

const MonitoringView = () => {
  const {
    data,
    isLoading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalCount,
    error,
  } = useMonitoringView();

  const date = new Date(data?.lastUpdatedTimestamp || "");
  const formattedDate = date.toLocaleDateString("en-GB");

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const trimmedTime = `${formattedTime.split(":")[0]}:${
    formattedTime.split(":")[1]
  }:00 ${formattedTime.split(" ")[1]}`;

  const columns: CustomColumnDef<EventItem>[] = [
    { accessorKey: "eventCode", header: "Event Code" },
    {
      accessorKey: "eventName",
      header: "Event Name",
      meta: { isSorted: true },
    },
    {
      accessorKey: "transactionId",
      header: "Transaction Id",
      meta: { isSorted: true },
    },
    { accessorKey: "transactionAmount", header: "Transaction Amount" },
    { accessorKey: "transactionCurrency", header: "Transaction Currency" },
    { accessorKey: "maskedCard", header: "Masked Card" },
    { accessorKey: "ip", header: "IP" },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "phoneNumber", header: "Phone Number" },
    { accessorKey: "riskScore", header: "Risk Score" },
  ];

  const eventsData: EventItem[] = useMemo(
    () =>
      data?.events.data?.map((item) => ({
        eventCode: item.eventCode,
        eventName: item.eventName,
        transactionId: item.transactionId,
        transactionAmount: item.transactionAmount,
        transactionCurrency: item.transactionCurrency,
        maskedCard: item.maskedCard,
        phoneNumber: item.phoneNumber,
        riskScore: item.riskScore,
        eventTimestamp: item.eventTimestamp,
        ip: item.ip,
        country: item.country,
        city: item.city,
      })) || [],
    [data]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen flex flex-col pt-6 px-2 sm:px-4 md:px-6 gap-2">
          <div className="w-full px-1 py-5">
            <h1 className="text-gray-900 text-lg md:text-xl font-medium leading-7 dark:text-white">
              Session Details
            </h1>
          </div>
          <div className="w-full rounded-xl border border-gray-200 shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A] p-4 sm:p-6 bg-white dark:bg-darkTheme dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Session ID
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.sessionId}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Device ID
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.deviceId}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Global ID
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.globalId}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Date & Time
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {formattedDate + " " + trimmedTime}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Channel
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.channel}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    IP Address
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.ip.join(", ")}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Country
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.country.join(", ")}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    City
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.city.join(", ")}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    ISP
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.isp.join(", ")}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    LAT, LONG
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.coordinates.join(", ")}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    Geohash
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.locationGeohash}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    User Plugins
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.userPlugins}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    WebGL Vendor/Renderer
                  </span>
                  <span
                    className={"text-base font-normal text-gray-500 leading-6"}
                  >
                    {data?.webGLVendor}, {data?.webGLRenderer}
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="min-h-[56px] flex flex-col gap-2">
                  <span className="text-base font-normal text-gray-900 leading-[24px] dark:text-white">
                    WebGL Fingerprint
                  </span>
                  <span
                    className={
                      "text-base font-normal text-gray-500 leading-6 break-all"
                    }
                  >
                    {data?.webGLFingerprint}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DynamicTable<EventItem>
            data={eventsData}
            isMonitoringTable
            columns={columns}
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            title="Events Data"
            error={error}
          />
        </div>
      )}
    </>
  );
};

export default MonitoringView;
