import Contents from '@/mdx/dialog.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Dialog | Modern UI",
  description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="dialog"/>
  </>;
} 