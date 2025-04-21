import LeftSidebar from '@/components/shared/left-sidebar';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-0">
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside
          className="md:block w-64 shrink-0 border-r sticky overflow-y-auto py-4 hidden no-scrollbar h-[calc(100vh_-_70px)] top-[70px] left-0 right-0 lg:block border-border pl-4"
        >
          <LeftSidebar />
        </aside>
        <main className="flex-1 min-w-0 px-6 md:py-8 py-4 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 