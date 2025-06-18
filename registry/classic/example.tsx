"use client";
import { Button } from "@/components/ui/button";
import { PricingCard, PricingTable } from "./pricing-table";
import { products } from "@/lib/util/constant";

export const PricingTableExample = () => {
  return (
    <div>
      <Button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="p-2 mb-4 rounded-lg text-zinc-600 dark:text-zinc-300 
        bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        Toggle theme
      </Button>
      <PricingTable products={products.products} showFeatures={true}>
        <PricingCard productId="hobby" />
        <PricingCard productId="professional" />
        <PricingCard productId="enterprise" />
      </PricingTable>
    </div>
  );
};
