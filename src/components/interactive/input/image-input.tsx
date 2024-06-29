import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface TextInputProps {
  label: string;
  description?: string;
  value: string;
  setValue: (value: string) => void;
}

export default function TextInput({ label, description, value, setValue }: TextInputProps) {
  return (
    <div className="flex flex-col">
      <Label className="text-lg">{label}</Label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <Input
        className="mt-2 text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something here..."
      />
    </div>
  );
}
