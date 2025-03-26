import Contents from '@/mdx/button.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>;
    <TocWrapper file="button"/>
  </>;
}