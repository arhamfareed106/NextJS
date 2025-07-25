import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function MarkupForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply a mark-up</CardTitle>
        <p className="text-sm text-muted-foreground">
          The mark-up will be adjusted for all products according to the filters
          you choose
        </p>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Enter price" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="commission">Commission price</Label>
              <Input id="commission" placeholder="Enter commission" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logistics">Logistics cost</Label>
              <Input id="logistics" placeholder="Enter logistics cost" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount">Percentage discount</Label>
              <Input id="discount" placeholder="Enter discount %" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notices">Notices</Label>
            <Textarea
              id="notices"
              placeholder="Enter any notices or comments"
            />
          </div>
          <Button className="w-fit">Apply</Button>
        </form>
      </CardContent>
    </Card>
  );
}
