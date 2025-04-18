import Contents from '@/mdx/form.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Form | Modern UI",
  description: "A form component built on top of React Hook Form with validation and accessible error messages.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="form"/>
  </>;
} 