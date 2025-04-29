"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

import { products as defaultProducts } from "./pricecn.config";
import { cva } from "class-variance-authority";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import React from "react";
import { Check, Loader2 } from "lucide-react";

interface PricingTableContextType {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
  products: typeof defaultProducts;
}

const PricingTableContext = createContext<PricingTableContextType>({
  isAnnual: false,
  setIsAnnual: () => {},
  products: defaultProducts,
});

const pricingTableVariant = cva(
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col",
  {
    variants: {
      variant: {
        classic:
          "bg-white rounded-xl border overflow-hidden lg:overflow-visible dark:shadow-zinc-800 shadow-inner bg-gradient-to-br from-stone-100 to-background dark:from-background/95 dark:to-background",
        clean: "gap-4",
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
  products = defaultProducts,
}: {
  children: React.ReactNode;
  className?: string;
  products?: typeof defaultProducts;
}) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <PricingTableContext.Provider
      value={{
        isAnnual,
        setIsAnnual,
        products: products || defaultProducts || [],
      }}
    >
      <div className={cn("flex items-center flex-col")}>
        {products.some((p) => p.priceAnnual) && (
          <div className={cn(products.some((p) => p.recommendText) && "mb-8")}>
            <AnnualSwitch isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          </div>
        )}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col gap-4",
            className
          )}
        >
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
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// const pricingCardVariants = cva("w-full h-full py-6 text-foreground", {
//   variants: {
//     variant: {
//       clean: "border rounded-md bg-background",
//     },
//     recommended: {
//       clean: "border bg-secondary shadow-xl border-primary/30",
//     },
//   },
// });

export const PricingCard = ({
  productId,
  showFeatures,
  className,
  onButtonClick,
}: PricingCardProps) => {
  const { isAnnual, products } = usePricingTableContext("PricingCard");
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

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
    <div
      className={cn(
        "border rounded-md bg-background w-full h-full py-6 text-foreground",
        recommendText &&
          "border bg-secondary shadow-xl border-primary/30 lg:-translate-y-6 lg:h-[calc(100%+48px)]",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col h-full flex-grow",
          recommendText && "lg:translate-y-6"
        )}
      >
        <div className="h-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold px-6 ">{name}</h2>
            {description && (
              <span className="text-sm text-muted-foreground px-6 h-12">
                {description}
              </span>
            )}
            <div className="mt-2">
              <h3 className="font-semibold text-md h-16 border-y flex items-center px-6">
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
        </div>
        <div
          className={cn("mt-4 px-6 ", recommendText && "lg:-translate-y-12")}
        >
          <PricingCardButton
            recommended={recommendText ? true : false}
            priceVariant="classic"
            onClick={onButtonClick}
          >
            {buttonText}
          </PricingCardButton>
        </div>
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
  priceVariant?: "classic";
}

export const PricingCardButton = React.forwardRef<
  HTMLButtonElement,
  PricingCardButtonProps
>(({ recommended, children, priceVariant, ...props }, ref) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      className={cn(
        "w-full py-3 px-4 rounded-none group overflow-hidden relative transition-all duration-300 hover:brightness-90",
        priceVariant === "classic" && "border rounded-lg"
      )}
      variant={recommended ? "default" : "secondary"}
      {...props}
      ref={ref}
      disabled={loading}
      onClick={async (e) => {
        setLoading(true);
        await props.onClick?.(e);
        setLoading(false);
      }}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {" "}
          <div className="flex items-center justify-between w-full transition-transform duration-300 group-hover:translate-y-[-130%]">
            <span>{children}</span>
            <span className="text-sm">→</span>
          </div>
          <div className="flex items-center justify-between w-full absolute px-4 translate-y-[130%] transition-transform duration-300 group-hover:translate-y-0 mt-2 group-hover:mt-0">
            <span>{children}</span>
            <span className="text-sm">→</span>
          </div>
        </>
      )}
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

export const RecommendedBadge = ({ recommended }: { recommended: string }) => {
  return (
    <div
      className={cn(
        "bg-primary absolute text-sm font-semibold flex items-center justify-center text-primary-foreground lg:-top-8 lg:left-0 lg:w-full lg:h-8 top-0 right-0 w-fit h-6 z-50 rounded-none px-2"
      )}
    >
      {recommended}
    </div>
  );
};
