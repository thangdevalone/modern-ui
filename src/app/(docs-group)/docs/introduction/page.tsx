import Contents from '@/mdx/docs/docs.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {BreadcrumbNav} from '@/components/breadcrumb-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Introduction | Modern UI",
  description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
};

export default function page() {
  return <>
    <MdxLayout>
      <BreadcrumbNav className="mb-4" items={[
        {label: "Docs", href: "/docs"},
        {label: "Introduction"},
      ]}/>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="docs"/>
  </>;
}