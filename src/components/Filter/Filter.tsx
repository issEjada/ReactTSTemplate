// File: Filter.tsx
import React from "react";
import { useState } from "react";
import FilterLayout from "./FilterLayout";
import LogicDropdown from "../DropDown";
import ToolTipQuestionMark from "../../assets/svg/ToolTipQuestionMark.svg";
const Filter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [status, setStatus] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [device, setDevice] = useState("");
  const [scheme, setScheme] = useState("");
  const [aspect, setAspect] = useState("");
  const [control, setControl] = useState("");
  const [platform, setPlatform] = useState("");

  return (
    <FilterLayout
      title="Filter Scoring Rules"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="flex flex-col justify-between h-full">
        <div className="relative flex flex-col mt-12">
          <label className="text-sm font-medium">Rule Name</label>
          <input
            type="text"
            placeholder="Enter Rule Name"
            className="w-[95%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm"
          />

          <div className="absolute top-[40px] left-[calc(95%-32px)] group">
            <img
              src={ToolTipQuestionMark}
              className="w-4 h-4 cursor-pointer"
              alt="Tooltip"
            />

            <div className="absolute  right-full w-32    bg-gray-800 text-white text-xs rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              Enter Rule Name.
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <input
            type="text"
            placeholder="Type Description"
            className="w-[95%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="flex gap-2">
          <LogicDropdown
            label="Status"
            options={["High", "Medium", "Low"]}
            value={status}
            onChange={(status) => setStatus(status)}
            widthclass="w-[47%]"
          />
          <LogicDropdown
            label="Risk Level"
            options={["90", "80", "70"]}
            value={riskLevel}
            onChange={(riskLevel) => {
              setRiskLevel(riskLevel);
            }}
            widthclass="w-[47%]"
          />
        </div>
        <LogicDropdown
          label="Event Source Device"
          options={["Option 1", "Option 2", "Option 3"]}
          value={device}
          onChange={(device) => {
            setDevice(device);
          }}
          widthclass="w-[95%]"
        />
        <LogicDropdown
          label="Scheme"
          options={["Option 1", "Option 2", "Option 3"]}
          value={scheme}
          onChange={(scheme) => {
            setScheme(scheme);
          }}
          widthclass="w-[95%]"
        />
        <LogicDropdown
          label="Aspect"
          options={["Option 1", "Option 2", "Option 3"]}
          value={aspect}
          onChange={(aspect) => {
            setAspect(aspect);
          }}
          widthclass="w-[95%]"
        />
        <LogicDropdown
          label="Control"
          options={["Option 1", "Option 2", "Option 3"]}
          value={control}
          onChange={(control) => {
            setControl(control);
          }}
          widthclass="w-[95%]"
        />
        <LogicDropdown
          label="Platform"
          options={["Option 1", "Option 2", "Option 3"]}
          value={platform}
          onChange={(platform) => {
            setPlatform(platform);
          }}
          widthclass="w-[95%]"
        />
        
        <div className="flex gap-4 mb-4">
          <div className="w-[47%]">
            <label className="text-sm font-medium">Date From</label>
            <input
              type="date"
              placeholder=" DD / MM / YY "
              className="w-full h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="w-[45.5%]">
            <label className="text-sm font-medium">Date To</label>
            <input
              type="date"
              className="w-full h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm"
              placeholder=" DD / MM / YY "
            />
          </div>
          
        </div>

        <div className="flex justify-end gap-2 mb-8 w-[95%]">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-primary-700 text-white text-sm px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="text-sm text-gray-700 hover:underline hover:bg-gray-100 border border-gray-200 rounded-md px-4 py-2"
          >
            Clear
          </button>
        </div>
      </form>
    </FilterLayout>
  );
};

export default Filter;
