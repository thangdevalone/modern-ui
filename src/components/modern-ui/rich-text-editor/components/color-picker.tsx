import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { Square, Type } from "lucide-react";
import { useEffect, useState } from "react";

interface ColorPickerInputProps {
  initialColor: string;
  onChange: (color: string) => void;
  allowEmpty?: boolean;
}

export const ColorPickerInput = ({
  initialColor,
  onChange,
  allowEmpty = false,
}: ColorPickerInputProps) => {
  const [localColor, setLocalColor] = useState(initialColor);

  // Update local state if parent color changes
  useEffect(() => {
    setLocalColor(initialColor);
  }, [initialColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value);
  };

  const handleBlur = () => {
    onChange(localColor);
  };

  const handleReset = () => {
    const resetColor = allowEmpty ? "" : "#000000";
    setLocalColor(resetColor);
    onChange(resetColor);
  };

  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-1">
        <Input
          type="color"
          value={localColor || "#ffffff"}
          onChange={handleColorChange}
          onBlur={handleBlur}
          className="w-8 h-6 p-0 border-0"
        />
        <Input
          type="text"
          value={localColor}
          onChange={handleColorChange}
          onBlur={handleBlur}
          className="w-20 h-6 text-xs"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleReset}
        className="h-6 w-6 rounded text-gray-700 hover:bg-gray-100"
      >
        {allowEmpty ? (
          <Square className="h-3.5 w-3.5" />
        ) : (
          <Type className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  );
}; 