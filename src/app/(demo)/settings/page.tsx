import { Separator } from "@/components/ui/separator";
import { CompanyProfileForm } from "./company-profile-form";
import { Heading } from "@/components/wrappers/heading";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <Heading
        level="h4"
        heading="Profile"
        subheading="Manage and update your products"
      />
      <Separator />
      <CompanyProfileForm />
    </div>
  );
}
