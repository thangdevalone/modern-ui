import Contents from '@/mdx/breadcrumb.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Breadcrumb | Modern UI",
  description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="breadcrumb"/>
  </>;
} 