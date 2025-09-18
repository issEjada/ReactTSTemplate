import ConditionItem from "./ConditionItem";
import SourceDocumentIcon from "../../assets/svg/sourceDocument.svg?react";
import ScaleComparisonIcon from "../../assets/svg/scaleComparison.svg?react";
import SmartphoneARIcon from "../../assets/svg/smartphoneAR.svg?react";
import React, {
  useRef,
  useState,
  Suspense,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import type { GetRulesParameterResponse } from "../../pages/ScoringRules/scoringRulesServices";
import Spinner from "../Spinner";

const DragDropIcon = React.lazy(
  () => import("../../assets/svg/DragDrop.svg?react")
);

interface ConditionsEditorsProps {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  parametersData: GetRulesParameterResponse | undefined;
  isReadOnly: boolean;
}

export const ConditionEditor = ({
  editorContent,
  parametersData,
  setEditorContent,
  isReadOnly,
}: ConditionsEditorsProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<boolean>(false);
  const suggestionsBoxRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  // ========== COPY TO CLIPBOARD ==========
  const handleCopyCode = () => {
    navigator.clipboard.writeText(editorContent).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000);
    });
  };

  // ========== DRAG & DROP ==========
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

  // ========== AUTOSUGGESTION ==========
  const filteredSuggestions = useMemo(() => {
    const content = editorContent || "";
    const cursorPos = textareaRef.current?.selectionStart ?? 0;
    const currentWord =
      content
        .substring(0, cursorPos)
        .split(/[^\w\d]+/)
        .pop() || "";

    if (currentWord.length < 1) return [];

    const sourceParams =
      parametersData?.sourceParameters?.map((item) => item.name) ?? [];
    const targetParams =
      parametersData?.targetParameters?.map((item) => item.name) ?? [];
    const combinedParameters = [...sourceParams, ...targetParams];

    return combinedParameters.filter((param) =>
      (param?.toLowerCase() ?? "").includes(currentWord.toLowerCase())
    );
  }, [editorContent, parametersData]);

  const handleKeyUp = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const caretCoords = getCaretCoordinates(textarea, cursorPos);
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);

    setCursorPosition({
      top: caretCoords.top + lineHeight,
      left: caretCoords.left,
    });

    suggestionsRef.current = filteredSuggestions.length > 0;
  }, [filteredSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const content = textarea.value;
    const textBeforeCursor = content.substring(0, cursorPos);
    const words = textBeforeCursor.split(/([^\w\d]+)/);

    let lastWord = "";
    for (let i = words.length - 1; i >= 0; i--) {
      if (/\w/.test(words[i])) {
        lastWord = words[i];
        break;
      }
    }

    const newContent =
      content.substring(0, textBeforeCursor.lastIndexOf(lastWord)) +
      suggestion +
      " " +
      content.substring(cursorPos);

    setEditorContent(newContent);
    suggestionsRef.current = false;
    textarea.focus();
  };

  // ========== OUTSIDE CLICK HANDLER ==========
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!suggestionsBoxRef.current?.contains(event.target as Node)) {
        suggestionsRef.current = false;
        setCursorPosition((prev) => ({ ...prev }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ========== STATIC DATA ==========
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
    <div className="flex flex-col md:flex-row md:h-[766px] gap-2 pl-6 pr-6 md:pr-0">
      {/* Left panel */}
      <div className="w-full md:w-[400px] border-gray-300 border rounded-lg flex flex-col dark:bg-darkTheme dark:border-gray-800">
        <div className="border-b border-gray-300 shadow-md dark:bg-darkTheme dark:border-gray-800 ">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-white">
              Components
            </h2>
            {!isReadOnly && (
              <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-white">
                <Suspense
                  fallback={
                    <Spinner
                      mode="overlay"
                      size="md"
                      overlayClassName="h-full w-full bg-transparent"
                    />
                  }
                >
                  <DragDropIcon className="text-gray-600 dark:text-white" />
                </Suspense>
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
            isReadOnly={isReadOnly}
          />
          <ConditionItem
            label="Comparison Operator"
            icon={ScaleComparisonIcon}
            data={staticData.Comparison}
            isReadOnly={isReadOnly}
          />
          <ConditionItem
            label="Target"
            icon={SmartphoneARIcon}
            data={staticData.Target}
            isReadOnly={isReadOnly}
          />
          <ConditionItem
            label="Logic Operator"
            icon={SmartphoneARIcon}
            data={staticData.Logic}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full md:w-[680px] border-gray-300 border rounded-lg flex flex-col dark:bg-darkTheme dark:border-gray-800 relative">
        <div className="border-b border-gray-300 dark:bg-darkTheme dark:border-gray-800 ">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-white">
              Output
            </h2>
            <div className="flex flex-col items-end">
              <button
                type="button"
                className="text-sm text-gray-400 dark:hover:text-gray-300 hover:text-gray-700"
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
              setEditorContent(e.target.value);
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onKeyUp={handleKeyUp}
          readOnly={isReadOnly}
          className={`bg-gray-50 overflow-y-scroll border border-transparent flex-1 p-4 resize-none rounded-lg focus:outline-none dark:text-white dark:bg-darkTheme dark:border-gray-800 ${
            isReadOnly ? "cursor-not-allowed" : ""
          }`}
          placeholder="Drop items here or start typing..."
          spellCheck={false}
        />

        {/* Suggestions */}
        {suggestionsRef.current && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsBoxRef}
            className="absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg w-64 dark:bg-darkTheme dark:border-gray-800 dark:text-white"
            style={{
              top: `${cursorPosition.top + 80}px`,
              left: `${cursorPosition.left}px`,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {filteredSuggestions.map((suggestion, index) => {
              const isSourceParam = parametersData?.sourceParameters.some(
                (param) => param.name === suggestion
              );
              return (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex justify-between items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span>{suggestion}</span>
                  <span className="text-xs px-2 py-1 rounded">
                    {isSourceParam ? "source" : "target"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// helper: get caret coords
const getCaretCoordinates = (
  element: HTMLTextAreaElement,
  position: number
): { top: number; left: number } => {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "0";
  div.style.left = "0";
  div.style.visibility = "hidden";
  div.style.whiteSpace = "pre-wrap";
  div.style.width = `${element.offsetWidth}px`;

  const textContent = element.value.substring(0, position);
  div.textContent = textContent;

  const span = document.createElement("span");
  span.textContent = ".";
  div.appendChild(span);

  document.body.appendChild(div);
  const { offsetLeft, offsetTop } = span;
  document.body.removeChild(div);

  return {
    left: offsetLeft,
    top: offsetTop - element.scrollTop,
  };
};
