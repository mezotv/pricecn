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
  variant: "dev";
  products: typeof defaultProducts;
}

const PricingTableContext = createContext<PricingTableContextType>({
  isAnnual: false,
  setIsAnnual: () => {},
  variant: "dev",
  products: defaultProducts,
});

const pricingTableVariant = cva(
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col",
  {
    variants: {
      variant: {
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
  variant = "dev",
  products = defaultProducts,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "dev";
  products?: typeof defaultProducts;
}) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <PricingTableContext.Provider
      value={{
        isAnnual,
        setIsAnnual,
        variant,
        products: products || defaultProducts || [],
      }}
    >
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
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const PricingCard = ({
  productId,
  showFeatures,
  className,
  onButtonClick,
}: PricingCardProps) => {
  const { isAnnual, products } = usePricingTableContext("PricingCardDev");
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const {
    name,
    price,
    recommendText,
    buttonText,
    items,
    description,
    priceAnnual,
    buttonUrl,
  } = product;

  return (
    <div
      className={cn(
        className,
        "w-full h-full border border-background relative flex flex-col rounded-none z-0 text-foreground",
        recommendText && "border-primary border-4 lg:border-t-[1px]"
      )}
    >
      {recommendText && <RecommendedBadge recommended={recommendText} />}

      <div className="bg-background h-full">
        <div className={`flex flex-col gap-2 bg-primary/10 p-6`}>
          <h2 className={`text-xl font-medium`}>{name}</h2>
          <p className="text-sm h-12">{description}</p>
        </div>
        <div className="h-28 p-6 overflow-hidden">
          <h3 className={`text-3xl truncate font-mono`}>
            {isAnnual && priceAnnual
              ? priceAnnual?.primaryText
              : price.primaryText}
          </h3>
          {price.secondaryText && (
            <p className="text-sm text-muted-foreground mt-1">
              {isAnnual && priceAnnual
                ? priceAnnual?.secondaryText
                : price.secondaryText}
            </p>
          )}
        </div>

        <div className="p-2">
          <PricingCardButton
            recommended={recommendText ? true : false}
            onClick={onButtonClick}
            buttonUrl={buttonUrl}
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
  buttonUrl?: string;
}

export const PricingCardButton = React.forwardRef<
  HTMLButtonElement,
  PricingCardButtonProps
>(({ recommended, children, buttonUrl, onClick, ...props }, ref) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className="w-full py-3 px-4 rounded-none group overflow-hidden relative transition-all duration-300 hover:brightness-90"
      variant={recommended ? "default" : "secondary"}
      {...props}
      ref={ref}
      disabled={loading}
      onClick={async (e) => {
        if (onClick) {
          setLoading(true);
          await onClick(e);
          setLoading(false);
        }

        if (buttonUrl) {
          window.open(buttonUrl, "_blank");
          return;
        }
      }}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {" "}
          <div className="flex items-center justify-between w-full transition-transform duration-300 group-hover:translate-y-[-130%]">
            <span>{children}</span>
            <span className="text-sm">▶︎</span>
          </div>
          <div className="flex items-center justify-between w-full absolute px-4 translate-y-[130%] transition-transform duration-300 group-hover:translate-y-0 mt-2 group-hover:mt-0">
            <span>{children}</span>
            <span className="text-sm">▶︎</span>
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
        "bg-primary absolute text-sm font-semibold flex items-center justify-center text-primary-foreground lg:border-4 lg:border-primary lg:-top-8 lg:-left-1 lg:w-[calc(100%+8px)] lg:rounded-t-sm lg:h-8 top-0 right-0 w-fit h-6 z-50 rounded-bl-lg lg:rounded-bl-none px-2"
      )}
    >
      {recommended}
    </div>
  );
};
