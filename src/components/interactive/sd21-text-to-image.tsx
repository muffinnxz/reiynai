"use client";
import { useEffect, useState, useRef } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import ImageSizePresetInput from "./input/image-size-preset-input";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import useUser, { MessageType } from "@/hooks/use-user";
import { ActionType } from "@/interfaces/bot";
import { Preset } from "@/interfaces/course";

export default function SD21TextToImage({ p, w, h, i }: { p: string; w: string; h: string; i: string }) {
  const id = "sd21-text-to-image";
  const { addBotAction, isOpenChat, toggleChat, messages } = useUser();

  const hasAddedBotAction = useRef(false); // Ref to track if the action has been added

  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (!hasAddedBotAction.current) {
      for (let i = 0; i < messages.length; i++) {
        const m = messages[i];
        if (m.type === MessageType.PRESET && (m.content as Preset).id === id) {
          return;
        }
      }
      addBotAction({
        id: id,
        type: ActionType.SEND_PRESET,
        content: {
          presets: {
            Prompt: p,
            Width: w,
            Height: h,
            Image: i
          },
          content: () => {
            setPrompt(p);
            setWidth(w);
            setHeight(h);
          }
        }
      });
      hasAddedBotAction.current = true; // Set the ref to true to indicate the action has been added
      if (!isOpenChat) {
        toggleChat();
      }
    }
  }, [messages, id, addBotAction, p, w, h, i, isOpenChat, toggleChat]);

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
