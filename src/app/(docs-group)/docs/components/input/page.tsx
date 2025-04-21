import Contents from '@/mdx/docs/input.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Input | Modern UI",
  description: "A form input component that provides a clean and accessible way to collect user input.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="input"/>
  </>;
} 