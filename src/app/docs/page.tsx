import {Metadata} from 'next';
import axiosService from '@/services/axios.service';
import TableOfContents from '@/components/shared/table-of-content';
import {MainContent} from '@/app/docs/components/[slug]/main-content';
import {notFound} from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Introduction | Modern UI`,
  };
}

export default async function page() {
  try {
    const {data} = await axiosService.get(`/api/contents/introduction`);
    const content = data.content;
    return (
      <>
        <main
          className="flex-1 min-w-0 px-4 py-8 md:px-8"
        >
          <MainContent content={content} slug="introduction" noPreview={true}/>
        </main>
        <TableOfContents content={content}/>
      </>
    );
  } catch (e) {
    notFound();
  }
}
