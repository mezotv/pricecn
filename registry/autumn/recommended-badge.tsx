import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  `bg-primary absolute text-sm font-semibold flex items-center justify-center text-primary-foreground`,
  {
    variants: {
      position: {
        top: "-top-8 left-0 w-full h-8",
        inside:
          "top-0.5 right-0.5 w-fit h-6 z-50 rounded-none px-2 font-medium",
      },
    },
    defaultVariants: {
      position: "top",
    },
  }
);

export const RecommendedBadge = ({
  recommended,
  position = "top",
}: {
  recommended: string;
  position: "top" | "inside";
}) => {
  return <div className={cn(badgeVariants({ position }))}>{recommended}</div>;
};
