import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";
import { Heading } from "@/components/wrappers/heading";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <Heading
        level="h4"
        heading="Appearance"
        subheading="Customize the appearance of the dashboard."
      />
      <Separator />
      <AppearanceForm />
    </div>
  );
}
