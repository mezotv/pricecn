"use client";

import React from "react";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PricingCardBasic, PricingCardDev } from "./pricing-card";
import { Product } from "./pricecn.config";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plansContainerVariant = cva(
  "relative bg-white rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
  {
    variants: {
      variant: {
        basic:
          "rounded-xl overflow-clip border gap-[1px] bg-gradient-to-br from-zinc-50 to-white dark:from-background/95 dark:to-background dark:shadow-zinc-800 shadow-inner",
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

  return (
    <div className={className}>
      <div className={cn(plansContainerVariant({ variant }))}>
        {products.map((product, index) => (
          <PricingCard
            key={index}
            product={product}
            font={spaceMono.className}
            showFeatures={showFeatures}
          />
        ))}
      </div>
    </div>
  );
};
