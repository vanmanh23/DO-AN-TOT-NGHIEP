import React from 'react'
import type { toolsUsed } from './DicomViewer';
import { 
  ZoomIn, 
  Circle, 
  ArrowUpDown, 
  Hand, 
  RotateCw, 
  Move, 
  Ruler, 
  Square, 
  CircleDot,
  ArrowRight
} from 'lucide-react';

type Props = {
  toolsUsed: toolsUsed;
  changeTool: (toolName: string) => void;
  setActiveTool: (toolName: keyof toolsUsed) => void;
};

export default function Features({ toolsUsed, setActiveTool, changeTool }: Props) {
     const tools = [
    { key: 'isZoom', icon: ZoomIn, label: 'Zoom', color: 'blue' },
    { key: 'isPan', icon: Hand, label: 'Pan', color: 'green' },
    { key: 'isRotate', icon: RotateCw, label: 'Rotate', color: 'purple' },
    { key: 'isTranslate', icon: Move, label: 'Translate', color: 'indigo' },
    { key: 'isLength', icon: Ruler, label: 'Length', color: 'yellow' },
    { key: 'isElliptical', icon: Circle, label: 'Elliptical ROI', color: 'pink' },
    { key: 'isrectangleRoi', icon: Square, label: 'Rectangle ROI', color: 'red' },
    { key: 'isCircleROITool', icon: CircleDot, label: 'Circle ROI', color: 'orange' },
    { key: 'isBidirectional', icon: ArrowUpDown, label: 'Bidirectional', color: 'teal' },
    { key: 'isArrowAnnotateTool', icon: ArrowRight, label: 'Arrow Annotate', color: 'cyan' },
  ];
  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName as keyof toolsUsed);
    changeTool(toolName);
  }
  return (
    // <div>
    //   <button
    //    onClick={() => setActiveTool("isZoom")}
    //   >
    //     Toggle Zoom
    //   </button>

    //   <button onClick={() => setActiveTool("isElliptical")}>
    //     Elliptical {toolsUsed.isElliptical ? "(active)" : ""}
    //   </button>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">DICOM Viewer Tools</h1>
          <p className="text-gray-400">Select tools for medical image analysis</p>
        </div>

        {/* Toolbar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tools.map(({ key, icon: Icon, label, color }) => { 
            return (
              <button
                key={key}
                onClick={() => handleToolClick(key)}
                className={`
                  relative group
                  flex flex-col items-center justify-center
                  p-6 rounded-2xl
                  transition-all duration-300 ease-out
                  ${toolsUsed[key as keyof toolsUsed]
                    ? `bg-${color}-500/20 border-2 border-${color}-400 shadow-lg shadow-${color}-500/50 scale-105` 
                    : 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                  }
                  backdrop-blur-sm
                  transform hover:scale-105
                  active:scale-95
                `}
              >
                {/* Active Indicator */}
                {toolsUsed[key as keyof toolsUsed] && (
                  <div className={`absolute top-2 right-2 w-3 h-3 bg-${color}-400 rounded-full animate-pulse`} />
                )}

                {/* Icon */}
                <div className={`
                  mb-3 p-3 rounded-xl
                  transition-colors duration-300
                  ${toolsUsed[key as keyof toolsUsed] 
                    ? `bg-${color}-500/30 text-${color}-300` 
                    : 'bg-gray-700/50 text-gray-400 group-hover:text-gray-300'
                  }
                `}>
                  <Icon size={28} strokeWidth={2} />
                </div>

                {/* Label */}
                <span className={`
                  text-sm font-medium text-center
                  transition-colors duration-300
                  ${toolsUsed[key as keyof toolsUsed] ? `text-${color}-300` : 'text-gray-300'}
                `}>
                  {label}
                </span>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/0 pointer-events-none transition-all duration-300" />
              </button>
            );
          })}
        </div>

        {/* Active Tools Summary */}
        <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Active Tools</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(toolsUsed)
              .filter(([_, isActive]) => isActive)
              .map(([key]) => {
                const tool = tools.find(t => t.key === key);
                return tool ? (
                  <span
                    key={key}
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-${tool.color}-500/20 text-${tool.color}-300 border border-${tool.color}-400/30`}
                  >
                    {tool.label}
                  </span>
                ) : null;
              })}
            {Object.values(toolsUsed).every(v => !v) && (
              <span className="text-gray-500 italic">No tools selected</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
