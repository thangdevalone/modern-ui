import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/docs/textarea.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TextArea - Modern UI",
  description:
    "A form textarea component that provides a clean and accessible way to collect multi-line user input.",
};

export default function page() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="visually-hidden" />
    </>
  );
}
