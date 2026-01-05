// tools/ToolGroup.ts
import {
  ToolGroupManager,
  addTool,
  BidirectionalTool,
  ZoomTool,
  EllipticalROITool,
  LengthTool,
  RectangleROITool,
  CircleROITool,
  ArrowAnnotateTool,
  PanTool,
  WindowLevelTool,
} from "@cornerstonejs/tools";

export const TOOL_GROUP_ID = "myToolGroup";

export function initToolGroup() {
  const toolGroup = ToolGroupManager.createToolGroup(TOOL_GROUP_ID);
    addTool(BidirectionalTool)
    addTool(ZoomTool)
    addTool(EllipticalROITool)
    addTool(LengthTool)
    addTool(RectangleROITool)
    addTool(CircleROITool)
    addTool(ArrowAnnotateTool)
    addTool(PanTool)
    addTool(WindowLevelTool)

  // Thêm tool vào nhóm
  toolGroup.addTool(WindowLevelTool.toolName); 
  toolGroup.addTool(BidirectionalTool.toolName);
  toolGroup.addTool(ZoomTool.toolName);
  toolGroup.addTool(EllipticalROITool.toolName);
  toolGroup.addTool(LengthTool.toolName);
  toolGroup.addTool(RectangleROITool.toolName);
  toolGroup.addTool(CircleROITool.toolName);
  toolGroup.addTool(ArrowAnnotateTool.toolName);
  toolGroup.addTool(PanTool.toolName);

  return toolGroup;
}
