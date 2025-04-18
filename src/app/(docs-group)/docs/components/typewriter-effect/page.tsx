import Contents from '@/mdx/typewriter-effect.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Typewriter Effect | Modern UI",
  description: "An animated typewriter effect component that simulates typing text, with configurable speed and behavior.",
};

export default function page() {
  return <>
    <MdxLayout>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="typewriter-effect"/>
  </>;
} 