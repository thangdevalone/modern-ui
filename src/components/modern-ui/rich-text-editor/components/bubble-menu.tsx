import { Button } from "@/components/modern-ui/button";
import {
  BubbleMenu,
  isNodeSelection,
} from "@tiptap/react";
import {
  Bold,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { Editor } from "@tiptap/core";
import { LinkInput } from "./link-input";
interface EditorBubbleMenuProps {
  editor: Editor;
  setLink: (url: string) => void;
}

export const EditorBubbleMenu = ({ editor, setLink }: EditorBubbleMenuProps) => {
  const [showLinkInput, setShowLinkInput] = useState(false);

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor, from, to }) => {
          // Only show for text selections, not for tables or other node selections
          return from !== to && 
                 !isNodeSelection(editor.state.selection) &&
                 !editor.isActive("codeBlock");
        }}
        updateDelay={0}
      >
        <div className="flex rounded-md overflow-hidden border shadow-sm divide-x bg-white">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2.5"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2.5"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2.5"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            data-active={editor.isActive("underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2.5"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive("strike")}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2.5"
            onClick={() => {
              if (editor.isActive("link")) {
                editor.chain().focus().unsetLink().run();
              } else {
                setShowLinkInput(!showLinkInput);
              }
            }}
            data-active={editor.isActive("link") || showLinkInput}
          >
            <Link className="h-4 w-4" />
          </Button>

          {showLinkInput && (
            <div className="flex items-center">
              <LinkInput
                onSubmit={(url: string) => {
                  setLink(url);
                  setShowLinkInput(false);
                }}
                onClose={() => setShowLinkInput(false)}
              />
            </div>
          )}
        </div>
      </BubbleMenu>
    </>
  );
}; 