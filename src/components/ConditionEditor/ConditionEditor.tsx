import ConditionItem from "./ConditionItem";
import SourceDocumentIcon from "../../assets/svg/sourceDocument.svg?react";
import ScaleComparisonIcon from "../../assets/svg/scaleComparison.svg?react";
import SmartphoneARIcon from "../../assets/svg/smartphoneAR.svg?react";
import React, { useRef, useState } from "react";
import type { GetRulesParameterResponse } from "../../pages/ScoringRules/rulesServices";

const DragDropIcon = React.lazy(
  () => import("../../assets/svg/DragDrop.svg?react")
);

interface ConditionsEditorsProps {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  parametersData: GetRulesParameterResponse | undefined;
  isReadOnly: boolean; // New prop to control read-only mode
}

export const ConditionEditor = ({
  editorContent,
  parametersData,
  setEditorContent,
  isReadOnly,
}: ConditionsEditorsProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
    if (isReadOnly) {
      event.preventDefault();
      return;
    }
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
    if (isReadOnly) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorContent).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000); // Hide after 2 seconds
    });
  };

  const sourceParams =
    parametersData?.sourceParameters?.map((item) => item.name) ?? [];

  const targetParams =
    parametersData?.targetParameters?.map((item) => item.name) ?? [];

  const staticData = {
    Source: sourceParams,
    Comparison: parametersData?.comparisonOperators ?? [],
    Target: targetParams,
    Logic: parametersData?.logicalOperators ?? [],
  };

  return (
    <div className="flex h-[766px] gap-2 pl-6">
      <div className="w-[400px]  border-gray-300 border rounded-lg flex flex-col dark:bg-[#121418] dark:border-gray-800">
        <div className="border-b border-gray-300 shadow-md dark:bg-[#121418] dark:border-gray-800">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-white">
              Components
            </h2>
            {!isReadOnly && ( // Conditionally render "Drag & Drop"
              <span className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700">
                <DragDropIcon className="text-gray-600" />
                Drag & Drop
              </span>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4 h-full overflow-y-auto ">
          <ConditionItem
            label="Source"
            icon={SourceDocumentIcon}
            data={staticData.Source}
            isReadOnly={isReadOnly} // Pass isReadOnly to ConditionItem
          ></ConditionItem>
          <ConditionItem
            label="Comparison Operator"
            icon={ScaleComparisonIcon}
            data={staticData.Comparison}
            isReadOnly={isReadOnly} // Pass isReadOnly to ConditionItem
          ></ConditionItem>
          <ConditionItem
            label="Target"
            icon={SmartphoneARIcon}
            data={staticData.Target}
            isReadOnly={isReadOnly} // Pass isReadOnly to ConditionItem
          ></ConditionItem>
          <ConditionItem
            label="Logic Operator"
            icon={SmartphoneARIcon}
            data={staticData.Logic}
            isReadOnly={isReadOnly} // Pass isReadOnly to ConditionItem
          ></ConditionItem>
        </div>
      </div>
      <div className="w-[680px]  border-gray-300 border rounded-lg flex flex-col dark:bg-[#121418] dark:border-gray-800">
        <div className="border-b border-gray-300  dark:bg-[#121418] dark:border-gray-800">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-white">
              Output
            </h2>
            <div className="flex flex-col items-end">
              <button
                className="text-sm text-gray-400 hover:text-gray-700"
                onClick={handleCopyCode}
              >
                Copy Condition
              </button>
              {showCopiedMessage && (
                <span className="text-xs text-green-500">
                  Copied Condition Successfully
                </span>
              )}
            </div>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={editorContent}
          onChange={(e) => {
            if (!isReadOnly) {
              // Only allow change if not in read-only mode
              setEditorContent(e.target.value);
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          readOnly={isReadOnly} // Make textarea read-only in view mode
          className={`bg-gray-50 overflow-y-scroll border border-transparent flex-1 p-4 resize-none rounded-lg focus:outline-none dark:text-white dark:bg-[#121418] dark:border-gray-800 ${
            isReadOnly ? "cursor-not-allowed" : ""
          }`}
          placeholder="Drop items here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};
