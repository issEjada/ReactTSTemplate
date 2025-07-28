import CloseX from "../../assets/svg/closeX.svg";
type props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};
export default function FilterLayout({
  title,
  isOpen,
  onClose,
  children,
}: props & { children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50   bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="fixed bg-white rounded-lg shadow-lg p-6 top-0 h-full right-0 w-1/2 ">
        <div className="flex justify-between items-center w-[95%] ">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-3xl flex items-center justify-center h-[40px] w-[40px]  border p-[15px] border-gray-300 rounded-xl"
            title="Close"
            aria-label="Close"
          >
            <img src={CloseX} className="w-[10px] h-[10px]" alt="Close icon" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
