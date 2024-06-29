"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import ImageSizePresetInput from "./input/image-size-preset-input";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";

export default function SD21TextToImage() {
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
        model: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
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
      title="Stable Diffusion 2.1 Text To Image"
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
