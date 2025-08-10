import ConditionItem from "./ConditionItem";
import SourceDocumentIcon from "../../assets/svg/sourceDocument.svg?react";
import ScaleComparisonIcon from "../../assets/svg/scaleComparison.svg?react";
import SmartphoneARIcon from "../../assets/svg/smartphoneAR.svg?react";
import { useRef } from "react";
import type { GetRulesParameterResponse } from "../../pages/Rules/rulesServices";

interface ConditionsEditorsProps {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  parametersData: GetRulesParameterResponse | undefined;
}

export const ConditionEditor = ({
  editorContent,
  parametersData,
  setEditorContent,
}: ConditionsEditorsProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorContent).then(() => {
      // alert("Condition copied to clipboard!");
      console.log("Condition copied to clipboard!");
    });
  };

  const sourceParams =
    parametersData?.sourceParameters?.map((item) => item.name) ?? [];

  console.log("source: ", sourceParams);
  const targetParams =
    parametersData?.targetParameters?.map((item) => item.name) ?? [];

  console.log("target: ", targetParams);

  const staticData = {
    Source: sourceParams,
    Comparison: parametersData?.comparisonOperators ?? [],
    Target: targetParams,
    Logic: parametersData?.logicalOperators ?? [],
  };

  console.log("static data: ", staticData);

  return (
    <div className="flex h-[766px] gap-2 pl-6">
      <div className="w-[400px]  border-gray-300 border rounded-lg flex flex-col">
        <div className="border-b border-gray-300 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700">Components</h2>
            <span className="text-sm text-gray-400 hover:text-gray-700">
              Drag & Drop
            </span>
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
      <div className="w-[728px]  border-gray-300 border rounded-lg flex flex-col ">
        <div className="border-b border-gray-300">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700">Output</h2>
            <button
              className="text-sm text-gray-400 hover:text-gray-700"
              onClick={handleCopyCode}
            >
              Copy Condition
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
};
