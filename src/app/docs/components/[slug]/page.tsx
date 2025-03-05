import {Metadata} from 'next';
import axiosService from '@/services/axios.service';
import TableOfContents from '@/components/shared/table-of-content';
import {MainContent} from '@/app/docs/components/[slug]/main-content';
import {formatSlug} from '@/lib/utils';

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const {slug} = await params;
  return {
    title: `${formatSlug(slug)} | Modern UI`,
  };
}

export default async function page({params}: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const {data} = await axiosService.get(`/api/contents/${slug}`);
  const content = data.content;
  return (
    <>
      <main
        className="flex-1 min-w-0 px-4 py-8 md:px-8"
      >
        <MainContent content={content} slug={slug}/>
      </main>
      <TableOfContents content={content}/>
    </>
  );
}

