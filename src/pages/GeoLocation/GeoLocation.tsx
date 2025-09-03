import React from "react";

const GeoLocation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white shadow-md hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0l-3 3m3-3l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-gray-600 text-sm">Click to upload</span>
        <span className="text-gray-400 text-xs">or drag and drop</span>
        <input id="file-upload" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default GeoLocation;
