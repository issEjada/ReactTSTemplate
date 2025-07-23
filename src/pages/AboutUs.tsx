import React from "react";
import AboutUsImg from "../assets/svg/aboutUsImg.svg?react";
const AboutUs: React.FC = () => {
  return (
    <section className="bg-white text-gray-800  py-3 md:px-6 dark:bg-black">
      <div className="max-w-6xl grid md:grid-cols-1 gap-12 items-end">
        <div className="flex">
          <div className="flex flex-col text-left w-[70%]">
            <p className="text-blue-700 font-semibold mb-2 dark:text-blue-500 ">
              Why we’re different
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              We bring honesty and transparency to anti-fraud services
              technology
            </h1>
            <blockquote className="italic text-lg text-gray-600 mb-6 dark:text-gray-50">
              "As fraudsters evolve, so must their hunters."
            </blockquote>
          </div>
          <button className="bg-blue-700 w-[125px] h-[48px] text-white px-5 py-3 rounded-[8px] ml-auto hover:bg-blue-800 transition duration-300">
            Contact Us
          </button>
        </div>
        <div className="flex">
          <div className="flex flex-col w-[50%] text-left">
            <p className="text-[18px] leading-relaxed mb-4 font-normal dark:text-gray-50">
              ALPHAS delivers the region’s first advanced anti-fraud platform
              engineered in Saudi Arabia. We arm governments, financial
              institutions, and enterprises with AI-driven defenses to combat
              evolving cyber threats—turning fraud prevention into a strategic
              advantage.
            </p>
            <div className="mr-[40px]">
              <h2 className="text-2xl font-bold mt-10 mb-4 dark:text-white">
                Why we’re better
              </h2>
              <p className="text-base text-gray-600 mb-4 dark:text-gray-50">
                Unlike reactive systems, our suite predicts, scores, and
                neutralizes threats in real-time:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-600 font-normal dark:text-gray-50">
                <li>
                  AI-Powered Vigilance: Behavioral pattern analysis, temporal
                  sequencing, and anomaly detection.
                </li>
                <li>
                  Zero-Trust Architecture: End-to-end encryption, app hardening,
                  and tamper-proof SDK integration.
                </li>
                <li>
                  Saudi-Hosted Sovereignty:All data resides in-Kingdom—complying
                  with NCA, SAMA, and Vision 2030.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <AboutUsImg className="w-full ml-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
