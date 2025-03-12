
export default function MdxLayout({children}: { children: React.ReactNode }) {
  return (
    <main
      className="flex-1 min-w-0 px-4 py-8 md:px-8"
    >
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </div>
    </main>
  );
}