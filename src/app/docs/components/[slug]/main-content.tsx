"use client";
import {motion} from 'framer-motion';
import Link from 'next/link';
import {ChevronRight, RefreshCw} from 'lucide-react';
import {formatSlug} from '@/lib/utils';
import {MarkdownRenderer} from '@/components/markdown-renderer';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {useState} from 'react';

export function MainContent({content, slug, noPreview = false}: {
  content: string,
  slug: string,
  noPreview?: boolean
}) {
  const [activeTab, setActiveTab] = useState("preview");
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}}>
      <div className="max-w-3xl mx-auto">
        <div
          className="mb-4 text-sm flex flex-row items-center gap-2 text-muted-foreground"
        >
          <Link href={"/docs"}>Docs</Link> <ChevronRight className="w-4 h-4"/> <Link
          href={"/docs/components"}>Components</Link> <ChevronRight className="w-4 h-4"/>
          <strong>{formatSlug(slug)}</strong>
        </div>
        {!noPreview && <Tabs defaultValue="preview" className="mb-8" onValueChange={(value) => setActiveTab(value)}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[300px]">
            <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4"/>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="code" className="p-6 border rounded-md mt-2">
                <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
                  {`<div className="absolute inset-0 bg-dot-pattern opacity-10"></div>`}
                </pre>
          </TabsContent>
        </Tabs>}
        <MarkdownRenderer content={content}/>
      </div>
    </motion.div>
  );

}