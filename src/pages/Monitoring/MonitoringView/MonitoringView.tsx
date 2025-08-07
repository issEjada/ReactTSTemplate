import { useMonitoringView } from "./useMonitoringView";

const MonitoringView = () => {
  const { data } = useMonitoringView();

  console.log("data", data);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8 px-2 sm:px-4 md:px-6 bg-[#F8F9FB]">
      <div className="w-full max-w-5xl mb-6 px-1">
        <h1 className="text-[#181D27] text-lg md:text-xl font-medium leading-7">
          Session Details
        </h1>
      </div>
      <div className="w-full max-w-5xl rounded-xl border border-[#E9EAEB] shadow-[0_1px_2px_0_#0A0D120F,0_1px_3px_0_#0A0D121A] p-4 sm:p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
                WebGL Vendor/Renderer
              </span>
              <span
                className={
                  "text-base font-normal text-[#717680] leading-6 break-all"
                }
              >
                {data?.webGLVendor}, {data?.webGLRenderer}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="min-h-[56px] flex flex-col gap-2">
              <span className="text-base md:text-lg font-medium text-[#181D27] leading-6">
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
  );
};

export default MonitoringView;
