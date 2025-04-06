"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import type { Theme } from "@excalidraw/excalidraw/element/types";
import "@excalidraw/excalidraw/index.css";
import { useTheme } from "next-themes";

const ExcalidrawWrapper: React.FC = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
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
  console.log("[debug log] - theme:", theme);
  return (
    <div className="h-screen w-full">
      <Excalidraw theme={currentTheme as Theme} />
    </div>
  );
};
export default ExcalidrawWrapper;
