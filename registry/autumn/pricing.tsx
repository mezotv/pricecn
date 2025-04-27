"use client";

import React from "react";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PricingCardBasic, PricingCardDev } from "./pricing-card";
import { Product } from "./pricecn.config";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plansContainerVariant = cva(
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

export const Pricing = ({
  showFeatures = true,
  products,
  variant = "dev",
  className,
}: {
  showFeatures?: boolean;
  products: Product[];
  variant?: "basic" | "dev";
  className?: string;
}) => {
  const PricingCard = variant === "dev" ? PricingCardDev : PricingCardBasic;
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className={cn(className, "flex items-center flex-col")}>
      {products.some((p) => p.priceAnnual) && (
        <div className={cn(products.some((p) => p.recommendText) && "mb-8")}>
          <AnnualSwitch isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        </div>
      )}
      <div className={cn(plansContainerVariant({ variant }))}>
        {products.map((product, index) => (
          <PricingCard
            key={index}
            product={product}
            font={spaceMono.className}
            showFeatures={showFeatures}
            isAnnual={isAnnual}
          />
        ))}
      </div>
    </div>
  );
};

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
