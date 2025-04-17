import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/sheet.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sheet | Modern UI",
  description:
    "A responsive, accessible dialog component that slides in from the edge of the screen.",
};

export default function SheetPage() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="sheet" />
    </>
  );
}
