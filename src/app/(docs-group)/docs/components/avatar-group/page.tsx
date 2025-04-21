import Contents from '@/mdx/docs/avatar-group.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Avatar Group | Modern UI",
  description: "A component for displaying multiple avatars together with an elegant stacked appearance.",
};

export default function Page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="avatar-group"/>
  </>;
} 