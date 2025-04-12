import Contents from '@/mdx/use-local-storage.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "useLocalStorage | Modern UI",
  description: "A custom React hook for persisting state in localStorage.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="use-local-storage"/>
  </>;
} 