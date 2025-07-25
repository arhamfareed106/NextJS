import fs from "fs";
import path from "path";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";

async function getChangelogContent() {
  const filePath = path.join(process.cwd(), "CHANGELOG.md");
  const fileContent = await fs.promises.readFile(filePath, "utf8");

  // Convert Markdown to HTML
  const markdown = await import("markdown-it");
  const md = markdown.default();
  return md.render(fileContent);
}

export default async function Changelog() {
  const content = await getChangelogContent();

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Changelog", href: "/changelog" },
  ];

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumbs items={breadcrumbItems} />

      {/* CONTENT */}

      <div className="pt-4">
        <Card className="pt-8">
          <CardContent>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
