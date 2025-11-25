// import React from 'react'
// import type { toolsUsed } from './DicomViewer';
// import { 
//   ZoomIn, 
//   Circle, 
//   ArrowUpDown, 
//   Hand, 
//   Ruler, 
//   Square, 
//   CircleDot,
//   ArrowRight
// } from 'lucide-react';

// type Props = {
//   toolsUsed: toolsUsed;
//   changeTool: (toolName: string) => void;
//   setActiveTool: (toolName: keyof toolsUsed) => void;
// };

// export default function Features({ toolsUsed, setActiveTool, changeTool }: Props) {
//      const tools = [
//     { key: 'isZoom', icon: ZoomIn, label: 'Zoom', color: 'blue' },
//     { key: 'isPan', icon: Hand, label: 'Pan', color: 'green' },
//     { key: 'isLength', icon: Ruler, label: 'Length', color: 'yellow' },
//     { key: 'isElliptical', icon: Circle, label: 'Elliptical ROI', color: 'pink' },
//     { key: 'isrectangleRoi', icon: Square, label: 'Rectangle ROI', color: 'red' },
//     { key: 'isCircleROITool', icon: CircleDot, label: 'Circle ROI', color: 'orange' },
//     { key: 'isBidirectional', icon: ArrowUpDown, label: 'Bidirectional', color: 'teal' },
//     { key: 'isArrowAnnotateTool', icon: ArrowRight, label: 'Arrow Annotate', color: 'cyan' },
//   ];
//   const handleToolClick = (toolName: string) => {
//     setActiveTool(toolName as keyof toolsUsed);
//     changeTool(toolName);
//   }
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-white mb-2">DICOM Viewer Tools</h1>
//           <p className="text-gray-400">Select tools for medical image analysis</p>
//         </div>

//         {/* Toolbar Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {tools.map(({ key, icon: Icon, label, color }) => { 
//             return (
//               <button
//                 key={key}
//                 onClick={() => handleToolClick(key)}
//                 className={`
//                   relative group
//                   flex flex-col items-center justify-center
//                   p-6 rounded-2xl
//                   transition-all duration-300 ease-out
//                   ${toolsUsed[key as keyof toolsUsed]
//                     ? `bg-${color}-500/20 border-2 border-${color}-400 shadow-lg shadow-${color}-500/50 scale-105` 
//                     : 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
//                   }
//                   backdrop-blur-sm
//                   transform hover:scale-105
//                   active:scale-95
//                 `}
//               >
//                 {/* Active Indicator */}
//                 {toolsUsed[key as keyof toolsUsed] && (
//                   <div className={`absolute top-2 right-2 w-3 h-3 bg-${color}-400 rounded-full animate-pulse`} />
//                 )}

//                 {/* Icon */}
//                 <div className={`
//                   mb-3 p-3 rounded-xl
//                   transition-colors duration-300
//                   ${toolsUsed[key as keyof toolsUsed] 
//                     ? `bg-${color}-500/30 text-${color}-300` 
//                     : 'bg-gray-700/50 text-gray-400 group-hover:text-gray-300'
//                   }
//                 `}>
//                   <Icon size={28} strokeWidth={2} />
//                 </div>

//                 {/* Label */}
//                 <span className={`
//                   text-sm font-medium text-center
//                   transition-colors duration-300
//                   ${toolsUsed[key as keyof toolsUsed] ? `text-${color}-300` : 'text-gray-300'}
//                 `}>
//                   {label}
//                 </span>

//                 {/* Hover Effect */}
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/0 pointer-events-none transition-all duration-300" />
//               </button>
//             );
//           })}
//         </div>

//         {/* Active Tools Summary */}
//         <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
//           <h3 className="text-lg font-semibold text-white mb-3">Active Tools</h3>
//           <div className="flex flex-wrap gap-2">
//             {Object.entries(toolsUsed)
//               .filter(([_, isActive]) => isActive)
//               .map(([key]) => {
//                 const tool = tools.find(t => t.key === key);
//                 return tool ? (
//                   <span
//                     key={key}
//                     className={`px-3 py-1 rounded-full text-sm font-medium bg-${tool.color}-500/20 text-${tool.color}-300 border border-${tool.color}-400/30`}
//                   >
//                     {tool.label}
//                   </span>
//                 ) : null;
//               })}
//             {Object.values(toolsUsed).every(v => !v) && (
//               <span className="text-gray-500 italic">No tools selected</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React from 'react'
import { 
  ZoomIn, 
  Circle, 
  ArrowUpDown, 
  Hand, 
  Ruler, 
  Square, 
  CircleDot,
  ArrowRight
} from 'lucide-react';

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

export default function Features({ toolsUsed, setActiveTool, changeTool }: Props) {
     const tools = [
    { key: 'isZoom', icon: ZoomIn, label: 'Zoom', color: 'blue' },
    { key: 'isPan', icon: Hand, label: 'Pan', color: 'green' },
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

  // const handleToolClick = (toolName: string) => {
  //   setToolsUsed(prev => ({
  //     ...prev,
  //     [toolName]: !prev[toolName as keyof toolsUsed]
  //   }));
  // }

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500 text-blue-400 hover:bg-blue-500/30',
    green: 'bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400 hover:bg-yellow-500/30',
    pink: 'bg-pink-500/20 border-pink-500 text-pink-400 hover:bg-pink-500/30',
    red: 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30',
    orange: 'bg-orange-500/20 border-orange-500 text-orange-400 hover:bg-orange-500/30',
    teal: 'bg-teal-500/20 border-teal-500 text-teal-400 hover:bg-teal-500/30',
    cyan: 'bg-cyan-500/20 border-cyan-500 text-cyan-400 hover:bg-cyan-500/30',
  };

  return (
    <div className="">
      {/* Compact Toolbar */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-300">DICOM Tools</h2>
          <span className="text-xs text-gray-500">
            {Object.values(toolsUsed).filter(v => v).length} active
          </span>
        </div>
        
        {/* Horizontal Tool Buttons */}
        <div className="flex flex-col gap-2">
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
                  ${isActive
                    ? colorMap[color]
                    : 'bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500'
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
      </div>
    </div>
  )
}