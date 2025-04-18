import Contents from '@/mdx/number-counter.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Number Counter | Modern UI",
  description: "An animated counter component that smoothly transitions between number values.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="number-counter"/>
  </>;
} 