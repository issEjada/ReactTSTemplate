import React, { useState } from "react";
import FilterLayout from "./FilterLayout";
import LogicDropdown from "../DropDown";
import ToolTipQuestionMark from "../../assets/svg/ToolTipQuestionMark.svg";
const Filter: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
}> = ({ isOpen, onClose, onApply }) => {
  const [ruleName, setRuleName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [device, setDevice] = useState("");
  const [scheme, setScheme] = useState("");
  const [aspect, setAspect] = useState("");
  const [control, setControl] = useState("");
  const [platform, setPlatform] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filters: Record<string, string> = {};

    if (ruleName) {
      filters.ruleName = ruleName;
    }
    if (description) {
      filters.description = description;
    }
    if (status === "Active") {
      filters.status = "ENABLED";
    } else if (status === "Inactive") {
      filters.status = "DISABLED";
    }
    if (riskLevel) {
      filters.riskLevel = riskLevel;
    }
    if (device) {
      filters.device = device;
    }
    if (scheme) {
      filters.scheme = scheme;
    }
    if (aspect) {
      filters.aspect = aspect;
    }
    if (control) {
      filters.control = control;
    }
    if (platform) {
      filters.platform = platform;
    }
    if (dateFrom) {
      filters.dateFrom = dateFrom;
    }
    if (dateTo) {
      filters.dateTo = dateTo;
    }

    console.log("Filter values:", filters);
    onApply(filters); // Call parent with selected filters
    onClose(); // Optionally close the modal
  };

  return (
    <FilterLayout
      title="Filter Scoring Rules"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={handleSubmit}
      >
        <div className="relative flex flex-col mt-12">
          <label className="text-sm font-medium">Rule Name</label>
          <input
            type="text"
            placeholder="Enter Rule Name"
            className="w-[95%] h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <LogicDropdown
            label="Status"
            options={["Active", "Inactive"]}
            value={status}
            onChange={(status) => setStatus(status)}
            widthclass="w-[47%]"
          />
          <LogicDropdown
            label="Risk Level"
            options={["High", "Medium", "Low"]}
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
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="w-[45.5%]">
            <label className="text-sm font-medium">Date To</label>
            <input
              type="date"
              className="w-full h-[44px] mt-1 p-2 border border-gray-300 rounded-md text-sm"
              placeholder=" DD / MM / YY "
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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
            type="submit"
            className="text-sm text-gray-700 hover:underline hover:bg-gray-100 border border-gray-200 rounded-md px-4 py-2"
            onClick={() => {
              // Clear all filters
              setStatus("");
              setRiskLevel("");
              setDevice("");
              setScheme("");
              setAspect("");
              setControl("");
              setPlatform("");
              setRuleName("");
              setDescription("");
              setDateFrom("");
              setDateTo("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </FilterLayout>
  );
};

export default Filter;
