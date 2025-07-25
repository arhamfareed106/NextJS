import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Image from "next/image";

interface PremiumCardProps {
  title: string;
  className?: string;
  description: string;
  buttonText: string;
  onUpgrade?: () => void;
}

export default function PremiumCard(
  { className, title, description, buttonText, onUpgrade }: PremiumCardProps = {
    title: "Premium Services",
    description:
      "Learn how to provide exceptional customer support and build loyalty.",
    buttonText: "Upgrade to Premium",
    onUpgrade: () => console.log("Upgrade clicked"),
  }
) {
  return (
    <div className={className}>
      {/* Bolt icon */}
      <div className="flex justify-center ">
        <div className="bg-white p-4 rounded-full">
          <Image src={'/icons/flash.svg'} alt='flash' width={24} height={24} />
        </div>
      </div>

      <Card
        className={` bg-blue-100 dark:bg-indigo-950 w-full -mt-7 rounded-3xl overflow-hidden border-none`}
      >
        <CardHeader className="pb-0 "></CardHeader>
        <CardContent className="text-center space-y-2 pt-4">
          <h2 className="text-md font-bold ">{title}</h2>
          <p className="text-sm leading-[21px] text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full " onClick={onUpgrade}>
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
