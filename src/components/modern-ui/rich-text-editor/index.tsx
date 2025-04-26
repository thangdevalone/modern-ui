"use client";

import type React from "react";

import { Button } from "@/components/modern-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/modern-ui/dialog";
import { Label } from "@/components/modern-ui/label";
import { Slider } from "@/components/modern-ui/slider";
import { VisuallyHidden } from "@/components/modern-ui/visually-hidden";
import { cn } from "@/lib/utils";
import { Extension } from "@tiptap/core";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import TurndownService from "turndown";
import { EditorToolbar } from "./components/toolbar";
import { EditorBubbleMenu } from "./components/bubble-menu";
import { CustomImage } from "./components/custom-image";
import { EditorExportDialog } from "./components/export-dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/modern-ui/tooltip";

interface RichTextEditorProps {
  initialContent?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  className?: string;
  customExtensions?: Extension[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function RichTextEditor({
  initialContent = "",
  placeholder = "Type something...",
  onChange,
  className,
  customExtensions = [],
  value,
  onValueChange,
}: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [exportContent, setExportContent] = useState("");
  const [exportFormat, setExportFormat] = useState("html");
  const [wordCount, setWordCount] = useState({ characters: 0, words: 0 });
  const [paragraphType, setParagraphType] = useState("paragraph");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [excalidrawImage, setExcalidrawImage] = useState<string | null>(null);
  const [excalidrawWidth, setExcalidrawWidth] = useState(100);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("");
  const [isExcalidrawDialogOpen, setIsExcalidrawDialogOpen] = useState(false);
  const excalidrawIframeRef = useRef<HTMLIFrameElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const turndownService = useRef(new TurndownService());
  const isControlled = value !== undefined;

  const textColorPresets = [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
    "#e6b8af",
    "#f4cccc",
    "#fce5cd",
    "#fff2cc",
    "#d9ead3",
    "#d0e0e3",
    "#c9daf8",
    "#cfe2f3",
    "#d9d2e9",
    "#ead1dc",
  ];

  const bgColorPresets = [
    "",
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#b7b7b7",
    "#cccccc",
    "#d9d9d9",
    "#efefef",
    "#f3f3f3",
    "#ffffff",
    "#980000",
    "#ff0000",
    "#ff9900",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
    "#e6b8af",
    "#f4cccc",
    "#fce5cd",
    "#fff2cc",
    "#d9ead3",
    "#d0e0e3",
    "#c9daf8",
    "#cfe2f3",
    "#d9d2e9",
    "#ead1dc",
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          // Default configuration for code blocks
          HTMLAttributes: {},
        },
      }),
      Highlight,
      Typography,
      CustomImage.configure({
        HTMLAttributes: {
          class: "resizable-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline underline-offset-2",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Superscript,
      Subscript,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "rich-text-table",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "rich-text-table-header",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "rich-text-table-cell",
        },
      }),
      TextStyle,
      Color,
      FontFamily,
      ...customExtensions,
    ],
    content: isControlled ? value : initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
      onValueChange?.(html);

      // Update word count
      const text = editor.getText();
      setWordCount({
        characters: text.length,
        words: text.split(/\s+/).filter((word) => word.length > 0).length,
      });
    },
    // Fix for SSR hydration mismatches
    immediatelyRender: false,
  });

  // Handle controlled component updates
  useEffect(() => {
    if (editor && isControlled && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value, isControlled]);

  useEffect(() => {
    if (editor && initialContent && !editor.getText() && !isControlled) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent, isControlled]);

  // Setup communication with Excalidraw iframe
  useEffect(() => {
    const handleExcalidrawMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "excalidraw-image") {
        setExcalidrawImage(event.data.imageData);
      }
    };

    window.addEventListener("message", handleExcalidrawMessage);
    return () => {
      window.removeEventListener("message", handleExcalidrawMessage);
    };
  }, []);

  // Handle Excalidraw dialog state
  useEffect(() => {
    if (!isExcalidrawDialogOpen) {
      setExcalidrawImage(null);
    }
  }, [isExcalidrawDialogOpen]);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();

    setLinkUrl("");
  }, [editor, linkUrl]);

  const addImageByUrl = useCallback(() => {
    if (!editor || !imageUrl) return;

    // Use insertContent instead of setImage to have more control
    editor
      .chain()
      .focus()
      .insertContent({
        type: "image",
        attrs: { src: imageUrl, alt: imageAlt },
      })
      .run();

    setImageUrl("");
    setImageAlt("");
  }, [editor, imageUrl, imageAlt]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editor || !e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          // Use insertContent instead of setImage for consistent behavior
          editor
            .chain()
            .focus()
            .insertContent({
              type: "image",
              attrs: { src: reader.result, alt: file.name },
            })
            .run();

          // Reset the input so the same file can be selected again
          e.target.value = "";
        }
      };

      reader.readAsDataURL(file);
    },
    [editor]
  );

  const addTable = useCallback(() => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const exportToFormat = useCallback(() => {
    if (!editor) return {
      content: "",
      fileExtension: "html",
      mimeType: "text/html"
    };

    let content = "";
    let fileExtension = "";
    let mimeType = "";

    switch (exportFormat) {
      case "html":
        content = editor.getHTML();
        fileExtension = "html";
        mimeType = "text/html";
        break;
      case "json":
        content = JSON.stringify(editor.getJSON(), null, 2);
        fileExtension = "json";
        mimeType = "application/json";
        break;
      case "markdown":
        content = turndownService.current.turndown(editor.getHTML());
        fileExtension = "md";
        mimeType = "text/markdown";
        break;
      default:
        content = editor.getHTML();
        fileExtension = "html";
        mimeType = "text/html";
    }

    setExportContent(content);

    return { content, fileExtension, mimeType };
  }, [editor, exportFormat]);

  const copyToClipboard = useCallback(() => {
    const result = exportToFormat();
    if (!result) return;

    const { content } = result;

    // Copy to clipboard
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success("Content copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, [exportToFormat]);

  const downloadFile = useCallback(() => {
    const result = exportToFormat();
    if (!result) return;

    const { content, fileExtension, mimeType } = result;

    // Create a timestamp for the filename
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .substring(0, 19);
    const filename = `document-${timestamp}.${fileExtension}`;

    // Create a blob with the content
    const blob = new Blob([content], { type: mimeType });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Click the link to trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("File downloaded");
  }, [exportToFormat]);

  const handleParagraphChange = useCallback(
    (type: string) => {
      if (!editor) return;

      setParagraphType(type);

      switch (type) {
        case "paragraph":
          editor.chain().focus().setParagraph().run();
          break;
        case "heading1":
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case "heading2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "heading3":
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case "bulletList":
          editor.chain().focus().toggleBulletList().run();
          break;
        case "orderedList":
          editor.chain().focus().toggleOrderedList().run();
          break;
        case "checkList":
          // This would require a task list extension
          editor.chain().focus().toggleBulletList().run();
          break;
        case "codeBlock":
          editor.chain().focus().toggleCodeBlock().run();
          break;
        case "quote":
          editor.chain().focus().toggleBlockquote().run();
          break;
        default:
          editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  const handleFontSizeChange = useCallback((size: number) => {
    setFontSize(size);
    // This would require a font size extension
  }, []);

  const handleFontFamilyChange = useCallback(
    (font: string) => {
      if (!editor) return;
      setFontFamily(font);
      editor.chain().focus().setFontFamily(font).run();
    },
    [editor]
  );

  const handleTextColorChange = useCallback(
    (color: string) => {
      if (!editor) return;
      setTextColor(color);
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );

  const handleBgColorChange = useCallback(
    (color: string) => {
      if (!editor) return;
      setBgColor(color);
      if (color) {
        editor.chain().focus().setMark("highlight", { color }).run();
      } else {
        editor.chain().focus().unsetMark("highlight").run();
      }
    },
    [editor]
  );

  const saveExcalidrawImage = useCallback(() => {
    if (!editor || !excalidrawImage) return;

    // Insert the Excalidraw image into the editor
    editor
      .chain()
      .focus()
      .setImage({
        src: excalidrawImage,
        alt: "Excalidraw drawing",
      })
      .run();

    // Close the dialog
    setIsExcalidrawDialogOpen(false);
    setExcalidrawImage(null);
  }, [editor, excalidrawImage]);

  const captureExcalidrawImage = useCallback(() => {
    if (excalidrawIframeRef.current) {
      // Send a message to the Excalidraw iframe to request the image
      excalidrawIframeRef.current.contentWindow?.postMessage(
        { type: "get-image" },
        "*"
      );

      // For demonstration purposes, we'll simulate receiving an image
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw a simple placeholder image
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("Excalidraw Drawing", 50, 50);

        // Convert to data URL
        const imageData = canvas.toDataURL("image/png");
        setExcalidrawImage(imageData);
      }
    }
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={editorContainerRef}
        className={cn(
          "rich-text-editor border rounded-md shadow-sm overflow-hidden bg-background",
          className
        )}
      >
        <EditorToolbar
          editor={editor}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          imageAlt={imageAlt}
          setImageAlt={setImageAlt}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          paragraphType={paragraphType}
          setParagraphType={setParagraphType}
          fontSize={fontSize}
          setFontSize={handleFontSizeChange}
          fontFamily={fontFamily}
          setFontFamily={handleFontFamilyChange}
          textColor={textColor}
          setTextColor={handleTextColorChange}
          bgColor={bgColor}
          setBgColor={handleBgColorChange}
          setIsExcalidrawDialogOpen={setIsExcalidrawDialogOpen}
          handleImageUpload={handleImageUpload}
          addImageByUrl={addImageByUrl}
          setLink={setLink}
          addTable={addTable}
          textColorPresets={textColorPresets}
          bgColorPresets={bgColorPresets}
          handleParagraphChange={handleParagraphChange}
        />

        {/* Excalidraw Dialog */}
        <Dialog
          open={isExcalidrawDialogOpen}
          onOpenChange={setIsExcalidrawDialogOpen}
        >
          <DialogContent className="sm:max-w-[90vw] h-[90vh] p-0">
            <VisuallyHidden>
              <DialogTitle>Draw with Excalidraw</DialogTitle>
            </VisuallyHidden>
            <div className="flex flex-col h-full">
              <div className="flex-1 relative">
                <iframe
                  ref={excalidrawIframeRef}
                  src="https://excalidraw.com/"
                  className="w-full h-full border-0"
                  title="Excalidraw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center bg-white border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-2">
                      <span>100%</span>
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsExcalidrawDialogOpen(false)}
                    >
                      Discard
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800"
                      onClick={captureExcalidrawImage}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              {excalidrawImage && (
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Preview</Label>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="drawing-width" className="text-xs">
                        Width: {excalidrawWidth}%
                      </Label>
                      <Slider
                        id="drawing-width"
                        min={10}
                        max={100}
                        step={5}
                        value={[excalidrawWidth]}
                        onValueChange={(value) => setExcalidrawWidth(value[0])}
                        className="w-32"
                      />
                    </div>
                  </div>
                  <div className="border rounded p-2 bg-background flex justify-center">
                    <img
                      src={excalidrawImage || "/placeholder.svg"}
                      alt="Excalidraw drawing preview"
                      style={{ width: `${excalidrawWidth}%` }}
                      className="max-h-40 object-contain"
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={saveExcalidrawImage}>
                      Insert Drawing
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <EditorBubbleMenu 
          editor={editor} 
          setLink={(url) => {
            setLinkUrl(url);
            setLink();
          }}
        />

        <div className="p-4 prose prose-sm sm:prose max-w-none bg-background min-h-[300px]">
          <EditorContent
            editor={editor}
            className="outline-none min-h-[300px]"
          />
        </div>

        <div className="border-t px-4 py-2 flex justify-between items-center text-sm text-gray-500">
          <div>
            {wordCount.characters} characters | {wordCount.words} words
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <EditorExportDialog
                  editor={editor}
                  exportFormat={exportFormat}
                  setExportFormat={setExportFormat}
                  exportContent={exportContent}
                  setExportContent={setExportContent}
                  turndownService={turndownService}
                  exportToFormat={exportToFormat}
                  copyToClipboard={copyToClipboard}
                  downloadFile={downloadFile}
                />
              </TooltipTrigger>
              <TooltipContent>Export document</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded text-gray-500 hover:bg-gray-100"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More options</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
} 