"use client";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export interface ImageOutputProps {
  label?: string;
  value: string;
}

export default function ImageOutput({ label = "Image Output", value }: ImageOutputProps) {
  return (
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      <center className="w-full h-full">
        {/* <Image src={value} alt="output image" width={400} height={400} /> */}
      </center>
    </div>
  );
}
