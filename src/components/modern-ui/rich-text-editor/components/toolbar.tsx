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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ImageUp,
  Italic,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Redo,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { ColorPickerInput } from "./color-picker";

interface EditorToolbarProps {
  editor: any;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  imageAlt: string;
  setImageAlt: (alt: string) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  paragraphType: string;
  setParagraphType: (type: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addImageByUrl: () => void;
  setLink: () => void;
  textColorPresets: string[];
  bgColorPresets: string[];
  handleParagraphChange: (type: string) => void;
}

export const EditorToolbar = ({
  editor,
  imageUrl,
  setImageUrl,
  imageAlt,
  setImageAlt,
  paragraphType,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  handleImageUpload,
  addImageByUrl,
  textColorPresets,
  bgColorPresets,
  handleParagraphChange,
}: EditorToolbarProps) => {
  return (
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
                {paragraphType === "codeBlock" && (
                  <div className="flex items-center gap-2">
                    <Code className="h-3.5 w-3.5" /> Code Block
                  </div>
                )}
                {paragraphType === "quote" && (
                  <div className="flex items-center gap-2">
                    <Quote className="h-3.5 w-3.5" /> Quote
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
                <DropdownMenuItem onClick={() => setFontFamily("Arial")}>
                  Arial
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFontFamily("Times New Roman")}
                >
                  Times New Roman
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("Courier New")}>
                  Courier New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("Georgia")}>
                  Georgia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("Verdana")}>
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
            onClick={() => setFontSize(Math.max(8, fontSize - 1))}
            className="h-8 w-8 hover:bg-background"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            value={fontSize}
            onChange={(e) => {
              const size = parseInt(e.target.value, 10);
              if (!isNaN(size)) {
                setFontSize(size);
              }
            }}
            onBlur={(e) => {
              const size = parseInt(e.target.value, 10);
              if (isNaN(size)) {
                e.target.value = fontSize.toString();
              }
            }}
            className="w-10 h-6 px-1 text-center text-xs border rounded mx-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFontSize(Math.min(72, fontSize + 1))}
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
            <DropdownMenuContent className="p-2">
              <div className="flex flex-wrap gap-1 mb-2">
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
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
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
                  onClick={() => editor.chain().focus().toggleSubscript().run()}
                  className={cn(
                    "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                    editor.isActive("subscript") && "bg-gray-200"
                  )}
                >
                  <SubscriptIcon className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="border-t pt-2 mt-1">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("bulletList") && "bg-gray-200"
                    )}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    className={cn(
                      "h-7 w-7 rounded text-gray-700 hover:bg-gray-100",
                      editor.isActive("orderedList") && "bg-gray-200"
                    )}
                  >
                    <ListOrdered className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
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
                    onChange={setTextColor}
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
                        onClick={() => setTextColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs mb-1 block">Background Color</Label>
                  <ColorPickerInput
                    initialColor={bgColor}
                    onChange={setBgColor}
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
                        onClick={() => setBgColor(color)}
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

      {/* Group 7: Insert */}
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
              className={cn("w-8 h-8", buttonVariants({ variant: "ghost" }))}
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
      </div>
    </div>
  );
};
