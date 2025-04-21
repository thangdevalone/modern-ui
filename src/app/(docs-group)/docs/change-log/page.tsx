import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/docs/change-log.mdx";

export const metadata = {
  title: "Change log | Modern UI",
  description:
    "Track all the updates and changes to the Modern UI component library",
};

export default function page() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="change-log" />
    </>
  );
}
