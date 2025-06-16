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

  if (products.length === 0) {
    return <></>;
  }
  const hasEvenProducts = products.length % 2 === 0;

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
            "w-full grid grid-cols-1 lg:grid-cols-none lg:auto-cols-[minmax(200px,1fr)] lg:grid-flow-col bg-background rounded-xl border overflow-hidden lg:overflow-visible dark:shadow-zinc-800 shadow-inner ",
            hasEvenProducts && "sm:grid-cols-2",
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
        "w-full h-full py-6 text-foreground border-l border-t lg:border-t-0 lg:first:border-l-0 lg:ml-0 -ml-px -mt-px",
        isRecommended &&
          !uniform &&
          "lg:border-none lg:outline-solid lg:outline-1 lg:outline-border lg:-translate-y-6 lg:rounded-xl lg:shadow-lg lg:shadow-zinc-200 lg:dark:shadow-zinc-800/80 lg:h-[calc(100%+48px)] bg-stone-100 dark:bg-zinc-900 relative dark:outline-zinc-700",
        className
      )}
    >
      {recommendedText && !uniform && (
        <RecommendedBadge recommended={recommendedText} />
      )}
      <div
        className={cn(
          "flex flex-col h-full grow",
          isRecommended && !uniform && "lg:translate-y-6"
        )}
      >
        <div className="h-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold px-6 ">{name}</h2>
            {description && (
              <div className="text-sm text-muted-foreground px-6 h-8">
                <p className="line-clamp-2">{description}</p>
              </div>
            )}
            <div className="mt-2 mb-6">
              <h3 className="font-semibold h-16 border-y flex items-center px-6">
                <div className="line-clamp-2">
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
          {showFeatures && items.length > 0 && (
            <div className="grow px-6 mb-6">
              <PricingFeatureList
                items={items}
                showIcon={true}
                everythingFrom={everythingFrom}
              />
            </div>
          )}
        </div>
        <div
          className={cn(
            " px-6 ",
            isRecommended && !uniform && "lg:-translate-y-12"
          )}
        >
          <PricingCardButton
            recommended={recommendedText ? true : false}
            onClick={onButtonClick}
            buttonUrl={buttonUrl}
            {...buttonProps}
          >
            {buttonText}
          </PricingCardButton>
        </div>
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
    <div className={cn("grow", className)}>
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
        "w-full py-3 px-4 group overflow-hidden relative transition-all duration-300 hover:brightness-90 border rounded-lg",
        className
      )}
      variant={recommended ? "default" : "secondary"}
      ref={ref}
      disabled={loading}
      onClick={async (e) => {
        setLoading(true);
        try {
          if (onClick) {
            await onClick(e);

            return;
          }

          if (buttonUrl) {
            window.open(buttonUrl, "_blank");
            return;
          }
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      }}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
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
    <div className="bg-secondary absolute border text-muted-foreground text-sm font-medium lg:rounded-full px-3 lg:py-0.5 lg:top-4 lg:right-4 -top-px -right-px rounded-bl-lg">
      {recommended}
    </div>
  );
};
