import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-6 md:py-8 py-4 md:px-8">
      <div className="flex flex-col md:flex-row min-h-screen">{children}</div>
    </div>
  );
}
