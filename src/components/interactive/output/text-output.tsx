"use client";
import { Label } from "@/components/ui/label";

export interface TextOutputProps {
  label?: string;
  value: string;
}

export default function TextOutput({ label = "Text Output", value }: TextOutputProps) {
  return (
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      <div className="w-full h-full p-4 bg-gray-100 border border-gray-300 rounded-md">
        <pre className="whitespace-pre-wrap">{value || "No output yet"}</pre>
      </div>
    </div>
  );
}
