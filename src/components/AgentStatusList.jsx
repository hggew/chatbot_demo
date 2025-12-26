// src/components/AgentStatusList.jsx
import { memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";

// Simple local badge component (no shadcn required)
function StatusBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${className}`}
    >
      {children}
    </span>
  );
}

const STATUS_COLORS = {
  idle: "bg-gray-100 text-gray-700 border-gray-300",
  running: "bg-emerald-50 text-emerald-700 border-emerald-300",
  error: "bg-red-50 text-red-700 border-red-300",
};

const STATUS_LABEL = {
  idle: "Idle",
  running: "Running",
  error: "Error",
};

function AgentStatusList({ agents }) {
  return (
    <div className="w-full px-6 pb-5">
      <div className="rounded-2xl border border-gray-200 bg-neutral-50 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-900">Agent Status</p>
          <span className="text-[11px] text-gray-400">Live</span>
        </div>

        <div className="space-y-2">
          {agents.map((agent) => {
            const isActive = agent.status === "running";

            return (
              <div
  key={agent.id}
  className={`
    relative flex items-center justify-between rounded-xl border shadow-sm
    transition-all duration-300 ease-out

    ${isActive
      ? "bg-emerald-50 border-emerald-400 py-4 px-4 shadow-md ring-1 ring-emerald-300"
      : "bg-white border-gray-200 py-2 px-3"
    }
  `}
>
            {isActive && (
              <span className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-400 rounded-l-xl" />
            )}

            <div className="flex flex-col min-w-0">
              <span className={`truncate font-semibold ${isActive ? "text-[15px]" : "text-sm"} text-gray-900`}>
                {agent.name}
              </span>

              <span className={`truncate ${isActive ? "text-sm text-gray-700" : "text-sm text-gray-500"}`}>
                {agent.description}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
              <StatusBadge className={STATUS_COLORS[agent.status]}>
                <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-80 ${isActive ? "animate-ping" : ""}`} />
                {STATUS_LABEL[agent.status]}
              </StatusBadge>

              {agent.status === "running" && (
                <div className="flex items-center justify-center w-6 h-6">
                  <PulseLoader loading size={4} />
                </div>
              )}
            </div>
          </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(AgentStatusList);
