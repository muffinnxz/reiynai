"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageInput from "./input/image-input";

export default function SDInpaint() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const [output, setOutput] = useState("");
  const [output2, setOutput2] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
        input: {
          prompt,
          image,
          image_num: 1
        }
      })
      .then((v) => {
        setOutput(v.data.result[0]);
        setOutput2(v.data.result[1]);
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
      title="Stable Diffusion Inpainting"
      isLoading={isLoading}
      inputs={[
        <TextInput key="input-1" label="Prompt" value={prompt} setValue={setPrompt} />,
        <ImageInput key="input-2" label="Image" value={image} setValue={setImage} />
      ]}
      outputs={[
        <ImageOutput key="output-1" label="Control Image" value={output} />,
        <ImageOutput key="output-2" label="Result Image" value={output2} />
      ]}
      onGenerate={onGenerate}
    />
  );
}
