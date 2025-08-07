import React from "react";

import backgroundCircle from "../../../assets/svg/BackgroundCircle.svg";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/AppRoutes";

const PlusIcon = React.lazy(
  () => import("../../../assets/svg/plus.svg?react")
);
const ShieldIcon = React.lazy(
  () => import("../../../assets/svg/shieldG.svg?react")
);


const NoSessions = () => {

  const navigate = useNavigate();

  const handleAddNewSession = () => {
    // To be changed
    // navigate(AppRoutes.monitoringView);
  };


  return (
    <div className="w-full max-w-[1148px] mx-auto p-4 sm:p-6 bg-white rounded-[18px] flex flex-col">
 
      {/* Card (background fills whole card area!) */}
      <div className="
        flex items-center justify-center border border-[#E9EAEB] rounded-[18px] bg-white
        w-full relative
        min-h-[780px] sm:min-h-[780px] md:min-h-[780px] lg:min-h-[780px]
        p-4 sm:p-10
        overflow-hidden
      ">
        {/* SVG background fills/centers card */}
        <img
          src={backgroundCircle}
          alt=""
          className="
            absolute
            left-1/2 top-[28%]
            -translate-x-1/2 -translate-y-1/2
            w-[400px] sm:w-[400px] md:w-[400px] lg:w-[400px]
            h-[400px]
            pointer-events-none select-none
            z-0
          "
        />
        {/* Centered Content (same design, untouched) */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[352px] mb-[50px]">
          {/* Icon in rounded box */}
          <div className="flex items-center justify-center bg-white border border-[#D5D7DA] rounded-[16px] gap-[8px] p-[4px] mb-6 sm:w-[60px] sm:h-[60px]">
            <div className="flex items-center justify-center bg-white border border-black/10 rounded-[12px] sm:w-[52px] sm:h-[52px] p-[12px] shadow-[0px_1px_2px_0px_#0000001A,0px_3px_3px_0px_#00000017]">
              <ShieldIcon className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] text-gray" />
            </div>
          </div>
          {/* Title & Description */}
          <div className="flex flex-col items-center w-full gap-1 mt-[36px] sm:mt-[48px]">
            <span className="sm:text-[16px] leading-[22px] sm:leading-[24px] font-semibold text-gray-900 text-center">
              Start adding new sessions
            </span>
            <span className="sm:text-[14px] sm:leading-[20px] font-normal text-gray-600 text-center pt-[4px] w-[304px]">
              <h1>You don’t have any sessions yet.</h1>
              <p>Start monitoring by adding new sessions now.</p>
            </span>
          </div>
          {/* Button */}
          <button
            className="
              mt-[32px] sm:mt-[40px] bg-[#1637C4] border border-[#1637C4]
              text-white rounded-[8px] font-semibold flex items-center
              justify-center gap-2 w-full h-[38px] sm:h-[40px] text-sm font-inter shadow-sm
              hover:bg-[#002fa7] transition-colors
              text-[13px] sm:text-[14px]
            "
            onClick={handleAddNewSession}
          >
            <PlusIcon className="w-[11px] sm:w-[12px] h-[11px] sm:h-[12px]"/>
            Add New Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoSessions;