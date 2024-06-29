import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

export interface TextInputProps {
  label: string;
  description?: string;
  value: string;
  setValue: (value: string) => void;
}
const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
  width: "250px",
  height: "250px"
};

export default function DrawingInput({ label, description, value, setValue }: TextInputProps) {
  const canvasRef = React.createRef<ReactSketchCanvasRef>();
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTimeoutId, setDrawingTimeoutId] = useState<any>();

  const onCanvasChange = async () => {
    if (drawingTimeoutId) {
      clearTimeout(drawingTimeoutId);
    }
    const timeoutId = setTimeout(() => {
      setIsDrawing(false);
    }, 300);
    setDrawingTimeoutId(timeoutId);
  };

  useEffect(() => {
    console.log("isDrawing", isDrawing);
    if (canvasRef.current && !isDrawing) {
      canvasRef.current.exportImage("jpeg").then((image) => {
        console.log("image", image);
        setValue(image);
      });
    }
  }, [isDrawing]);

  return (
    <>
      <div className="flex flex-col">
        <Label className="text-lg">{label}</Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <ReactSketchCanvas
          ref={canvasRef}
          onStroke={() => setIsDrawing(true)}
          onChange={onCanvasChange}
          strokeWidth={5}
          strokeColor="black"
          style={styles}
        />
      </div>
    </>
  );
}
