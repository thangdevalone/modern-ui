import Contents from '@/mdx/modern-ui-json.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {BreadcrumbNav} from '@/components/breadcrumb-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "modern-ui.json | Modern UI",
  description: "The modern-ui.json file holds configuration for your project. We use it to understand how your project is set up and how to generate components customized for your project.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="docs"/>
  </>;
}