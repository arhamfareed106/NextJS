import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "./notifications-form";
import { Heading } from "@/components/wrappers/heading";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <Heading
        level="h4"
        heading="Notifications"
        subheading="Configure how you receive notifications."
      />
      <Separator />
      <NotificationsForm />
    </div>
  );
}
