import React, { useState } from "react";
import Edit from "../../assets/svg/Edit.svg";
import Ignore from "../../assets/svg/ignore.svg";
import Submit from "../../assets/svg/Submit.svg";
import Dropdown from "../../components/DropDown";

const NewForm: React.FC = () => {
  const [ruleName, setRuleName] = useState("New Rule Name");
  const [draftName, setDraftName] = useState(ruleName);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [logicValue1, setLogicValue1] = useState("");
  const logicOptions1 = ["option1", "option2", "option3", "option4"];
  const [logicValue2, setLogicValue2] = useState("");
  const logicOptions2 = ["option1", "option2", "option3", "option4"];
  const [logicValue3, setLogicValue3] = useState("");
  const logicOptions3 = ["option1", "option2", "option3", "option4"];
  const [logicValue4, setLogicValue4] = useState("");
  const logicOptions4 = ["option1", "option2", "option3", "option4"];
  const [logicValue5, setLogicValue5] = useState("");
  const logicOptions5 = ["option1", "option2", "option3", "option4"];
  const [logicValue6, setLogicValue6] = useState("");
  const logicOptions6 = ["option1", "option2", "option3", "option4"];
  const [logicValue7, setLogicValue7] = useState("");
  const logicOptions7 = ["option1", "option2", "option3", "option4"];

  const handleSave = () => {
    if (!draftName.trim()) {
      setError(true);
      return;
    }
    setRuleName(draftName);
    setIsEditing(false);
    setError(false);
  };

  const handleCancel = () => {
    setDraftName(ruleName); // Restore original
    setIsEditing(false);
    setError(false);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
        <div className="flex items-center gap-2 h-[28px]">
          {isEditing ? (
            <>
              <div className="flex flex-col relative">
                <input
                  value={draftName}
                  onChange={(e) => {
                    setDraftName(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="New Rule Name.."
                  className={`w-[320px] h-[44px] font-medium text-[#252B37] rounded-[8px] px-[14px] py-[10px] focus:outline-none ${
                    error
                      ? "border border-red-500 bg-red-50 placeholder-red-400"
                      : "border border-[#2E90FA] bg-[#EFF8FF]"
                  }`}
                />
              </div>
              <button
                className="w-[48px] h-[44px] flex items-center justify-center rounded-[8px] bg-[#12B76A] border border-[#12B76A]"
                onClick={handleSave}
              >
                <img
                  src={Submit}
                  alt="Save"
                  className="w-[13.33px] h-[9.17px] object-contain"
                />
              </button>

              <button
                className="w-[48px] h-[44px] flex items-center justify-center rounded-[8px] bg-[#F04438] border border-[#F04438]"
                onClick={handleCancel}
              >
                <img
                  src={Ignore}
                  alt="Cancel"
                  className="w-[10px] h-[10px] object-contain"
                />
              </button>
            </>
          ) : (
            <>
              <h1 className="font-medium text-[#181D27]">{ruleName}</h1>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-[28px] h-[28px] flex items-center justify-center rounded-[16px] bg-[#EFF8FF]  p-[8px] gap-[4px]"
              >
                <img
                  src={Edit}
                  alt="Edit"
                  className="w-[12px] h-[12px] object-contain"
                />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[12px] h-[400px] w-full gap-y-[20px]">
        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <Dropdown
            label="Event Source Device"
            options={logicOptions1}
            value={logicValue1}
            onChange={setLogicValue1}
            required={true}
            widthclass="w-[370.6666564941406px]"
          />
          <Dropdown
            label="Scheme"
            options={logicOptions2}
            value={logicValue2}
            onChange={setLogicValue2}
            required={true}
            widthclass="w-[370.6666564941406px]"
          />
          <Dropdown
            label="Aspect"
            options={logicOptions3}
            value={logicValue3}
            onChange={setLogicValue3}
            required={true}
            widthclass="w-[370.6666564941406px]"
          />
        </div>
        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <Dropdown
            label="Control"
            options={logicOptions4}
            value={logicValue4}
            onChange={setLogicValue4}
            required={true}
            widthclass="w-[562px]"
          />
          <Dropdown
            label="Platform"
            options={logicOptions5}
            value={logicValue5}
            onChange={setLogicValue5}
            required={true}
            widthclass="w-[562px]"
          />
        </div>
        <div className="w-[1136px] h-[67px] flex items-center justify-between px-6 py-5 gap-[16px]">
          <Dropdown
            label="Status"
            options={logicOptions6}
            value={logicValue6}
            onChange={setLogicValue6}
            required={true}
            widthclass="w-[562px]"
          />
          <Dropdown
            label="Risk Level"
            options={logicOptions7}
            value={logicValue7}
            onChange={setLogicValue7}
            required={true}
            widthclass="w-[562px]"
          />
        </div>
        {/* Description Textarea */}
        <div className="w-[1136px] h-[154px] gab-[6px] flex flex-col px-6">
          <label
            htmlFor="description"
            className="text-sm font-medium text-[#414651] mb-[14px]"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter a description..."
            className="w-full h-[128px] resize-none rounded-[8px] border border-[#D5D7DA] bg-[#FFFFFF] px-[14px] py-[10px]  text-[#717680] placeholder-[#717680] shadow-[#0A0D120D] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default NewForm;
