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

export default function ICLight({ p, i }: { p: string; i: string }) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { addBotAction, isOpenChat, toggleChat } = useUser();

  const hasAddedBotAction = useRef(false); // Ref to track if the action has been added

  useEffect(() => {
    if (!hasAddedBotAction.current) {
      addBotAction({
        id: "ic-light",
        type: ActionType.SEND_PRESET,
        content: {
          id: "ic-light",
          content: () => {
            setPrompt(p);
            setImage(i);
          },
          presets: {
            Prompt: p,
            Image: i
          }
        }
      });
      hasAddedBotAction.current = true; // Set the ref to true to indicate the action has been added
      if (!isOpenChat) {
        toggleChat();
      }
    }
  }, [p, i, addBotAction, isOpenChat, toggleChat]);

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
    <>
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
      <div className="flex mt-4 space-x-2 justify-center items-center">
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2F%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93.png?alt=media&token=a06e19f7-bafc-4fce-8a57-1777008340e4"
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
      src={"https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2FScreenshot%202024-06-30%20042903.png?alt=media&token=2bfec890-ebaa-418d-acf5-0cb7ed51e216"}
      width={250}
      height={200}
      alt={"Examples3"}
      className="border"
    /> */}
      </div>
    </>
  );
}
