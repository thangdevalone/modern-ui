import Contents from '@/mdx/docs/avatar.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Avatar | Modern UI",
  description: "An image element with a fallback for representing the user.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="avatar"/>
  </>;
} 