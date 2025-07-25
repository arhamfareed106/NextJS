import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { platforms } from "@/lib/data/platforms";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Heading } from "@/components/wrappers/heading";

export default function Component() {
  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Supplier recommendations", href: "/supplier" },
  ];

  return (
    <ContentLayout title="Supplier recommendations">
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="my-6" />

      <Heading
        level="h4"
        heading="Supplier recommendations"
        subheading="Find the best suppliers for your business."
      />

      <div className=" mx-auto py-4">
        <div className="space-y-6">
          {platforms.map((platform) => (
            <Card key={platform.id} className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex-shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden">
                      <Image
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        className="object-contain"
                        fill
                        sizes="(max-width: 768px) 80px, 80px"
                      />
                    </div>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline">
                      <h2 className="text-2xl font-bold">{platform.name}</h2>
                      <span className="text-sm font-semibold text-violet-800 ml-0 sm:ml-2">
                        {platform.productCount}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
