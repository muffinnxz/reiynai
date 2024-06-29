"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageInput from "./input/image-input";

export default function ICLight() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "d41bcb10d8c159868f4cfbd7c6a2ca01484f7d39e4613419d5952c61562f1ba7",
        input: {
          prompt,
          subject_image: image
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
      title="IC Light"
      isLoading={isLoading}
      inputs={[
        <TextInput key="input-1" label="Prompt" value={prompt} setValue={setPrompt} />,
        <ImageInput key="input-2" label="Image" value={image} setValue={setImage} />
      ]}
      outputs={[<ImageOutput key="output-1" value={output} />]}
      onGenerate={onGenerate}
    />
  );
}
