import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/docs/underline-tabs.mdx";

export default function Page() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="underline-tabs" />
    </>
  );
}
