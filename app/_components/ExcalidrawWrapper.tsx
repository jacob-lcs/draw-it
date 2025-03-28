"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";

const ExcalidrawWrapper: React.FC = () => {
  console.info(
    convertToExcalidrawElements([
      {
        type: "rectangle",
        id: "rect-1",
        x: 0,
        y: 0,
        width: 186.47265625,
        height: 141.9765625,
      },
    ])
  );
  return (
    <div className="h-screen w-full">
      <Excalidraw />
    </div>
  );
};
export default ExcalidrawWrapper;
