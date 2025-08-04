import { useState } from "react";
type DataType = {
  option: string;
};
type ConditionItemProps = {
  label: string;
  data: DataType[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export default function ConditionItem({
  label,
  data,
  icon: Icon,
}: ConditionItemProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: DataType,
    index: number
  ) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ value: item.option })
    );
    e.dataTransfer.effectAllowed = "move";

    setDraggingIndex(index);
  };
  const handleDragEnd = () => {
    setDraggingIndex(null);
  };
  return (
    <div className="border-[1px] border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md ">
      <div className="mb-2">
        <h2>{label}</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, item, index)}
            onDragEnd={handleDragEnd}
            className={`flex flex-col items-center rounded-lg w-[5rem] gap-1 cursor-grab ${
              draggingIndex === index
                ? "scale-105 text-black opacity-100 shadow-md "
                : "hover:bg-gray-50"
            }`}
          >
            <div
              className={`w-[100%] h-[4rem]  border border-gray-300 rounded-md flex items-center justify-center shadow
                ${draggingIndex === index ? "bg-blue-900" : "bg-gray-100"}`}
            >
              <Icon
                className={`w-8 h-8 object-contain ${
                  draggingIndex === index ? "text-white" : ""
                }`}
              />
            </div>
            <div
              className={`text-xs w-full text-center break-words mt-1
              ${
                draggingIndex === index
                  ? "text-black font-medium "
                  : "text-gray-600"
              }`}
            >
              {item.option}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
