"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import ImageSizePresetInput from "./input/image-size-preset-input";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";

export default function StableDiffusion15() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState("768");
  const [height, setHeight] = useState("768");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "b3d14e1cd1f9470bbb0bb68cac48e5f483e5be309551992cc33dc30654a82bb7",
        input: {
          prompt,
          width: parseInt(width),
          height: parseInt(height)
        }
      })
      .then((v) => {
        setOutput(v.data.result[0]);
        setIsLoading(false);
      })
      .catch(() => {
        console.error("Failed to generate image");
        toast({
          title: "Error",
          description: "Failed to generate image"
        });
        setIsLoading(false);
      });
  };

  return (
    <InteractiveWrapper
      title="Stable Diffusion 1.5"
      isLoading={isLoading}
      inputs={[
        <TextInput key="input-1" label="Prompt" value={prompt} setValue={setPrompt} />,
        <ImageSizePresetInput
          key="input-2"
          label="Image Size"
          width={width}
          setWidth={setWidth}
          widthPresets={["512", "768", "2048"]}
          height={height}
          setHeight={setHeight}
          heightPresets={["512", "768", "2048"]}
        />
      ]}
      outputs={[<ImageOutput key="output-1" value={output} />]}
      onGenerate={onGenerate}
    />
  );
}
