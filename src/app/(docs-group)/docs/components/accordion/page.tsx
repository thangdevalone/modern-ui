import Contents from '@/mdx/docs/accordion.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Accordion | Modern UI",
  description: "A vertically stacked set of interactive headings that reveal or hide associated content.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="accordion"/>
  </>;
} 