import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";

export interface PricingCardButtonProps extends ButtonProps {
  recommended?: boolean;
}

export const PricingCardButton = React.forwardRef<
  HTMLButtonElement,
  PricingCardButtonProps
>(({ recommended, children, ...props }, ref) => {
  return (
    <Button
      className="w-full py-3 px-4 rounded-none flex items-center justify-between"
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
