"use client";
import { useEffect, useRef, useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import ImageInput from "./input/image-input";
import useUser from "@/hooks/use-user";
import { ActionType } from "@/interfaces/bot";

export default function ICLightBackground({ p, i, bg }: { p: string; i: string; bg: string }) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { addBotAction, isOpenChat, toggleChat } = useUser();

  const hasAddedBotAction = useRef(false); // Ref to track if the action has been added

  useEffect(() => {
    if (!hasAddedBotAction.current) {
      addBotAction({
        id: "ic-light-background",
        type: ActionType.SEND_PRESET,
        content: {
          id: "ic-light-background",
          content: () => {
            setPrompt(p);
            setImage(i);
            setImage2(bg);
          },
          presets: {
            Prompt: p,
            Image: i,
            Background: bg
          }
        }
      });
      hasAddedBotAction.current = true; // Set the ref to true to indicate the action has been added
      if (!isOpenChat) {
        toggleChat();
      }
    }
  }, [p, i, bg, addBotAction, isOpenChat, toggleChat]);

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
    <>
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
      <div className="flex   mt-4 space-x-2 justify-center items-center">
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2F%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%20(2).png?alt=media&token=c1a11e91-8cea-4c3b-8c83-108686d3e738"
          }
          width={800}
          height={400}
          alt={"Examples1"}
          className="border"
        />
      </div>
    </>
  );
}
