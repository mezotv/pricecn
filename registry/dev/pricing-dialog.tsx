import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type {
  InformationProps,
  PriceItemProps,
  PricingDialogProps,
  PricingDialogTitleProps,
  QuantityProps,
  PricingDialogFooterProps,
  TotalPriceProps,
} from "@/types/pricing/pricing-dialog";
import { forwardRef } from "react";

export const PricingDialog = ({
  open,
  setOpen,
  children,
  className,
}: PricingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          className,
          "p-0 rounded-none gap-0 text-sm border-primary border"
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export const PricingDialogTitle = ({
  children,
  className,
}: PricingDialogTitleProps) => {
  return (
    <DialogTitle className={cn(className, "font-normal text-lg px-6 pt-3")}>
      {children}
    </DialogTitle>
  );
};

export const Information = ({ children, className }: InformationProps) => {
  return (
    <div
      className={cn(
        className,
        "text-foreground px-6 py-2 text-sm whitespace-pre-line"
      )}
    >
      {children}
    </div>
  );
};

export const PriceItem = ({
  children,
  className,
  ...props
}: PriceItemProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row text-muted-foreground pb-4 sm:pb-0 gap-1 justify-between px-6 sm:h-7 sm:gap-2 sm:items-center  sm:whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const QuantityInput = ({
  children,
  onChange,
  value,
  className,
  ...props
}: QuantityProps & React.HTMLAttributes<HTMLDivElement>) => {
  const currentValue = Number(value) || 0;

  const handleValueChange = (newValue: number) => {
    const syntheticEvent = {
      target: { value: String(newValue) },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className={cn(className, "flex items-center gap-4")} {...props}>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            currentValue > 0 && handleValueChange(currentValue - 1)
          }
          disabled={currentValue <= 0}
          className="h-6 w-6 rounded-none pb-0.5"
        >
          -
        </Button>
        <span className="w-8 text-center">{currentValue}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleValueChange(currentValue + 1)}
          className="h-6 w-6 pb-0.5 rounded-none"
        >
          +
        </Button>
      </div>
      {children}
    </div>
  );
};

export const PricingDialogFooter = ({
  children,
  className,
}: PricingDialogFooterProps) => {
  return (
    <DialogFooter
      className={cn(
        className,
        "flex flex-col sm:flex-row justify-between py-3 px-4 bg-secondary mt-4"
      )}
    >
      {children}
    </DialogFooter>
  );
};

export const TotalPrice = ({ children, className }: TotalPriceProps) => {
  return (
    <div
      className={cn(
        className,
        "px-2 w-full mb-4 sm:mb-0 font-mono text-base flex justify-between items-center"
      )}
    >
      {children}
    </div>
  );
};

export const PricingDialogButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ children, onClick, className, ...props }, ref) => {
  return (
    <Button
      onClick={onClick}
      {...props}
      ref={ref}
      className={cn(className, "font-mono rounded-none")}
    >
      {children}
      <Play className="h-3!" />
    </Button>
  );
});
PricingDialogButton.displayName = "PricingDialogButton";
