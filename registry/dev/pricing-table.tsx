"use client";

import React from "react";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import type {
  AnnualSwitchProps,
  PricingCardButtonProps,
  PricingCardProps,
  PricingFeatureListProps,
  PricingTableContextProps,
  PricingTableProps,
  RecommendedBadgeProps,
} from "@/types/pricing/pricing-table";

const PricingTableContext = createContext<PricingTableContextProps>({
  isAnnual: false,
  setIsAnnual: () => {},
  products: [],
  showFeatures: true,
  uniform: false,
});

export const usePricingTableContext = (componentName: string) => {
  const context = useContext(PricingTableContext);

  if (context === undefined) {
    throw new Error(`${componentName} must be used within <PricingTable />`);
  }

  return context;
};

export const PricingTable = ({
  children,
  products,
  showFeatures = true,
  className,
  uniform = false,
}: PricingTableProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  if (!products) {
    throw new Error("Product is required in <PricingTable />");
  }

  return (
    <PricingTableContext.Provider
      value={{ isAnnual, setIsAnnual, products, showFeatures, uniform }}
    >
      <div className={cn("flex items-center flex-col")}>
        {products.some((p) => p.priceAnnual) && (
          <div
            className={cn(
              products.some((p) => p.recommendedText) && !uniform && "mb-8"
            )}
          >
            <AnnualSwitch isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          </div>
        )}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col gap-[2px] w-full",
            className
          )}
        >
          {children}
        </div>
      </div>
    </PricingTableContext.Provider>
  );
};

export const PricingCard = ({
  productId,
  className,
  onButtonClick,
  buttonProps,
}: PricingCardProps) => {
  const { isAnnual, products, showFeatures, uniform } =
    usePricingTableContext("PricingCard");
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const {
    name,
    price,
    priceAnnual,
    recommendedText,
    buttonText,
    items,
    description,
    buttonUrl,
    everythingFrom,
  } = product;

  const isRecommended = recommendedText ? true : false;

  return (
    <div
      className={cn(
        "w-full h-full border border-background relative flex flex-col rounded-none z-0 text-foreground",
        isRecommended &&
          !uniform &&
          "border-primary border-4 lg:border-t",
        className
      )}
    >
      {recommendedText && !uniform && (
        <RecommendedBadge recommended={recommendedText} />
      )}

      <div className="bg-background h-full">
        <div className={`flex flex-col gap-2 bg-secondary p-6 mb-6`}>
          <h2 className={`text-lg`}>{name}</h2>
          {description && <p className="text-sm h-12">{description}</p>}
        </div>

        <div className="px-6 min-h-12 flex flex-col justify-cente mb-6">
          <h3 className={`text-3xl flex items-center truncate mb-1 min-h-12`}>
            {isAnnual && priceAnnual
              ? priceAnnual?.primaryText
              : price.primaryText}
          </h3>
          {price.secondaryText && (
            <p className="text-sm text-muted-foreground h-6">
              {isAnnual && priceAnnual
                ? priceAnnual?.secondaryText
                : price.secondaryText}
            </p>
          )}
        </div>

        <div className="px-3 mb-6">
          <PricingCardButton
            recommended={isRecommended}
            onClick={onButtonClick}
            buttonUrl={buttonUrl}
            {...buttonProps}
          >
            {buttonText}
          </PricingCardButton>
        </div>

        {showFeatures && items.length > 0 && (
          <div className="px-6">
            <PricingFeatureList
              items={items}
              showIcon={false}
              everythingFrom={everythingFrom}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const PricingFeatureList = ({
  items,
  showIcon = true,
  everythingFrom,
  className,
  translations = {
    everythingFromPlus: "Everything from ${everythingFrom}, plus:",
  }
}: PricingFeatureListProps) => {
  return (
    <div className={cn("pb-6 grow", className)}>
      {everythingFrom && (
        <p className="text-sm mb-4">{translations.everythingFromPlus?.replace(
          /\$\{everythingFrom\}/g,
          everythingFrom
        )}</p>
      )}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            {showIcon && (
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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

export const PricingCardButton = React.forwardRef<
  HTMLButtonElement,
  PricingCardButtonProps
>(({ recommended, children, buttonUrl, onClick, className, ...props }, ref) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      className={cn(
        "w-full py-3 px-4 rounded-none group overflow-hidden relative transition-all duration-300 hover:brightness-90 font-mono",
        className
      )}
      variant={recommended ? "default" : "secondary"}
      ref={ref}
      disabled={loading}
      onClick={async (e) => {
        if (buttonUrl) {
          window.open(buttonUrl, "_blank");
          return;
        }

        if (onClick) {
          setLoading(true);
          await onClick(e);
          setLoading(false);
        }
      }}
      {...props}
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

export const AnnualSwitch = ({
  isAnnual,
  setIsAnnual,
  translations = {
    monthly: "Monthly",
    annual: "Annual",
    }
  }: AnnualSwitchProps) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm text-muted-foreground">{translations.monthly}</span>
      <Switch
        id="annual-billing"
        checked={isAnnual}
        onCheckedChange={setIsAnnual}
      />
      <span className="text-sm text-muted-foreground">{translations.annual}</span>
    </div>
  );
};

export const RecommendedBadge = ({ recommended }: RecommendedBadgeProps) => {
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
