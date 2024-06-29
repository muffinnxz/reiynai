"use client";
import DrawingInput from "./input/drawing-input";
import * as React from "react";
import ReactDOM from "react-dom";
import Canvas from "./input/Canvas";
import InteractiveWrapper from "./interactive-wrapper";
import ImageOutput from "./output/image-output";
import { useState } from "react";

export default function Test(){
    const [isLoading, setIsLoading] = useState(false);
    var canvasRef = React.useRef<Canvas>(null);
    const handleButtonClick = () => {
        if (canvasRef.current) {
          canvasRef.current.handleExport();
        }
      };
    const onGenerate = async () => {
        handleButtonClick()
      };
    return (<InteractiveWrapper title="Stable Diffusion 1.5"
        isLoading={isLoading}
        inputs={[<DrawingInput  label="Draw-to-image" description="draw your prompt here" canvasRef={canvasRef}/>]}
        outputs={[<ImageOutput key="output-1" value={"test"} /> ]}
        onGenerate={onGenerate}
    />);
}