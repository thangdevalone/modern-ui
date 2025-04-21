import Contents from '@/mdx/docs/sonner.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Sonner | Modern UI",
  description: "A toast component for displaying notifications.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents />
    </MdxLayout>
    <TocWrapper file="sonner"/>
  </>;
} 