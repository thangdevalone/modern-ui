import { Button } from "@/components/modern-ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/modern-ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Textarea } from "@/components/modern-ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";
import { Download, FileText, FileJson, FileCode, Copy, CheckCircle2 } from "lucide-react";
import { useState, useCallback } from "react";

interface EditorExportDialogProps {
  editor: any;
  exportFormat: string;
  setExportFormat: (format: string) => void;
  exportContent: string;
  setExportContent: (content: string) => void;
  turndownService: React.MutableRefObject<any>;
  exportToFormat: () => { content: string; fileExtension: string; mimeType: string };
  copyToClipboard: () => void;
  downloadFile: () => void;
}

export const EditorExportDialog = ({
  editor,
  exportFormat,
  setExportFormat,
  exportContent,
  setExportContent,
  turndownService,
  exportToFormat,
  copyToClipboard,
  downloadFile,
}: EditorExportDialogProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyToClipboard();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [copyToClipboard]);

  return (
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
          <TabsContent value="html" className="mt-4 border rounded p-1">
            <Textarea
              value={exportContent || editor.getHTML()}
              readOnly
              className="h-[200px] font-mono text-sm resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </TabsContent>
          <TabsContent value="json" className="mt-4 border rounded p-1">
            <Textarea
              value={
                exportContent || JSON.stringify(editor.getJSON(), null, 2)
              }
              readOnly
              className="h-[200px] font-mono text-sm resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </TabsContent>
          <TabsContent value="markdown" className="mt-4 border rounded p-1">
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
            onClick={handleCopy}
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
          <Button type="button" onClick={downloadFile} className="gap-1">
            <Download className="h-4 w-4" />
            Download File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 