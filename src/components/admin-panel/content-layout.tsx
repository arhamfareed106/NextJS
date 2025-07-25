import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="h-full flex flex-col flex-1">
      <Navbar title={title} />
      <div className="bg-container lg:mr-6 lg:rounded-3xl flex-1">
        <div className="container pt-8 pb-8 px-4 sm:px-8 ">{children}</div>
      </div>
    </div>
  );
}
