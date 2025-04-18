import Contents from '@/mdx/sparkles-text.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Sparkles Text | Modern UI",
  description: "A text component with animated sparkle effects to draw attention to important text elements.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="sparkles-text"/>
  </>;
} 