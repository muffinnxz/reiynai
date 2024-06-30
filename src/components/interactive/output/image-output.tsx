"use client";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export interface ImageOutputProps {
  label?: string;
  value: string;
  isLoading :boolean;
}

export default function ImageOutput({ label = "Image Output", value,isLoading }: ImageOutputProps) {
  const loadingImage = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
  const defaultImage = "https://www.state.co.th/wp-content/uploads/2022/02/placeholder-1.png"
  return (
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      <center className="w-full h-full">
        <Image
          src={isLoading ? loadingImage : (value || defaultImage)}
          alt="output image"
          width={400}
          height={400}
        />
        {/* <Image src={value} alt="output image" width={400} height={400} /> */}
      </center>
    </div>
  );
}
