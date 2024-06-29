import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Slider } from "@/components/ui/slider";
import { BrushIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export interface ImageAndMaskInputProps {
  label: string;
  description?: string;
  image: string;
  setImage: (value: string) => void;
  mask: string;
  setMask: (value: string) => void;
}

export default function ImageAndMaskInput({
  label,
  description,
  image,
  setImage,
  mask,
  setMask
}: ImageAndMaskInputProps) {
  const canvasRef = createRef<ReactSketchCanvasRef>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTimeoutId, setDrawingTimeoutId] = useState<any>();
  const [brushSize, setBrushSize] = useState(5);

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setImage(`data:image/jpeg;base64,${btoa(binaryString)}`);
  };

  const clearImage = () => {
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
        setMask(image);
      });
    }
  }, [isDrawing]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setImageSize({
        originalWidth: (entry.target as any)?.naturalWidth,
        originalHeight: (entry.target as any)?.naturalHeight,
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });
    if (imageRef?.current && image) {
      observer.observe(imageRef?.current as Element);
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      imageRef?.current && observer.unobserve(imageRef?.current as Element);
    };
  }, [imageRef, image, setImageSize]);

  const canvasStyle = {
    zIndex: 10,
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    width: "100%",
    height: "100%"
  };

  return (
    <>
      <div className="flex flex-col">
        <Label className="text-lg">{label}</Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <Input
          type="file"
          id="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(v) => {
            if (v.target.files) {
              const file = v.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = _handleReaderLoaded;
                reader.readAsBinaryString(file);
              }
            }
          }}
          className="w-[256px] cursor-pointer"
        />
        {image && (
          <div className="flex items-center justify-center relative w-full h-[300px] mt-2">
            <Image
              src={image}
              fill
              className="z-0"
              style={{
                objectFit: "fill"
              }}
              alt="input Image"
              onDragStart={(e) => e.preventDefault()}
            />
            <ReactSketchCanvas
              ref={canvasRef}
              onStroke={() => setIsDrawing(true)}
              onChange={onCanvasChange}
              strokeWidth={brushSize}
              strokeColor="black"
              style={canvasStyle}
              canvasColor="transparent"
            />
            <Button className="absolute top-0 right-0 z-20" size="icon" onClick={clearImage}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-4 mt-2">
          <div className="flex gap-2 items-center w-full">
            <BrushIcon />
            <Slider value={[brushSize]} onValueChange={(v) => setBrushSize(v[0])} min={1} max={32} step={1} />
            <Button
              size="sm"
              onClick={() => {
                canvasRef.current?.clearCanvas();
                setMask("");
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
