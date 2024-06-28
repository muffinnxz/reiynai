import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface InteractiveWrapperProps {
  title: string;
  isLoading?: boolean;
  description?: string;
  inputs: React.ReactNode[];
  advancedInputs?: React.ReactNode[];
  outputs: React.ReactNode[];
  onGenerate?: () => void;
}

export default function InteractiveWrapper({
  title,
  isLoading,
  description,
  inputs,
  advancedInputs,
  outputs,
  onGenerate
}: InteractiveWrapperProps) {
  return (
    <div className="rounded-md border p-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <h3 className="text-xl font-semibold text-muted-foreground">{description}</h3>
      <div className="grid grid-cols-2 mt-2 gap-4">
        <div className="flex flex-col p-4 border rounded-md gap-2">
          {inputs.map((input, index) => (
            <div key={"basic-input-" + index.toString()}>{input}</div>
          ))}
          {advancedInputs && advancedInputs.length > 0 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>ตัวแปรขั้นสูง</AccordionTrigger>
                <AccordionContent>
                  {advancedInputs?.map((input, index) => <div key={"advance-input-" + index.toString()}>{input}</div>)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          <Button disabled={isLoading} className="mt-4" onClick={onGenerate}>
            {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />} Generate
          </Button>
        </div>
        <div className="flex flex-col p-4 border rounded-md gap-2">
          {outputs.map((input, index) => (
            <div key={"output-" + index.toString()}>{input}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
