import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";

export default function NotFound() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Not Found", href: "/dashboard" },
  ];

  return (
    <ContentLayout title="New Post">
      <Breadcrumbs items={breadcrumbItems} />
      <PlaceholderContent />
    </ContentLayout>
  );
}
