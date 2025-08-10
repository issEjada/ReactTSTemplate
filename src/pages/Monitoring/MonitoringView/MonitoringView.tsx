import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { useMonitoringView } from "./useMonitoringView";

const MonitoringView = () => {
  const { data, isLoading } = useMonitoringView();

  console.log("data", data);

  return (
    <>
    {isLoading 
      ? <FullScreenSpinner/> 
      : 
    <div className="w-full min-h-screen flex flex-col pt-6 px-2 sm:px-4 md:px-6 gap-2">
      <div className="w-full px-1 py-5">
        <h1 className="text-[#181D27] text-lg md:text-xl font-medium leading-7 dark:text-white">
          Session Details
        </h1>
      </div>
      <div className="w-full rounded-xl border border-[#E9EAEB] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A] p-4 sm:p-6 bg-white dark:bg-[#121418] dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Session ID
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.sessionId}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Device ID
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.deviceId}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Global ID
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.globalId}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Date & Time
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.lastUpdatedTimestamp}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Channel
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.channel}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                IP Address
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.ip}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Country
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.country}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                City
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.city}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                ISP
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.isp}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                LAT, LONG
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.coordinates}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                Geohash
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.locationGeohash}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                User Plugins
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.userPlugins}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                WebGL Vendor/Renderer
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6"
                }
              >
                {data?.webGLVendor}, {data?.webGLRenderer}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base font-normal text-[#181D27] leading-[24px] dark:text-white">
                WebGL Fingerprint
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.webGLFingerprint}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default MonitoringView;
