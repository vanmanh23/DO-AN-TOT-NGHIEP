// tools/ToolGroup.ts
import {
  ToolGroupManager,
  ZoomTool,
  BidirectionalTool,
  EllipticalROITool,
  addTool,
} from "@cornerstonejs/tools";

export const TOOL_GROUP_ID = "myToolGroup";

export function initToolGroup() {
  const toolGroup = ToolGroupManager.createToolGroup(TOOL_GROUP_ID);
    addTool(BidirectionalTool)
    addTool(ZoomTool)
    addTool(EllipticalROITool)
  // Thêm tool vào nhóm
  toolGroup.addTool(BidirectionalTool.toolName);
  toolGroup.addTool(ZoomTool.toolName);
  toolGroup.addTool(EllipticalROITool.toolName);

  return toolGroup;
}
