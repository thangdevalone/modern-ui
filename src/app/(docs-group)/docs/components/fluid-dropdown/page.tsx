import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/docs/fluid-dropdown.mdx";

export default function Page() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="fluid-dropdown" />
    </>
  );
} 