"use client";

import type React from "react";

import { Button, buttonVariants } from "@/components/modern-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/modern-ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/modern-ui/dropdown-menu";
import { Input } from "@/components/modern-ui/input";
import { Label } from "@/components/modern-ui/label";
import { Slider } from "@/components/modern-ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Textarea } from "@/components/modern-ui/textarea";
import { Toggle } from "@/components/modern-ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";
import { cn } from "@/lib/utils";
import { Extension } from "@tiptap/core";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
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
import {
  BubbleMenu,
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Code,
  Copy,
  Download,
  FileCode,
  FileJson,
  FileText,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ImageUp,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Minus,
  MoreVertical,
  PenTool,
  Plus,
  Quote,
  Redo,
  Square,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  TableIcon,
  Type,
  UnderlineIcon,
  Undo,
  Unlink,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import TurndownService from "turndown";
import { VisuallyHidden } from "./visually-hidden";

interface RichTextEditorProps {
  initialContent?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  className?: string;
  customExtensions?: Extension[];
  value?: string;
  onValueChange?: (value: string) => void;
}

// Color Picker Component
const ColorPickerInput = ({
  initialColor,
  onChange,
  allowEmpty = false,
}: {
  initialColor: string;
  onChange: (color: string) => void;
  allowEmpty?: boolean;
}) => {
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

// Custom Image extension with delete button
const CustomImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer((props: any) => {
      const deleteNode = () => {
        if (!props.editor) return;

        try {
          const pos = props.getPos();

          if (typeof pos !== "number") return;

          const { state } = props.editor;
          const tr = state.tr;

          const node = tr.doc.nodeAt(pos);

          if (node) {
            tr.delete(pos, pos + node.nodeSize);
            props.editor.view.dispatch(tr);
          }
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      };

      return (
        <NodeViewWrapper>
          <div className="relative inline-block group">
            <img
              src={props.node.attrs.src}
              alt={props.node.attrs.alt || ""}
              className="max-w-full rounded-md border group-hover:brightness-80 transition-all"
            />
            <X
              size={12}
              onClick={deleteNode}
              className="absolute top-1 right-1 text-white w-5 h-5 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </NodeViewWrapper>
      );
    });
  },
});

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
  const [isCopied, setIsCopied] = useState(false);
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

  // Reset copied state when changing export format
  useEffect(() => {
    setIsCopied(false);
  }, [exportFormat]);

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
    if (!editor) return;

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
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);

        toast.success("Content copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, [exportFormat, exportToFormat]);
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
  }, [exportFormat, exportToFormat]);

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
  }, [editor, excalidrawImage, excalidrawWidth]);

  const captureExcalidrawImage = useCallback(() => {
    if (excalidrawIframeRef.current) {
      // Send a message to the Excalidraw iframe to request the image
      excalidrawIframeRef.current.contentWindow?.postMessage(
        { type: "get-image" },
        "*"
      );

      // For demonstration purposes, we'll simulate receiving an image
      // In a real implementation, you would handle the postMessage response
      // This is a placeholder until we implement proper communication with Excalidraw
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
        <div className="editor-toolbar border-b bg-background gap-2 flex flex-wrap items-center sticky top-0 z-10 p-2 overflow-x-auto">
          {/* Group 1: Undo/Redo */}
          <div className="flex items-center gap-0.5 h-8 rounded-md border overflow-hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </div>

          {/* Group 2: Paragraph */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-normal justify-between gap-1 px-2"
                  >
                    {paragraphType === "paragraph" && "Paragraph"}
                    {paragraphType === "heading1" && (
                      <div className="flex items-center gap-2">
                        <Heading1Icon className="h-3.5 w-3.5" /> Heading 1
                      </div>
                    )}
                    {paragraphType === "heading2" && (
                      <div className="flex items-center gap-2">
                        <Heading2Icon className="h-3.5 w-3.5" /> Heading 2
                      </div>
                    )}
                    {paragraphType === "heading3" && (
                      <div className="flex items-center gap-2">
                        <Heading3Icon className="h-3.5 w-3.5" /> Heading 3
                      </div>
                    )}
                    {paragraphType === "bulletList" && (
                      <div className="flex items-center gap-2">
                        <List className="h-3.5 w-3.5" /> Bulleted List
                      </div>
                    )}
                    {paragraphType === "orderedList" && (
                      <div className="flex items-center gap-2">
                        <ListOrdered className="h-3.5 w-3.5" /> Numbered List
                      </div>
                    )}
                    {paragraphType === "checkList" && (
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-3.5 w-3.5" /> Check List
                      </div>
                    )}
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[180px]">
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("paragraph")}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm">Paragraph</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("heading1")}
                    className="flex items-center gap-2"
                  >
                    <Heading1Icon className="h-3.5 w-3.5" /> Heading 1
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("heading2")}
                    className="flex items-center gap-2"
                  >
                    <Heading2Icon className="h-3.5 w-3.5" /> Heading 2
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("heading3")}
                    className="flex items-center gap-2"
                  >
                    <Heading3Icon className="h-3.5 w-3.5" /> Heading 3
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("orderedList")}
                    className="flex items-center gap-2"
                  >
                    <ListOrdered className="h-4 w-4" />
                    <span>Numbered List</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("bulletList")}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    <span>Bulleted List</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("checkList")}
                    className="flex items-center gap-2"
                  >
                    <CheckSquare className="h-4 w-4" />
                    <span>Check List</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("codeBlock")}
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    <span>Code Block</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleParagraphChange("quote")}
                    className="flex items-center gap-2"
                  >
                    <Quote className="h-4 w-4" />
                    <span>Quote</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Paragraph style</TooltipContent>
          </Tooltip>

          {/* Group 3: Font */}
          <div className="flex items-center gap-0.5 bg-background rounded-md border h-8 overflow-hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs font-normal justify-between gap-1 w-[80px]"
                    >
                      {fontFamily}
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleFontFamilyChange("Arial")}
                    >
                      Arial
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFontFamilyChange("Times New Roman")}
                    >
                      Times New Roman
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFontFamilyChange("Courier New")}
                    >
                      Courier New
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFontFamilyChange("Georgia")}
                    >
                      Georgia
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFontFamilyChange("Verdana")}
                    >
                      Verdana
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>Font family</TooltipContent>
            </Tooltip>

            <div className="flex items-center h-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFontSizeChange(Math.max(8, fontSize - 1))}
                className="h-8 w-8 hover:bg-background"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-1.5 text-xs">{fontSize}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFontSizeChange(Math.min(72, fontSize + 1))}
                className="h-8 w-8 hover:bg-background"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Group 4: Text Formatting */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs font-normal justify-between gap-1 w-[120px]"
                  >
                    Text Format
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-wrap gap-1 p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("bold") && "bg-gray-200"
                    )}
                  >
                    <Bold className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("italic") && "bg-gray-200"
                    )}
                  >
                    <Italic className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("underline") && "bg-gray-200"
                    )}
                  >
                    <UnderlineIcon className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("strike") && "bg-gray-200"
                    )}
                  >
                    <Strikethrough className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().toggleSuperscript().run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("superscript") && "bg-gray-200"
                    )}
                  >
                    <SuperscriptIcon className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().toggleSubscript().run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("subscript") && "bg-gray-200"
                    )}
                  >
                    <SubscriptIcon className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Text formatting options</TooltipContent>
          </Tooltip>

          {/* Group 5: Color & Highlight */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs font-normal justify-between gap-1 w-[80px]"
                  >
                    Colors
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 min-w-[250px]">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs mb-1 block">Text Color</Label>
                      <ColorPickerInput
                        initialColor={textColor}
                        onChange={handleTextColorChange}
                        allowEmpty={false}
                      />
                      <div className="grid grid-cols-10 gap-1">
                        {textColorPresets.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "w-5 h-5 rounded-sm border border-gray-300",
                              textColor === color && "ring-2 ring-blue-500"
                            )}
                            style={{ backgroundColor: color }}
                            onClick={() => handleTextColorChange(color)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs mb-1 block">
                        Background Color
                      </Label>
                      <ColorPickerInput
                        initialColor={bgColor}
                        onChange={handleBgColorChange}
                        allowEmpty={true}
                      />
                      <div className="grid grid-cols-10 gap-1">
                        {bgColorPresets.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "w-5 h-5 rounded-sm border border-gray-300",
                              bgColor === color && "ring-2 ring-blue-500",
                              !color && "bg-white relative"
                            )}
                            style={{ backgroundColor: color || "white" }}
                            onClick={() => handleBgColorChange(color)}
                          >
                            {!color && (
                              <div className="absolute inset-0 flex items-center justify-center text-red-500 text-xs">
                                ✕
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Color options</TooltipContent>
          </Tooltip>

          {/* Group 6: Alignment */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs font-normal justify-between gap-1 w-[90px]"
                  >
                    Alignment
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive({ textAlign: "left" }) && "bg-gray-200"
                    )}
                  >
                    <AlignLeft className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive({ textAlign: "center" }) && "bg-gray-200"
                    )}
                  >
                    <AlignCenter className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive({ textAlign: "right" }) && "bg-gray-200"
                    )}
                  >
                    <AlignRight className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("justify").run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive({ textAlign: "justify" }) && "bg-gray-200"
                    )}
                  >
                    <AlignJustify className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Text alignment</TooltipContent>
          </Tooltip>

          {/* Group 7: Lists */}
          <div className="flex items-center gap-0.5 bg-background rounded-md h-8 overflow-hidden border">
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={cn(
                    "h-8 w-8",
                    editor.isActive("bulletList") && "bg-muted"
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Bullet list</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={cn(
                    "h-8 w-8",
                    editor.isActive("orderedList") && "bg-muted"
                  )}
                >
                  <ListOrdered className="h-3.5 w-3.5" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Numbered list</TooltipContent>
            </Tooltip>
          </div>

          {/* Group 8: Links */}
          <div className="flex items-center gap-0.5 bg-background rounded-md h-8 overflow-hidden border">
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        editor.isActive("link") && "bg-muted"
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
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
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
                        <Button type="button" onClick={setLink}>
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Insert link</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  disabled={!editor.isActive("link")}
                  className="h-8 w-8"
                >
                  <Unlink className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove link</TooltipContent>
            </Tooltip>
          </div>

          {/* Group 9: Insert */}
          <div className="flex items-center gap-0.5 bg-background rounded-md h-8 overflow-hidden border">
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-3.5 w-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Insert Image from URL</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="imageAlt">Alt Text</Label>
                        <Input
                          id="imageAlt"
                          placeholder="Image description"
                          value={imageAlt}
                          onChange={(e) => setImageAlt(e.target.value)}
                        />
                      </div>
                      {imageUrl && (
                        <div className="grid gap-2">
                          <Label>Preview</Label>
                          <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="max-h-48 object-contain rounded-md"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          onClick={addImageByUrl}
                          disabled={!imageUrl}
                        >
                          Insert
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Insert image from URL</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Label
                  htmlFor="image-upload"
                  className={cn(
                    "w-8 h-8",
                    buttonVariants({ variant: "ghost" })
                  )}
                >
                  <ImageUp className="h-3.5 w-3.5" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </Label>
              </TooltipTrigger>
              <TooltipContent>Upload image</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={addTable}
                  className="h-8 w-8"
                >
                  <TableIcon className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert table</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog
                  open={isExcalidrawDialogOpen}
                  onOpenChange={setIsExcalidrawDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <PenTool className="h-3.5 w-3.5" />
                    </Button>
                  </DialogTrigger>
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
                        {/* Custom overlay controls to match the Excalidraw interface */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center bg-white border-t">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Minus className="h-4 w-4 mr-1" />
                              <span>100%</span>
                              <Plus className="h-4 w-4 ml-1" />
                            </Button>

                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Undo className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Redo className="h-4 w-4" />
                              </Button>
                            </div>
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
                              <Label
                                htmlFor="drawing-width"
                                className="text-xs"
                              >
                                Width: {excalidrawWidth}%
                              </Label>
                              <Slider
                                id="drawing-width"
                                min={10}
                                max={100}
                                step={5}
                                value={[excalidrawWidth]}
                                onValueChange={(value) =>
                                  setExcalidrawWidth(value[0])
                                }
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
              </TooltipTrigger>
              <TooltipContent>Draw with Excalidraw</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            shouldShow={({ editor }) => !editor.isActive("image")}
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
                editor.isActive("underline")
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
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
                editor.isActive("highlight")
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
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
                    editor.isActive("link")
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
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
                    <Button type="button" onClick={setLink}>
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </BubbleMenu>
        )}

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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded text-gray-500 hover:bg-gray-100"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Export Content</DialogTitle>
                    </DialogHeader>
                    <Tabs
                      defaultValue="html"
                      onValueChange={setExportFormat}
                      className="mt-2"
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="html">
                          <FileText className="mr-2 h-4 w-4" />
                          HTML
                        </TabsTrigger>
                        <TabsTrigger value="json">
                          <FileJson className="mr-2 h-4 w-4" />
                          JSON
                        </TabsTrigger>
                        <TabsTrigger value="markdown">
                          <FileCode className="mr-2 h-4 w-4" />
                          Markdown
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="html"
                        className="mt-4 border rounded p-1"
                      >
                        <Textarea
                          value={exportContent || editor.getHTML()}
                          readOnly
                          className="h-[200px] font-mono text-sm resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </TabsContent>
                      <TabsContent
                        value="json"
                        className="mt-4 border rounded p-1"
                      >
                        <Textarea
                          value={
                            exportContent ||
                            JSON.stringify(editor.getJSON(), null, 2)
                          }
                          readOnly
                          className="h-[200px] font-mono text-sm resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </TabsContent>
                      <TabsContent
                        value="markdown"
                        className="mt-4 border rounded p-1"
                      >
                        <Textarea
                          value={
                            exportContent ||
                            turndownService.current.turndown(editor.getHTML())
                          }
                          readOnly
                          className="h-[200px] font-mono text-sm resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </TabsContent>
                    </Tabs>
                    <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        onClick={copyToClipboard}
                        variant="outline"
                        className="gap-1"
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy to Clipboard
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={downloadFile}
                        className="gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Download File
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
