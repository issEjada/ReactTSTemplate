import React from "react";
import { useNavigate } from "react-router-dom";
import AboutUsImg from "../assets/png/aboutUsImg.png";
import { AppRoutes } from "../routes/AppRoutes";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white text-gray-800 py-8 md:px-6 dark:bg-black">
      <div className="mx-auto grid gap-12">
        <div className="relative flex flex-col md:flex-row items-start w-full px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col text-left w-full md:w-4/5 lg:w-3/5">
            <p className="text-blue-700 font-semibold mb-2 dark:text-blue-500 text-sm sm:text-base">
              Why we’re different
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white leading-snug">
              We bring honesty and transparency to anti-
              <br />
              fraud services technology
            </h1>
            <blockquote className="italic text-lg sm:text-xl text-gray-600 mb-6 dark:text-gray-50">
              "As fraudsters evolve, so must their hunters."
            </blockquote>
          </div>

          <button
            className="hidden lg:block bg-blue-700 w-[125px] h-[48px] text-white px-5 py-3 rounded-[8px]
                       hover:bg-blue-800 transition duration-300 absolute top-0 right-6"
            onClick={() => navigate(AppRoutes.support)}
          >
            Contact Us
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center px-4 sm:px-6 lg:px-0 max-w-6xl">
          <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
            <p className="text-lg leading-relaxed mb-6 font-normal text-gray-600 dark:text-gray-50">
              ALPHAS delivers the region’s first advanced anti-fraud platform
              engineered in Saudi Arabia. We arm governments, financial
              institutions, and enterprises with AI-driven defenses to combat
              evolving cyber threats—turning fraud prevention into a strategic
              advantage.
            </p>
            <div>
              <h2 className="text-3xl font-bold mt-10 mb-5 dark:text-white">
                Why we’re better
              </h2>
              <p className="text-base w-full lg:w-[90%] text-gray-600 mb-4 dark:text-gray-50">
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
                  Saudi-Hosted Sovereignty: All data resides
                  in-Kingdom—compliant with NCA, SAMA, and Vision 2030.
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-6 lg:mt-0">
            <button
              className="block lg:hidden bg-blue-700 w-full sm:w-[125px] h-[48px] text-white mb-4 px-5 py-3 rounded-[8px]
                         hover:bg-blue-800 transition duration-300"
              onClick={() => navigate(AppRoutes.support)}
            >
              Contact Us
            </button>

            <img
              src={AboutUsImg}
              alt="cybersecurity illustration"
              className="w-full lg:w-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
