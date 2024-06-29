import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Slider } from "@/components/ui/slider";
import { BrushIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DrawingInputProps {
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

export default function DrawingInput({ label, description, value, setValue }: DrawingInputProps) {
  const canvasRef = React.createRef<ReactSketchCanvasRef>();
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTimeoutId, setDrawingTimeoutId] = useState<any>();
  const [brushSize, setBrushSize] = useState(5);

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
        <div className="flex flex-col items-center justify-center gap-4 mt-2">
          <ReactSketchCanvas
            ref={canvasRef}
            onStroke={() => setIsDrawing(true)}
            onChange={onCanvasChange}
            strokeWidth={brushSize}
            strokeColor="black"
            style={styles}
          />
          <div className="flex gap-2 items-center w-full">
            <BrushIcon />
            <Slider value={[brushSize]} onValueChange={(v) => setBrushSize(v[0])} min={1} max={32} step={1} />
            <Button
              size="sm"
              onClick={() => {
                canvasRef.current?.clearCanvas();
                setValue("");
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
