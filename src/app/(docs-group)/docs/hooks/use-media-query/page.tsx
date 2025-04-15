import Contents from '@/mdx/use-media-query.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "useMediaQuery | Modern UI",
  description: "A custom React hook for detecting media query changes.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="use-media-query"/>
  </>;
} 