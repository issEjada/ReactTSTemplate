import React, { useState, type DragEvent, type ChangeEvent } from "react";
import {
  geoLocationServices,
  type GeoLocationFiles,
} from "./geoLocationServices";
import { LoadingState } from "../../types/types";
import PopupLayout from "../../components/Popup/PopupLayout";
import DynamicPopupJsx from "../../components/Popup/DynamicPopupJsx";
import Spinner from "../../components/Spinner";

const GeoLocation: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setloadingState] = useState<LoadingState>(
    LoadingState.Success
  );

  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".zip")) {
        setFile(droppedFile);
      } else {
        alert("Only ZIP files are allowed");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith(".zip")) {
        setFile(selectedFile);
      } else {
        alert("Only ZIP files are allowed");
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleUpload = () => {
    console.log(file);
    if (!file) return;
    uploadGeoLocationAPI();
  };

  const uploadGeoLocationAPI = async () => {
    setloadingState(LoadingState.Loading);
    const data: GeoLocationFiles = {
      geolite2Zip: file,
    };

    try {
      await geoLocationServices.uploadGeoLocationFile(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(String(error));
      setloadingState(LoadingState.Error);
      setPopupType("errorModal");
      setPopupMessage(String(error));
      setIsPopupOpen(true);
    } finally {
      setloadingState(LoadingState.Success);
    }
  };

  if (loadingState === LoadingState.Loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-sm dark:bg-black dark:border-gray-800 dark:text-white h-screen overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Please Upload Geolocation
      </h2>

      {/* Drag & Drop / Browse Area */}
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-full max-h-[50vh] border-2 border-dashed rounded-xl cursor-pointer transition
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white shadow-md hover:border-blue-500 hover:bg-blue-50"
          }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
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

        {file ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-600">{file.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove();
              }}
              className="text-red-500 hover:text-red-700 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <span className="text-gray-600 text-sm">
              Click or Drag to upload
            </span>
            <span className="text-gray-400 text-xs">ZIP files only</span>
          </>
        )}

        <span className="text-red-500">{error}</span>

        <input
          id="file-upload"
          type="file"
          // accept=".zip"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {/* Upload Button */}
      <div className="flex justify-end">
        {file && (
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Upload File
          </button>
        )}
      </div>

      {isPopupOpen && (
        <PopupLayout isOpen={isPopupOpen} className="w-[30%]">
          {popupType === "successModal" && (
            <DynamicPopupJsx
              title="Geo Location"
              isEditing
              onCancel={() => {
                setIsPopupOpen(false);
              }}
            />
          )}
          {popupType === "errorModal" && (
            <DynamicPopupJsx
              isError
              errorMessage={popupMessage}
              onCancel={() => setIsPopupOpen(false)}
            />
          )}
        </PopupLayout>
      )}
    </div>
  );
};

export default GeoLocation;
