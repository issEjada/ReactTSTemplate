import { useState } from "react";
import { ActionIndicator } from "./ActionsIndiccator";
import MetricCard from "./MetricCard";
export const ActionAnalytics = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <MetricCard title="test" value={20} className="w-[50%]" />{" "}
      <ActionIndicator isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
