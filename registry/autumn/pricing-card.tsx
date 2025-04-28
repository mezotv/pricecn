"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { PricingCardButton } from "./pricing-card-button";
import { PricingFeatureList } from "./pricing-feature-list";
import { RecommendedBadge } from "./recommended-badge";
import { products } from "./pricecn.config";
import { cva } from "class-variance-authority";
import { Switch } from "@/components/ui/switch";

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
  "bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col border ",
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
  isAnnual?: boolean;
  className?: string;
}

export const PricingCard = ({
  productId,
  showFeatures = true,
  className,
}: PricingCardProps) => {
  const { variant, isAnnual } = usePricingTableContext("PricingCard");

  if (variant === "basic") {
    return (
      <PricingCardBasic
        productId={productId}
        showFeatures={showFeatures}
        isAnnual={isAnnual}
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
  isAnnual,
  className,
}: PricingCardProps) => {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const { name, price, priceAnnual, recommendText, buttonText, items } =
    product;

  return (
    <div className={cn(className, "w-full h-full")}>
      <div
        className={cn(
          "h-full flex flex-col text-foreground p-6",
          recommendText &&
            "bg-stone-100 dark:bg-zinc-900 lg:outline lg:outline-1 lg:outline-border lg:-translate-y-8 lg:rounded-xl lg:pt-14 lg:pb-14 lg:h-[calc(100%+64px)] lg:shadow-xl lg:shadow-zinc-200 lg:dark:shadow-zinc-800"
        )}
      >
        <div className="flex flex-col h-full flex-grow">
          <div className="">
            <h2 className="text-2xl font-bold">{name}</h2>
            <div className="mt-2">
              <h3 className="font-semibold text-md">
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
              </h3>
            </div>
          </div>
          {showFeatures && (
            <div className="flex-grow">
              <PricingFeatureList items={items} showIcon={true} />
            </div>
          )}
          <div className={cn("mt-2", recommendText && "")}>
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

// Helpers
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
