"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageInput from "./input/image-input";
import Examples from "./example/example";
import useUser from "@/hooks/use-user";
import { ActionType } from "@/interfaces/bot";

export default function ICLightBackground({ p, i, bg, quest }: { p: string; i: string; bg: string; quest?: string }) {
  const [prompt, setPrompt] = useState(p);
  const [image, setImage] = useState(i);
  const [background, setBackground] = useState(bg);

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { addBotAction, addBotMessage, isOpenChat, toggleChat } = useUser();

  const hasAddedBotAction = useRef(false); // Ref to track if the action has been added
  const hasAddedGeneratedAction = useRef(false); // Ref to track if the generated action has been added

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
            setBackground(bg);
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

  useEffect(() => {
    if (!hasAddedGeneratedAction.current && quest) {
      addBotMessage(`ลองใช้รูป presets และสร้างรูป ${quest}`);
      if (!isOpenChat) {
        toggleChat();
      }
      hasAddedGeneratedAction.current = true;
    }
  }, [quest, addBotMessage, isOpenChat, toggleChat]);

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "60015df78a8a795470da6494822982140d57b150b9ef14354e79302ff89f69e3",
        input: {
          prompt,
          subject_image: image,
          background_image: background
        }
      })
      .then((v) => {
        if (!hasAddedGeneratedAction.current && quest) {
          addBotAction({
            id: "ic-light-background-generated",
            type: ActionType.CHECK_IMAGE,
            content: {
              id: "ic-light-background-generated",
              image: v.data.result[0],
              quest: quest ?? ""
            }
          });
          hasAddedGeneratedAction.current = true;
        }
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
  const isDisabled = useMemo(() => !prompt || !image || !background, [prompt, image, background]);
  return (
    <>
      <InteractiveWrapper
        title="IC Light Background"
        isLoading={isLoading}
        inputs={[
          <TextInput key="input-1" label="Prompt" value={prompt} setValue={setPrompt} />,
          <ImageInput key="input-2" label="Image" value={image} setValue={setImage} />,
          <ImageInput key="input-3" label="Background Image" value={background} setValue={setBackground} />
        ]}
        outputs={[<ImageOutput key="output-1" value={output} isLoading={isLoading} />]}
        example={[
          <Examples
            key="example-1"
            src={
              "https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2F%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%20(2).png?alt=media&token=c1a11e91-8cea-4c3b-8c83-108686d3e738"
            }
          />
        ]}
        onGenerate={onGenerate}
        isDisabled={isDisabled}
      />
    </>
  );
}
