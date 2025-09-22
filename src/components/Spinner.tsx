type SpinnerMode = "fullscreen" | "overlay" | "inline";

interface SpinnerProps {
  show?: boolean;
  mode?: SpinnerMode;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  overlayClassName?: string;
}

const SIZE_MAP = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-4",
  lg: "w-8 h-8 border-4",
};

export default function Spinner({
  show = true,
  mode = "fullscreen",
  message = "Loading...",
  size = "md",
  className = "",
  overlayClassName,
}: SpinnerProps) {
  if (!show) return null;

  const spinner = (
    <div
      className={`animate-spin rounded-full border-blue-200 border-t-blue-500 ${SIZE_MAP[size]}`}
      aria-hidden="true"
    />
  );

  if (mode === "inline") {
    return (
      <div
        className="inline-flex items-center gap-2"
        role="status"
        aria-live="polite"
      >
        {spinner}
        {message ? <p className="text-sm">{message}</p> : null}
      </div>
    );
  }

  const positioning =
    mode === "fullscreen" ? "fixed inset-0 z-50" : "absolute inset-0 z-50";
  return (
    <div
      className={`${positioning} ${overlayClassName} bg-black/10 backdrop-blur-sm flex items-center justify-center`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 ${className}`}
      >
        {spinner}
        {message ? <p className="text-black text-sm">{message}</p> : null}
      </div>
    </div>
  );
}
