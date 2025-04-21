import Contents from '@/mdx/docs/tooltip.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Tooltip | Modern UI",
  description: "A component for displaying additional information when hovering over an element.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="tooltip"/>
  </>;
} 