import Contents from '@/mdx/docs/use-debounce.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "useDebounce | Modern UI",
  description: "A custom React hook to debounce rapidly changing values.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="use-debounce"/>
  </>;
} 