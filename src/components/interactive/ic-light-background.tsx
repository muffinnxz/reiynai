"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageInput from "./input/image-input";

export default function ICLightBackground() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "60015df78a8a795470da6494822982140d57b150b9ef14354e79302ff89f69e3",
        input: {
          prompt,
          subject_image: image,
          background_image: image2
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
        <ImageInput key="input-2" label="Image" value={image} setValue={setImage} />,
        <ImageInput key="input-3" label="Background Image" value={image2} setValue={setImage2} />
      ]}
      outputs={[<ImageOutput key="output-1" value={output} />]}
      onGenerate={onGenerate}
    />
  );
}
