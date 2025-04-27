import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingCardButtonProps extends ButtonProps {
  recommended?: boolean;
  priceVariant?: "basic" | "dev";
}

export const PricingCardButton = React.forwardRef<
  HTMLButtonElement,
  PricingCardButtonProps
>(({ recommended, children, priceVariant, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "w-full py-3 px-4 rounded-none flex items-center justify-between",
        priceVariant === "basic" &&
          "outline outline-1 outline-border rounded-lg"
      )}
      variant={recommended ? "default" : "secondary"}
      {...props}
      ref={ref}
    >
      <span>{children}</span>
      <span className="text-sm">→</span>
    </Button>
  );
});
PricingCardButton.displayName = "PricingCardButton";
