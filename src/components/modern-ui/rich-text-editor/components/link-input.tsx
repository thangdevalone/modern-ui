import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface LinkInputProps {
  onSubmit: (url: string) => void;
  onClose: () => void;
}

export const LinkInput = ({ onSubmit, onClose }: LinkInputProps) => {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url) {
      let formattedUrl = url;
      if (
        formattedUrl &&
        !formattedUrl.startsWith("#") &&
        !formattedUrl.startsWith("/") &&
        !formattedUrl.match(/^[a-zA-Z]+:\/\//)
      ) {
        formattedUrl = `https://${formattedUrl}`;
      }
      onSubmit(formattedUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-1">
      <Input
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="h-7 min-w-[200px] text-sm"
      />
      <div className="flex items-center gap-1 ml-2">
        <Button
          type="submit"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={!url}
        >
          Apply
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </form>
  );
}; 