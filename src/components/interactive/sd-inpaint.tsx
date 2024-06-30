"use client";
import { useEffect, useRef, useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import ImageOutput from "./output/image-output";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import ImageInput from "./input/image-input";
import Examples from "./example/example";
import useUser from "@/hooks/use-user";
import { ActionType } from "@/interfaces/bot";

export default function SDInpaint({ p, i, quest }: { p: string; i: string; quest?: string }) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const [output, setOutput] = useState("");
  const [output2, setOutput2] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { addBotAction, isOpenChat, toggleChat, addBotMessage } = useUser();

  const hasAddedBotAction = useRef(false); // Ref to track if the action has been added
  const hasAddedGeneratedAction = useRef(false); // Ref to track if the generated action has been added

  useEffect(() => {
    if (!hasAddedBotAction.current) {
      addBotAction({
        id: "sd-inpaint",
        type: ActionType.SEND_PRESET,
        content: {
          id: "sd-inpaint",
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

  useEffect(() => {
    if (!hasAddedGeneratedAction.current && quest) {
      addBotMessage(quest);
      hasAddedGeneratedAction.current = true;
      if (!isOpenChat) {
        toggleChat();
      }
    }
  }, [quest]);

  const onGenerate = async () => {
    setIsLoading(true);
    axios
      .post("/replicate", {
        model: "b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
        input: {
          prompt,
          image_path: image,
          image_num: 1,
          product_size: "0.5 * width"
        }
      })
      .then((v) => {
        if (!hasAddedGeneratedAction.current) {
          addBotAction({
            id: "sd-inpaint-generated",
            type: ActionType.CHECK_IMAGE,
            content: {
              id: "sd-inpaint-generated",
              image: v.data.result[1],
              quest
            }
          });
          hasAddedGeneratedAction.current = true;
        }
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
        example={[
          <Examples
            src={
              "https://firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%2FScreenshots%2F%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%A2%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%20(1).png?alt=media&token=f0913176-ddf6-45be-b914-22c0ca88d91e"
            }
          />
        ]}
        onGenerate={onGenerate}
      />
    </>
  );
}
