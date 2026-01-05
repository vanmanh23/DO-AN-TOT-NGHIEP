import React from "react";
import {
  ZoomIn,
  Circle,
  ArrowUpDown,
  Hand,
  Ruler,
  Square,
  CircleDot,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sun,
} from "lucide-react";

type toolsUsed = {
  isZoom: boolean;
  isPan: boolean;
  isLength: boolean;
  isElliptical: boolean;
  isrectangleRoi: boolean;
  isCircleROITool: boolean;
  isBidirectional: boolean;
  isArrowAnnotateTool: boolean;
};

type Props = {
  toolsUsed: toolsUsed;
  changeTool: (toolName: string) => void;
  setActiveTool: (toolName: keyof toolsUsed) => void;
};

export default function Features({
  toolsUsed,
  setActiveTool,
  changeTool,
}: Props) {
  const [hiddenTools, setHiddenTools] = React.useState(false);
  const tools = [
    { key: "isZoom", icon: ZoomIn, label: "Zoom", color: "blue" },
    { key: "isPan", icon: Hand, label: "Pan", color: "green" },
    { key: "isLength", icon: Ruler, label: "Length", color: "yellow" },
    {
      key: "isElliptical",
      icon: Circle,
      label: "Elliptical ROI",
      color: "pink",
    },
    {
      key: "isrectangleRoi",
      icon: Square,
      label: "Rectangle ROI",
      color: "red",
    },
    {
      key: "isCircleROITool",
      icon: CircleDot,
      label: "Circle ROI",
      color: "orange",
    },
    {
      key: "isBidirectional",
      icon: ArrowUpDown,
      label: "Bidirectional",
      color: "teal",
    },
    {
      key: "isArrowAnnotateTool",
      icon: ArrowRight,
      label: "Arrow Annotate",
      color: "cyan",
    },
    {
    key: "isWindowLevel",         
    icon: Sun,                     
    label: "Window Level",
    color: "yellow",
  },
  ];
  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName as keyof toolsUsed);
    changeTool(toolName);
  };

  const handleHiddenClick = () => {
    setHiddenTools(!hiddenTools);
  };

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/20 border-blue-500 text-blue-400 hover:bg-blue-500/30",
    green:
      "bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30",
    yellow:
      "bg-yellow-500/20 border-yellow-500 text-yellow-400 hover:bg-yellow-500/30",
    pink: "bg-pink-500/20 border-pink-500 text-pink-400 hover:bg-pink-500/30",
    red: "bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30",
    orange:
      "bg-orange-500/20 border-orange-500 text-orange-400 hover:bg-orange-500/30",
    teal: "bg-teal-500/20 border-teal-500 text-teal-400 hover:bg-teal-500/30",
    cyan: "bg-cyan-500/20 border-cyan-500 text-cyan-400 hover:bg-cyan-500/30",
  };

  return (
    <div className="">
      {/* Compact Toolbar */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-300">DICOM Tools</h2>
          <span className="text-xs text-gray-500">
            {Object.values(toolsUsed).filter((v) => v).length} active
          </span>
        </div>

        {!hiddenTools ? (
          <div className="flex flex-col gap-2 shadow animate-slideDown">
            {tools.map(({ key, icon: Icon, label, color }) => {
              const isActive = toolsUsed[key as keyof toolsUsed];
              return (
                <button
                  key={key}
                  onClick={() => handleToolClick(key)}
                  className={`
                  group relative
                  flex items-center gap-2
                  px-3 py-2 rounded-lg
                  border transition-all duration-200
                  ${
                    isActive
                      ? colorMap[color]
                      : "bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500"
                  }
                `}
                  title={label}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span className="text-xs font-medium hidden sm:inline">
                    {label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-gray-800" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex shadow animate-slideUp"></div>
        )}
        <div className="mt-2 text-white">
          {hiddenTools ? (
            <ChevronDown
              className="h-6 w-6 cursor-pointer"
              onClick={handleHiddenClick}
            />
          ) : (
            <ChevronUp
              className="h-6 w-6 cursor-pointer"
              onClick={handleHiddenClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
