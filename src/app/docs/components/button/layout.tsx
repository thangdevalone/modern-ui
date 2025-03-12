import {PreviewButton} from '@/app/docs/components/button/preview';
import TocWrapper from '@/components/providers/toc-wrapper';
import MdxLayout from '@/components/layouts/mdx-layout';

export default function MDXPage({children}: { children: React.ReactNode }) {
  return <>
    <MdxLayout>
      <PreviewButton/>
      {children}
    </MdxLayout>
    <TocWrapper file="button"/>
  </>;
}