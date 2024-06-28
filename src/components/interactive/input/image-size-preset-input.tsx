import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { X } from "lucide-react";

export interface ImageSizePresetInputProps {
  label?: string;
  width: string;
  setWidth: (value: string) => void;
  widthPresets: string[];
  height: string;
  setHeight: (value: string) => void;
  heightPresets: string[];
}

export default function ImageSizePresetInput({
  label = "Width X Height (pixels)",
  width,
  setWidth,
  widthPresets,
  height,
  setHeight,
  heightPresets
}: ImageSizePresetInputProps) {
  return (
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      <div className="flex items-center gap-2 mt-2 text-black">
        <Select value={width} onValueChange={(v) => setWidth(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Width" />
          </SelectTrigger>
          <SelectContent>
            {widthPresets.map((preset, index) => (
              <SelectItem key={index} value={preset}>
                {preset} pixels
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <X className="w-4 h-4" />
        <Select value={height} onValueChange={(v) => setHeight(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Height" />
          </SelectTrigger>
          <SelectContent>
            {heightPresets.map((preset, index) => (
              <SelectItem key={index} value={preset}>
                {preset} pixels
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
