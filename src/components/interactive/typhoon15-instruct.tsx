"use client";
import { useState } from "react";
import InteractiveWrapper from "./interactive-wrapper";
import TextInput from "./input/text-input";
import axios from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import TextOutput from "./output/text-output";

export default function TyphoonInstruct() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onGenerate = async () => {
    setIsLoading(true);
    const prompt = `Write me a name for my product listing on e-commerce website. The name should be clear and give high conversion rate and easy to appear on search. Here is some example name 1. ${input1} 2. ${input2} 3. ${input3} \n My Product Name:`;
    
    try {
      const response = await axios.post("/api/typhoon", {
        messages: [{ type: "user", text: prompt }]
      });

      setOutput(response.data.reply);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to generate text", error);
      toast({
        title: "Error",
        description: "Failed to generate text"
      });
      setIsLoading(false);
    }
  };

  return (
    <InteractiveWrapper
      title="Typhoon instruct v1.5x"
      isLoading={isLoading}
      inputs={[
        <TextInput key="input-1" label="สินค้าชิ้นที่ 1" value={input1} setValue={setInput1} />,
        <TextInput key="input-2" label="สินค้าชิ้นที่ 2" value={input2} setValue={setInput2} />,
        <TextInput key="input-3" label="สินค้าชิ้นที่ 3" value={input3} setValue={setInput3} />
      ]}
      outputs={[<TextOutput key="output-1" label="Generated Text" value={output} />]}
      onGenerate={onGenerate}
    />
  );
}
