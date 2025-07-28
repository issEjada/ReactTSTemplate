import React from "react";

const EmailIcon = React.lazy(() => import("../assets/svg/mail.svg?react"));
const PhoneIcon = React.lazy(() => import("../assets/svg/phone.svg?react"));

const Support: React.FC = () => {
  return (
    <div className="max-w-[1184px] w-full flex flex-col gap-[48px] p-6">
      {/* Header */}
      <div className="flex flex-col gap-[20px] w-[768px]">
        <p className="text-[16px] leading-[24px] font-semibold text-blue-700 dark:text-blue-500">
          Get in touch with us
        </p>
        <h1 className="text-[36px] leading-[44px] font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
          We’re here to help!
        </h1>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row gap-[64px] w-[1144px]">
        {/* EMAIL Block */}
        <div className="flex flex-col gap-[16px] w-full md:w-[556px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[48px] h-[48px] rounded-[28px] border-[8px] border-blue-50 bg-blue-100 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
              {/* <img
                src={EmailIcon}
                alt="Email Icon"
                className="w-[20px] h-[16px]"
              /> */}
              <EmailIcon className="text-blue-700 dark:text-white" />
            </div>
            <p className="text-[20px] leading-[30px] font-semibold text-gray-900 dark:text-white">
              Email
            </p>
          </div>
          <p className="text-[16px] leading-[24px] text-[#535862] pl-[60px] dark:text-gray-300">
            Our friendly team is here to help.
          </p>
          <p className="text-[16px] leading-[24px] font-semibold text-blue-700 pl-[60px]">
            hi@alphas.com
          </p>
        </div>

        {/* PHONE Block */}
        <div className="flex flex-col gap-[16px] w-full md:w-[556px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[48px] h-[48px] rounded-[28px] border-[8px] border-blue-50 bg-blue-100 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
              <PhoneIcon className="text-blue-700 dark:text-white" />
            </div>
            <p className="text-[20px] leading-[30px] font-semibold text-gray-900 dark:text-white">
              Phone
            </p>
          </div>
          <p className="text-[16px] leading-[24px] text-[#535862] pl-[60px] dark:text-gray-300">
            Sun-Thu from 8am to 5pm.
          </p>
          <p className="text-[16px] leading-[24px] font-semibold text-blue-700 pl-[60px]">
            +965 - 503857499
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
