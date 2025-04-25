import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/docs/rich-text-editor.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rich Text Editor - Modern UI",
  description:
    "A powerful WYSIWYG editor component built on top of Tiptap that provides a comprehensive solution for text editing with formatting, image embedding, tables, and more.",
};

export default function page() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="rich-text-editor" />
    </>
  );
} 