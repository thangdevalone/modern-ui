import { BubbleMenu } from "@tiptap/react";
import { Button } from "@/components/modern-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/modern-ui/dialog";
import { Input } from "@/components/modern-ui/input";
import { Label } from "@/components/modern-ui/label";
import {
  Bold,
  Italic,
  Strikethrough,
  UnderlineIcon,
  Type,
  LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface EditorBubbleMenuProps {
  editor: any;
  setLink: (url: string) => void;
}

export const EditorBubbleMenu = ({ editor, setLink }: EditorBubbleMenuProps) => {
  const [linkUrl, setLinkUrl] = useState("");
  
  const handleSetLink = () => {
    setLink(linkUrl);
    setLinkUrl("");
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) => {
        const { selection } = editor.state;
        return !selection.empty && !editor.isActive("image");
      }}
      className="bg-white rounded shadow-lg border border-gray-200 p-1 flex gap-1"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "h-7 w-7 p-0 rounded",
          editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        <Bold className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "h-7 w-7 p-0 rounded",
          editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        <Italic className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          "h-7 w-7 p-0 rounded",
          editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        <UnderlineIcon className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          "h-7 w-7 p-0 rounded",
          editor.isActive("strike") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        <Strikethrough className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={cn(
          "h-7 w-7 p-0 rounded",
          editor.isActive("highlight") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        <Type className="h-3.5 w-3.5" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 w-7 p-0 rounded",
              editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"
            )}
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bubbleUrl">URL</Label>
              <Input
                id="bubbleUrl"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleSetLink}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BubbleMenu>
  );
}; 