import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/radio.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radio | Modern UI",
  description:
    "A radio group component built on top of Radix UI's Radio Group, providing a set of checkable buttons where only one can be checked at a time.",
};

export default function RadioPage() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="radio" />
    </>
  );
}
