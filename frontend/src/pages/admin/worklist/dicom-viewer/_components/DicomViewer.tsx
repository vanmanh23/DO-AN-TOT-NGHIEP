import { useEffect, useRef, useState } from "react";
import { cornerstoneStreamingImageVolumeLoader } from "@cornerstonejs/core";
import {
  init as csToolsInit,
  RenderingEngine,
  Enums,
  volumeLoader,
  setVolumesForViewports,
} from "@cornerstonejs/core";

import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";

import {
  init as cornerstoneToolsInit,
  ToolGroupManager,
  Enums as csToolsEnums,
  BidirectionalTool,
  ZoomTool,
  EllipticalROITool,
  LengthTool,
  RectangleROITool,
  CircleROITool,
  ArrowAnnotateTool,
  PanTool,
} from "@cornerstonejs/tools";
import createImageIdsAndCacheMetaData from "../../../../../lib/createImageIdsAndCacheMetaData";
import Features from "./Features";
import { initToolGroup } from "./initToolGroup";
import cropImageVolume from "./cropImageVolume";

const { ViewportType } = Enums;
volumeLoader.registerUnknownVolumeLoader(cornerstoneStreamingImageVolumeLoader);

export type toolsUsed = {
  isZoom: boolean;
  isElliptical: boolean;
  isBidirectional: boolean;
  isPan: boolean;
  isRotate: boolean;
  isTranslate: boolean;
  isLength: boolean;
  isrectangleRoi: boolean;
  isCircleROITool: boolean;
  isArrowAnnotateTool: boolean;
};

function DicomViewer() {
  const [toolsUsed, setToolsUsed] = useState<toolsUsed>({
    isZoom: false,
    isElliptical: false,
    isBidirectional: false,
    isPan: false,
    isRotate: false,
    isTranslate: false,
    isLength: false,
    isrectangleRoi: false,
    isCircleROITool: false,
    isArrowAnnotateTool: false,
  });
  const axialRef = useRef<HTMLDivElement | null>(null);
  // const sagittalRef = useRef<HTMLDivElement | null>(null);
  // const acquisitionRef = useRef<HTMLDivElement | null>(null);
  // const coronalRef = useRef<HTMLDivElement | null>(null);
  const running = useRef(false);
  useEffect(() => {
    async function run() {
      if (running.current) {
        return;
      }
      running.current = true;

      await csToolsInit();
      await cornerstoneToolsInit();
      await dicomImageLoaderInit();

      const imageIds = await createImageIdsAndCacheMetaData({
        StudyInstanceUID:
          "1.2.826.0.1.3680043.8.1055.1.20111103111148288.98361414.79379639",
        SeriesInstanceUID:
          "1.2.826.0.1.3680043.8.1055.1.20111103111201370.72665630.67534267",
        wadoRsRoot: "http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs",
      });
      console.log("imageIds: ", imageIds);
      const renderingEngineId = "myRenderingEngine";
      const volumeId = "myVolume";
      const renderingEngine = new RenderingEngine(renderingEngineId);
      const volume = await volumeLoader.createAndCacheVolume(volumeId, {
        imageIds,
      });

      const viewportId1 = "CT_AXIAL";
      // const viewportId2 = "CT_SAGITTAL";
      // const viewportId3 = "CT_CORONAL";
      // const viewportId4 = "CT_ACQUISITION";

      const viewportInput = [
        {
          viewportId: viewportId1,
          element: axialRef.current!,
          type: ViewportType.ORTHOGRAPHIC,
          defaultOptions: {
            orientation: Enums.OrientationAxis.AXIAL,
          },
        },
        // {
        //   viewportId: viewportId2,
        //   element: sagittalRef.current!,
        //   type: ViewportType.ORTHOGRAPHIC,
        //   defaultOptions: {
        //     orientation: Enums.OrientationAxis.SAGITTAL,
        //   },
        // },
        // {
        //   viewportId: viewportId3,
        //   element: coronalRef.current!,
        //   type: ViewportType.ORTHOGRAPHIC,
        //   defaultOptions: {
        //     orientation: Enums.OrientationAxis.CORONAL,
        //   },
        // },
        // {
        //   viewportId: viewportId4,
        //   element: acquisitionRef.current!,
        //   type: ViewportType.VOLUME_3D,
        //   defaultOptions: {
        //     orientation: Enums.OrientationAxis.ACQUISITION,
        //   },
        // },
      ];

      renderingEngine.setViewports(viewportInput);
      await volume.load();

      const toolGroup = initToolGroup();
      toolGroup.addViewport(viewportId1, renderingEngineId);
      // toolGroup.addViewport(viewportId2, renderingEngineId);
      // toolGroup.addViewport(viewportId3, renderingEngineId);
      // toolGroup.addViewport(viewportId4, renderingEngineId);

      toolGroup.setToolActive(BidirectionalTool.toolName, {
        bindings: [
          {
            mouseButton: csToolsEnums.MouseBindings.Primary,
          },
        ],
      });

      // Set Window-Level
      setVolumesForViewports(
        renderingEngine,
        [
          {
            volumeId,
            callback: ({ volumeActor }) => {
              volumeActor
                .getProperty()
                .getRGBTransferFunction(0)
                // .setMappingRange(-180, 220);
                .setMappingRange(-500, 1500);
            },
          },
        ],
        [viewportId1]
      );
      const viewport = renderingEngine.getViewport(viewportId1);
      viewport.setDisplayArea({
        type: "SCALE",
        scale: 3.0, // tùy chỉnh nếu muốn zoom hơn
        imageCanvasPoint: {
          imagePoint: [0.5, 0.5], // center ảnh
          canvasPoint: [0.5, 0.5], // center canvas
        },
        storeAsInitialCamera: true,
      });
      viewport.resetCamera();
      viewport.render();
      // renderingEngine.renderViewports([viewportId1]);
    }
    run();
  }, [axialRef, running]);

  const changeTool = (toolName: string) => {
    const toolGroup = ToolGroupManager.getToolGroup("myToolGroup");
    if (!toolGroup) return;

    // 1️⃣ Reset tất cả tools
    toolGroup.setToolPassive(ZoomTool.toolName);
    toolGroup.setToolPassive(EllipticalROITool.toolName);
    toolGroup.setToolPassive(BidirectionalTool.toolName);
    toolGroup.setToolPassive(PanTool.toolName);
    toolGroup.setToolPassive(LengthTool.toolName);
    toolGroup.setToolPassive(RectangleROITool.toolName);
    toolGroup.setToolPassive(CircleROITool.toolName);
    toolGroup.setToolPassive(ArrowAnnotateTool.toolName);

    // 2️⃣ Active tool tương ứng
    switch (toolName) {
      case "isZoom":
        console.log("👉 Zoom activated");
        toolGroup.setToolActive(ZoomTool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary, // Left Click
            },
          ],
        });
        break;

      case "isElliptical":
        console.log("👉 Elliptical ROI Activated");
        toolGroup.setToolActive(EllipticalROITool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      case "isBidirectional":
        console.log("👉 Bidirectional Activated");
        toolGroup.setToolActive(BidirectionalTool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      case "isPan":
        console.log("👉 Pan Activated");
        toolGroup.setToolActive(PanTool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      case "isLength":
        console.log("👉 isLength Activated");
        toolGroup.setToolActive(LengthTool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      case "isrectangleRoi":
        console.log("👉 isrectangleRoi Activated");
        toolGroup.setToolActive(RectangleROITool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      case "isCircleROITool":
        console.log("👉 isCircleROITool Activated");
        toolGroup.setToolActive(CircleROITool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      case "isArrowAnnotateTool":
        console.log("👉 isArrowAnnotateTool Activated");
        toolGroup.setToolActive(ArrowAnnotateTool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        break;

      default:
        console.warn("⚠ Unknown tool:", toolName);
    }
  };

  const setActiveTool = (toolName: keyof toolsUsed) => {
    setToolsUsed(
      Object.fromEntries(
        Object.keys(toolsUsed).map((key) => [key, key === toolName])
      ) as toolsUsed
    );
  };
  console.log(toolsUsed);
  return (
    <div id="content" className="flex flex-row w-full h-screen p-2">
      <div
        ref={axialRef}
        className="flex flex-col w-full h-full overflow-hidden"
      ></div>
      <div className="w-36">
        <Features
          toolsUsed={toolsUsed}
          setActiveTool={setActiveTool}
          changeTool={changeTool}
        />
      </div>
    </div>
  );
}

export default DicomViewer;
