import React, { Suspense } from "react";

const EmailIcon = React.lazy(() => import(`/src/assets/svg/mail.svg?react`));
const PhoneIcon = React.lazy(() => import(`/src/assets/svg/phone.svg?react`));

const Support: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full  flex flex-col gap-[48px] p-6">
        {/* Header */}
        <div className="flex flex-col gap-[20px] w-full xl:max-w-[768px]">
          <p className="text-[16px] leading-[24px] font-semibold text-blue-700 dark:text-blue-500">
            Get in touch with us
          </p>
          <h1 className="text-[36px] leading-[44px] font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
            We’re here to help!
          </h1>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col xl:flex-row gap-[64px] w-full">
          {/* EMAIL Block */}
          <div className="flex flex-col gap-[16px] w-full xl:w-[556px] min-w-0">
            <div className="flex items-center gap-[12px]">
              <div className="w-[48px] h-[48px] rounded-[28px] border-[8px] border-blue-50 bg-blue-100 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
                <Suspense>
                  <EmailIcon className="text-blue-700 dark:text-white" />
                </Suspense>
              </div>
              <p className="text-[20px] leading-[30px] font-semibold text-gray-900 dark:text-white">
                Email
              </p>
            </div>
            <p className="text-[16px] leading-[24px] text-blueGray-600 pl-[60px] dark:text-gray-300">
              Our friendly team is here to help.
            </p>
            <p className="text-[16px] leading-[24px] font-semibold text-blue-700 pl-[60px] dark:text-blue-500">
              hi@alphas.com
            </p>
          </div>

          {/* PHONE Block */}
          <div className="flex flex-col gap-[16px] w-full xl:w-[556px] min-w-0">
            <div className="flex items-center gap-[12px]">
              <div className="w-[48px] h-[48px] rounded-[28px] border-[8px] border-blue-50 bg-blue-100 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
                <Suspense>
                  <PhoneIcon className="text-blue-700 dark:text-white" />
                </Suspense>
              </div>
              <p className="text-[20px] leading-[30px] font-semibold text-gray-900 dark:text-white">
                Phone
              </p>
            </div>
            <p className="text-[16px] leading-[24px] text-blueGray-600 pl-[60px] dark:text-gray-300">
              Sun-Thu from 8am to 5pm.
            </p>
            <p className="text-[16px] leading-[24px] font-semibold text-blue-700 pl-[60px] dark:text-blue-500">
              +965 - 503857499
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
