import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// Define the data type
type Activity = {
  name: string;
  time: string;
  risk: "High" | "Medium" | "Low";
};

const data: Activity[] = [
  { name: "Hi-Risk IP Address Detected", time: "2 minutes ago", risk: "High" },
  {
    name: "Hi-Risk IP Address Detected",
    time: "2 minutes ago",
    risk: "Medium",
  },
  { name: "Hi-Risk IP Address Detected", time: "2 minutes ago", risk: "Low" },
  { name: "Hi-Risk IP Address Detected", time: "2 minutes ago", risk: "Low" },
];

// Use the typed column helper
const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("time", {
    header: () => "Time",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("risk", {
    header: () => "Risk",
    cell: ({ getValue }) => {
      const value = getValue();
      const badgeStyle: Record<Activity["risk"], string> = {
        High: "bg-red-700 text-white",
        Medium: "bg-black text-white",
        Low: "bg-gray-200 text-black",
      };
      return (
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyle[value]}`}
        >
          {value}
        </span>
      );
    },
  }),
];

export default function RecentActivityTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-gray-50 p-4 rounded-2xl w-[844px] h-full overflow-x-auto">
      <p className="text-black font-semibold text-base mb-4 text-left">
        Recent Activity
      </p>
      <table className="w-full text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-2 text-gray-400 font-medium whitespace-nowrap"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-transparent">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-3 px-2 text-black whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
