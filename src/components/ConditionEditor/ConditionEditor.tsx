import ConditionItem from "./ConditionItem";
import SourceDocumentIcon from "../../assets/svg/sourceDocument.svg?react";
import ScaleComparisonIcon from "../../assets/svg/scaleComparison.svg?react";
import SmartphoneARIcon from "../../assets/svg/smartphoneAR.svg?react";
import { useState, useRef } from "react";
export default function ConditionEditor() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editorContent, setEditorContent] = useState("");
  const handleDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const textarea = textareaRef.current;
    if (!textarea) return;

    const data = event.dataTransfer.getData("text/plain");
    const component = JSON.parse(data);

    const content = textarea.value;
    const cursorPos = textarea.selectionStart;

    const needsSpaceBefore =
      cursorPos > 0 && !/\s/.test(content[cursorPos - 1]);
    const needsSpaceAfter =
      cursorPos < content.length && !/\s/.test(content[cursorPos]);

    const newContent =
      content.substring(0, cursorPos) +
      (needsSpaceBefore ? " " : "") +
      component.value +
      (needsSpaceAfter ? " " : "") +
      content.substring(cursorPos);

    setEditorContent(newContent);

    const spacesAdded = (needsSpaceBefore ? 1 : 0) + (needsSpaceAfter ? 1 : 0);
    const newPosition = cursorPos + component.value.length + spacesAdded;
    textarea.setSelectionRange(newPosition, newPosition);
  };

  const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  };
  const staticData = {
    Source: [
      { option: "OngoingCallDuringAppUsage" },
      { option: "DeviceGyroScope" },
      { option: "IsDeviceConnectedToCharger" },
      { option: "NumberOfDeviceFactoryReset" },
      { option: "NumberOfSIMCardsInDevice" },
    ],
    Comparison: [
      { option: "==" },
      { option: "!=" },
      { option: "<" },
      { option: ">" },
      { option: "<=" },
      { option: ">=" },
      { option: "in" },
      { option: "not in" },
    ],
    Target: [
      { option: "BlockedSDK" },
      { option: "MaxInstalledAppsCount" },
      { option: "MinInstalledAppsCount" },
    ],
    Logic: [{ option: "AND" }, { option: "OR" }, { option: "NOT" }],
  };

  return (
    <div className="flex h-[766px] gap-2 pl-6">
      <div className="w-1/3  border-gray-300 border rounded-lg flex flex-col">
        <div className="border-b border-gray-300 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700">Components</h2>
            <button className="text-sm text-gray-400 hover:text-gray-700">
              Drag & Drop
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4 h-full overflow-y-auto ">
          <ConditionItem
            label="Source"
            icon={SourceDocumentIcon}
            data={staticData.Source}
          ></ConditionItem>
          <ConditionItem
            label="Comparison Operator"
            icon={ScaleComparisonIcon}
            data={staticData.Comparison}
          ></ConditionItem>
          <ConditionItem
            label="Target"
            icon={SmartphoneARIcon}
            data={staticData.Target}
          ></ConditionItem>
          <ConditionItem
            label="Logic Operator"
            icon={SmartphoneARIcon}
            data={staticData.Logic}
          ></ConditionItem>
        </div>
      </div>
      <div className="w-2/3  border-gray-300 border rounded-lg flex flex-col ">
        <div className="border-b border-gray-300">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700">Output</h2>
            <button className="text-sm text-gray-400 hover:text-gray-700">
              Copy code
            </button>
          </div>
        </div>

        {/* <div className="bg-gray-50 overflow-y-scroll border border-transparent flex-1 p-4 rounded-lg"></div> */}
        <textarea
          ref={textareaRef}
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-gray-50 overflow-y-scroll border border-transparent flex-1 p-4 resize-none rounded-lg focus:outline-none"
          placeholder="Drop items here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}
