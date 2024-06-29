"use client";;
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageAndMaskInput from "./input/image-and-mask-input";

export default function SD21Inpainting() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [mask, setMask] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
        input: {
          prompt,
          image
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
      title="Stable Diffusion 2.1 Image To Image"
      isLoading={isLoading}
      inputs={[
        <TextInput key="input-1" label="Prompt" value={prompt} setValue={setPrompt} />,
        <ImageAndMaskInput
          key="input-2"
          label="Image & Masking"
          image={image}
          setImage={setImage}
          mask={mask}
          setMask={setMask}
        />
      ]}
      outputs={[<ImageOutput key="output-1" value={output} />]}
      onGenerate={onGenerate}
    />
  );
}
