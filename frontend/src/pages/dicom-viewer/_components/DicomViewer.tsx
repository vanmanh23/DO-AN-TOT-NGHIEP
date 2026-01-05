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
  WindowLevelTool,
} from "@cornerstonejs/tools";
import createImageIdsAndCacheMetaData from "../../../lib/createImageIdsAndCacheMetaData";
import Features from "./Features";
import { initToolGroup } from "./initToolGroup";

const { ViewportType } = Enums;
// volumeLoader.registerUnknownVolumeLoader(cornerstoneStreamingImageVolumeLoader);

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
  isWindowLevel: boolean;
};

function DicomViewer() {
  const [isLoading, setIsLoading] = useState(true);
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
    isWindowLevel: false,
  });
  const studyInstance = localStorage.getItem("studyInstanceUID");
  const seriesInstance = localStorage.getItem("seriesInstanceUID");
  const axialRef = useRef<HTMLDivElement | null>(null);
  const running = useRef(false);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    // async function run() {
    const run = async () => {
      if (running.current) {
        return;
      }
      running.current = true;
      try {
        await csToolsInit();
        await cornerstoneToolsInit();
        await dicomImageLoaderInit();

        // Đăng ký volume loader chưa biết để xử lý các loại DICOM khác nhau
        volumeLoader.registerUnknownVolumeLoader(
          cornerstoneStreamingImageVolumeLoader
        );

        const imageIds = await createImageIdsAndCacheMetaData({
          StudyInstanceUID: studyInstance,
          SeriesInstanceUID: seriesInstance,
          wadoRsRoot: "http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs",
        });
        const renderingEngineId = "myRenderingEngine";
        const volumeId = "myVolume";
        const renderingEngine = new RenderingEngine(renderingEngineId);
        const volume = await volumeLoader.createAndCacheVolume(volumeId, {
          imageIds,
        });

        const viewportId1 = "CT_AXIAL";

        const viewportInput = [
          {
            viewportId: viewportId1,
            element: axialRef.current!,
            type: ViewportType.ORTHOGRAPHIC,
            defaultOptions: {
              // orientation: Enums.OrientationAxis.AXIAL,
              background: [0, 0, 0],
            },
          },
        ];

        renderingEngine.setViewports(viewportInput);
        await volume.load();

        const toolGroup = initToolGroup();
        toolGroup.addViewport(viewportId1, renderingEngineId);
        toolGroup.setToolActive(BidirectionalTool.toolName, {
          bindings: [
            {
              mouseButton: csToolsEnums.MouseBindings.Primary,
            },
          ],
        });
        await setVolumesForViewports(
          renderingEngine,
          [{ volumeId }],
          [viewportId1]
        );
        const viewport = renderingEngine.getViewport(viewportId1);
        viewport.resetCamera();
        // Tự động Resize khi thẻ div thay đổi kích thước
        // Đây là lý do chính khiến ảnh bị bẹp hoặc vỡ hạt
        resizeObserver = new ResizeObserver(() => {
          if (renderingEngine) {
            renderingEngine.resize(true, false); // (immediate, keepCamera)
          }
        });

        if (axialRef.current) {
          resizeObserver.observe(axialRef.current);
        }
        // renderingEngine.render();
        viewport.render();
        // renderingEngine.renderViewports([viewportId1]);
        // setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [axialRef, running]);

  const changeTool = (toolName: string) => {
    const toolGroup = ToolGroupManager.getToolGroup("myToolGroup");
    if (!toolGroup) return;

    toolGroup.setToolPassive(ZoomTool.toolName);
    toolGroup.setToolPassive(EllipticalROITool.toolName);
    toolGroup.setToolPassive(BidirectionalTool.toolName);
    toolGroup.setToolPassive(PanTool.toolName);
    toolGroup.setToolPassive(LengthTool.toolName);
    toolGroup.setToolPassive(RectangleROITool.toolName);
    toolGroup.setToolPassive(CircleROITool.toolName);
    toolGroup.setToolPassive(ArrowAnnotateTool.toolName);
    toolGroup.setToolPassive(WindowLevelTool.toolName);

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
      case "isWindowLevel":
        console.log("👉 Window Level Activated");
        toolGroup.setToolActive(WindowLevelTool.toolName, {
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
  console.log("isLoading", isLoading);
  return (
    <div className="relative w-full h-screen bg-black">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-sans text-lg animate-pulse">Loading...</p>
        </div>
      )}
      <div className="flex w-full h-full">
        <div
          ref={axialRef}
          className="flex flex-col w-screen h-screen overflow-hidden"
        ></div>
        <div className="absolute top-0 right-0 w-36">
          <Features
            toolsUsed={toolsUsed}
            setActiveTool={setActiveTool}
            changeTool={changeTool}
          />
        </div>
      </div>
    </div>
  );
}

export default DicomViewer;
