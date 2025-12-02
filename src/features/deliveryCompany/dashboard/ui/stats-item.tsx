import { cn } from "@/shared/lib/cn";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  num: string | number;
  href: string;
  bgColor?: string;
  textColor?: string;
};

export const StatsItem = ({ bgColor, href, textColor, icon: Icon, label, num }: Props) => {
  return (
    <Link href={href} className="p-2 bg-white rounded-md shadow-sm flex gap-4 items-center">
      <div className={cn("size-10 bg-blue-100 text-blue-800 rounded-md flex justify-center items-center shadow-sm", textColor, bgColor)}>
        <Icon className="size-6" />
      </div>
      <div>
        <h4 className="text-xl font-medium">{Number(num)}</h4>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Link>
  );
};
