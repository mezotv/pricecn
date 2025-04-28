"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

import { products } from "./pricecn.config";
import { cva } from "class-variance-authority";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import React from "react";
import { Check } from "lucide-react";

interface PricingTableContextType {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
  variant: "basic" | "dev";
}

const PricingTableContext = createContext<PricingTableContextType>({
  isAnnual: false,
  setIsAnnual: () => {},
  variant: "basic",
});

const pricingTableVariant = cva(
  "bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col border",
  {
    variants: {
      variant: {
        basic:
          "rounded-xl border overflow-hidden lg:overflow-visible divide-x divide-y lg:divide-y-0 bg-gradient-to-br from-zinc-50 to-white dark:from-background/95 dark:to-background dark:shadow-zinc-800 shadow-inner",

        dev: "gap-[2px]",
      },
    },
  }
);

export const usePricingTableContext = (componentName: string) => {
  const context = useContext(PricingTableContext);

  if (context === undefined) {
    throw new Error(`${componentName} must be used within <PricingTable />`);
  }

  return context;
};

export const PricingTable = ({
  children,
  className,
  variant = "basic",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "basic" | "dev";
}) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <PricingTableContext.Provider value={{ isAnnual, setIsAnnual, variant }}>
      <div className={cn("flex items-center flex-col")}>
        {products.some((p) => p.priceAnnual) && (
          <div className={cn(products.some((p) => p.recommendText) && "mb-8")}>
            <AnnualSwitch isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          </div>
        )}
        <div className={cn(pricingTableVariant({ variant }), className)}>
          {children}
        </div>
      </div>
    </PricingTableContext.Provider>
  );
};

interface PricingCardProps {
  productId: string;
  showFeatures?: boolean;
  className?: string;
}

// Pricing Card
export const PricingCard = ({
  productId,
  showFeatures = true,
  className,
}: PricingCardProps) => {
  const { variant } = usePricingTableContext("PricingCard");

  if (variant === "basic") {
    return (
      <PricingCardBasic
        productId={productId}
        showFeatures={showFeatures}
        className={className}
      />
    );
  } else if (variant === "dev") {
    return (
      <PricingCardDev
        productId={productId}
        showFeatures={showFeatures}
        className={className}
      />
    );
  }
};

export const PricingCardBasic = ({
  productId,
  showFeatures,
  className,
}: PricingCardProps) => {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const { isAnnual } = usePricingTableContext("PricingCardBasic");

  const {
    name,
    price,
    priceAnnual,
    recommendText,
    buttonText,
    items,
    description,
  } = product;

  return (
    <div className={cn(className, "w-full h-full")}>
      <div
        className={cn(
          "h-full flex flex-col text-foreground py-6",
          recommendText &&
            "bg-stone-100 dark:bg-zinc-900 lg:outline lg:outline-1 lg:outline-border lg:-translate-y-6 lg:rounded-xl lg:pt-12 lg:pb-12 lg:h-[calc(100%+48px)] lg:shadow-xl lg:shadow-zinc-200 lg:dark:shadow-zinc-800"
        )}
      >
        <div className="flex flex-col h-full flex-grow">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold px-6">{name}</h2>
            <span className="text-sm text-muted-foreground px-6">{""}</span>
            <div className="mt-2">
              <h3 className="font-semibold text-md border-y h-16 flex items-center px-6">
                <div>
                  {isAnnual && priceAnnual
                    ? priceAnnual?.primaryText
                    : price.primaryText}{" "}
                  {price.secondaryText && (
                    <span className="font-normal text-muted-foreground mt-1">
                      {isAnnual && priceAnnual
                        ? priceAnnual?.secondaryText
                        : price.secondaryText}
                    </span>
                  )}
                </div>
              </h3>
            </div>
          </div>
          {showFeatures && (
            <div className="flex-grow px-6">
              <PricingFeatureList items={items} showIcon={true} />
            </div>
          )}
          <div className={cn("mt-2 px-6", recommendText && "")}>
            <PricingCardButton
              recommended={recommendText ? true : false}
              priceVariant="basic"
            >
              {buttonText}
            </PricingCardButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingCardDev = ({
  productId,
  showFeatures,
  className,
}: PricingCardProps) => {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const { name, price, recommendText, buttonText, items, description } =
    product;

  return (
    <div
      className={cn(
        className,
        "w-full h-full outline outline-white relative flex flex-col rounded-none z-0 text-foreground isolation-auto"
      )}
    >
      {recommendText && (
        <RecommendedBadge recommended={recommendText} position="top" />
      )}

      <div className="bg-background h-full">
        <div className={`flex flex-col gap-2 bg-primary/30 saturate-150 p-6`}>
          <h2 className={`text-xl`}>{name}</h2>
          <p className="text-sm h-12">{description}</p>
        </div>
        <div className="h-28 p-6 overflow-hidden">
          <h3 className={`text-3xl truncate`}>{price.primaryText}</h3>
          {price.secondaryText && (
            <p className="text-sm text-muted-foreground mt-1">
              {price.secondaryText}
            </p>
          )}
        </div>

        <div className="p-2">
          <PricingCardButton
            recommended={recommendText ? true : false}
            priceVariant="dev"
          >
            {buttonText}
          </PricingCardButton>
        </div>

        {showFeatures && (
          <div className="px-6">
            <PricingFeatureList items={items} showIcon={false} />
          </div>
        )}
      </div>
    </div>
  );
};

// Pricing Feature List
export const PricingFeatureList = ({
  items,
  showIcon = true,
  everythingFrom,
  className,
}: {
  items: {
    primaryText: string;
    secondaryText?: string;
  }[];
  showIcon?: boolean;
  everythingFrom?: string;
  className?: string;
}) => {
  return (
    <div className={cn("py-6 flex-grow", className)}>
      {everythingFrom && (
        <p className="text-sm mb-4">Everything from {everythingFrom}, plus:</p>
      )}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            {showIcon && (
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            )}
            <div className="flex flex-col">
              <span>{item.primaryText}</span>
              {item.secondaryText && (
                <span className="text-sm text-muted-foreground">
                  {item.secondaryText}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pricing Card Button
export interface PricingCardButtonProps extends React.ComponentProps<"button"> {
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

// Annual Switch
export const AnnualSwitch = ({
  isAnnual,
  setIsAnnual,
}: {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm text-muted-foreground">Monthly</span>
      <Switch
        id="annual-billing"
        checked={isAnnual}
        onCheckedChange={setIsAnnual}
      />
      <span className="text-sm text-muted-foreground">Annual</span>
    </div>
  );
};

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
