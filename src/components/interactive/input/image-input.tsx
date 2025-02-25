import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";

export interface ImagesInputProps {
  label: string;
  description?: string;
  value: string;
  setValue: (value: string) => void;
}

export default function ImageInput({ label, description, value, setValue }: ImagesInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setValue(`data:image/jpeg;base64,${btoa(binaryString)}`);
  };

  const clearImage = () => {
    setValue("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <Input
        type="file"
        id="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(v) => {
          if (v.target.files) {
            const file = v.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = _handleReaderLoaded;
              reader.readAsBinaryString(file);
            }
          }
        }}
        className="w-full cursor-pointer"
      />
      {value && (
        <div className="flex items-center justify-center relative mt-2">
          <Image className="relative" src={value} width={256} height={256} alt="input Image" />
          <Button className="absolute top-1 right-1" size="icon" onClick={clearImage}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
