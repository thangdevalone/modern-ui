import Contents from '@/mdx/visually-hidden.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "VisuallyHidden | Modern UI",
  description: "A component for hiding content visually while keeping it accessible to screen readers.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="visually-hidden"/>
  </>;
} 