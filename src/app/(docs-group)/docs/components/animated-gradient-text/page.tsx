import Contents from '@/mdx/docs/animated-gradient-text.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Animated Gradient Text | Modern UI",
  description: "A text component with animated gradient effects.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="animated-gradient-text"/>
  </>;
} 