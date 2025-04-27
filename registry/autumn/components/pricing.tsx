"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ProductItem {
  price?: string | null;
  text?: string;
}

interface Product {
  name: string;
  recommended?: string;
  color?: string;
  items: ProductItem[];
  description: string;
  purchaseButtonText: string;
  price: string;
  priceNote?: string;
  everythingFrom?: string;
}

interface PricingCardProps {
  plan: Product;
  font: string;
  showFeatures: boolean;
}

// interface ProductItem {
//   feature_id: string | null;
//   included_usage?: number | "Infinity";
//   interval: string;
//   usage_model: "prepaid" | "pay_per_use";
//   price: number | null;
//   billing_units: number;
//   entity_feature_id?: string;
//   reset_usage_on_billing: boolean;
//   reset_usage_when_enabled: boolean;
//   tiers?: PriceTier[];
//   // Display properties
//   text: string;
//   hasInfo: boolean;
// }

export const Pricing = ({
  showFeatures = true,
  products,
  variant = "dev",
  className,
}: {
  showFeatures?: boolean;
  products: Product[];
  variant?: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative bg-white rounded-2xl", className)}>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
          variant == "basic" &&
            "rounded-xl overflow-clip border gap-[1px] bg-gradient-to-br from-zinc-50 to-white dark:from-background/95 dark:to-background dark:shadow-zinc-800 shadow-inner",
          variant == "dev" && "gap-[2px]"
        )}
      >
        {products.map((plan, index) => (
          <div key={index} className={cn("w-full", plan.recommended && "z-10")}>
            {variant === "dev" && (
              <div className="h-full outline outline-white ">
                <PricingCardDev
                  plan={plan}
                  font={spaceMono.className}
                  showFeatures={showFeatures}
                />
              </div>
            )}
            {variant === "basic" && (
              <div className="h-full outline outline-1 outline-border shadow-inner">
                <PricingCardBasic
                  plan={plan}
                  font={spaceMono.className}
                  showFeatures={showFeatures}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PricingCardBasic = ({
  plan,
  font,
  showFeatures,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full text-foreground p-6",
        plan.recommended && "bg-stone-100 dark:bg-zinc-900"
      )}
    >
      <div className="">
        <h2 className="text-2xl font-bold">{plan.name}</h2>

        <div className="mt-2">
          <h3 className="font-semibold text-md">
            {plan.price}{" "}
            {plan.priceNote && (
              <span className="font-normal text-muted-foreground mt-1">
                {plan.priceNote}
              </span>
            )}
          </h3>
        </div>
      </div>

      {showFeatures && (
        <div className="flex-grow">
          <PricingFeatureList plan={plan} icons={true} />
        </div>
      )}

      <div className="mt-2">
        <PurchaseButton plan={plan} />
      </div>
    </div>
  );
};

export const PricingCardDev = ({
  plan,
  font,
  showFeatures,
}: PricingCardProps) => {
  let color = plan.color || "bg-primary";

  return (
    <div className="relative flex flex-col h-full rounded-none z-0 text-foreground isolation-auto">
      {plan.recommended && (
        <RecommendedBadge plan={plan} color={color} position="top" />
      )}

      <div className="bg-background h-full">
        <div className={`flex flex-col gap-2 bg-primary/30 saturate-150 p-6`}>
          <h2 className={`text-xl ${font}`}>{plan.name}</h2>
          <p className="text-sm h-12">{plan.description}</p>
        </div>
        <div className="h-28 p-6 overflow-hidden">
          <h3 className={`text-3xl truncate ${font}`}>{plan.price}</h3>
          {plan.priceNote && (
            <p className="text-sm text-muted-foreground mt-1">
              {plan.priceNote}
            </p>
          )}
        </div>
        <div className="p-2">
          <PurchaseButton plan={plan} />
        </div>
        {showFeatures && (
          <div className="px-6">
            <PricingFeatureList plan={plan} icons={false} />
          </div>
        )}
      </div>
    </div>
  );
};

const PricingFeatureList = ({
  plan,
  icons,
}: {
  plan: Product;
  icons: boolean;
}) => {
  return (
    <div className="py-6 flex-grow">
      {plan.everythingFrom && (
        <p className="text-sm mb-4">
          Everything in {plan.everythingFrom}, plus:
        </p>
      )}
      <div className="space-y-3">
        {plan.items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            {icons && (
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            )}
            <div className="flex flex-col">
              <span>{item.text}</span>
              {item.price && (
                <span className="text-sm text-muted-foreground">
                  {item.price}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecommendedBadge = ({
  plan,
  color,
  position = "top",
}: {
  plan: Product;
  color: string;
  position: "top" | "inside";
}) => {
  return (
    <div
      className={cn(
        `bg-primary absolute text-sm font-semibold flex items-center justify-center text-primary-foreground`,
        position == "top" && "-top-8 left-0 w-full h-8",
        position == "inside" &&
          "top-0.5 right-0.5 w-fit h-6 z-50 rounded-none px-2 font-medium"
      )}
    >
      {plan.recommended}
    </div>
  );
};

const PurchaseButton = ({ plan }: { plan: Product }) => {
  return (
    <Button
      className={`w-full py-3 px-4 rounded-none flex items-center justify-between`}
      variant={plan.recommended ? "default" : "secondary"}
    >
      <span>{plan.purchaseButtonText}</span>
      <span className="text-sm">→</span>
    </Button>
  );
};
