import { Input } from "@/components/ui/input";
import React, { useRef } from 'react';
import { Label } from "@/components/ui/label";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Canvas from "./Canvas";
export interface TextInputProps {
  label: string;
  description?: string;
  canvasRef: React.RefObject<Canvas>;
}
const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };
  
export default function DrawingInput(this: any, { label, description, canvasRef }: TextInputProps) {
  return (
    <>
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    <Canvas ref={canvasRef}/>
  </>
  );
}
