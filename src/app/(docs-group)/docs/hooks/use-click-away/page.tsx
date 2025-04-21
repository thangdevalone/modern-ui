import Contents from '@/mdx/docs/use-click-away.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "useClickAway | Modern UI",
  description: "A custom React hook for detecting clicks outside of a specified element.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="use-click-away"/>
  </>;
} 