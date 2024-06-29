"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageInput from "./input/image-input";
import Image from "next/image";

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
          image_path: image,
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
    <>
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
      <div className="flex   mt-4 space-x-2 justify-center items-center">
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2F%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%20(1).png?alt=media&token=f0913176-ddf6-45be-b914-22c0ca88d91e"
          }
          width={800}
          height={400}
          alt={"Examples1"}
          className="border"
        />
        {/* <Image 
      src={"https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2FScreenshot%202024-06-30%20034928.png?alt=media&token=0074a9ab-27ea-4ad0-aeb3-dbc58624bd95"}
      width={250}
      height={200}
      alt={"Examples2"}
      className="border"
    />
    <Image 
      src={"https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2FScreenshot%202024-06-30%20035153.png?alt=media&token=8e55a3ea-f72b-4823-ace9-bfebfce92190"}
      width={250}
      height={200}
      alt={"Examples3"}
      className="border"
    /> */}
      </div>
    </>
  );
}
