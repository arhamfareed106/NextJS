import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FiltersSection } from "@/components/admin/payments/filters-section";
import { MarkupForm } from "@/components/admin/payments/markup-form";
import { PaymentsTable } from "@/components/admin/payments/payments-table";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Admin Panel: Payments", href: "/admin/payments" },
];

export default function PaymentsPage() {
  return (
    <ContentLayout title="Payout">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="space-y-8 py-4">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Payments Admin</h1>
          <FiltersSection />
          <MarkupForm />
          <PaymentsTable />
        </div>
      </div>
    </ContentLayout>
  );
}
