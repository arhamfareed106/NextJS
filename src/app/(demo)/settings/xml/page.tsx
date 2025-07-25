import { Separator } from "@/components/ui/separator";
import { XMLForm } from "./xml-form";
import { Heading } from "@/components/wrappers/heading";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <Heading
        level="h4"
        heading="XML Links"
        subheading="Update your xml lnks that contain your product data"
      />
      <Separator />
      <XMLForm />
    </div>
  );
}
