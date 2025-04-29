"use client";
import { Button } from "@/components/ui/button";
import { PricingCard, PricingTable, Product } from "./pricing-table";

const products: Product[] = [
  {
    id: "hobby",
    name: "Hobby",
    description: "For personal projects and small-scale applications.",
    buttonText: "Get started",

    price: {
      primaryText: "Free",
    },
    items: [
      {
        primaryText: "Deploy full-stack apps in minutes",
      },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For personal projects and small-scale applications.",
    buttonText: "Get started",
    buttonUrl: "https://www.google.com",

    price: {
      primaryText: "$30",
      secondaryText: "per month",
    },
    priceAnnual: {
      primaryText: "$120",
      secondaryText: "per year",
    },
    items: [
      {
        primaryText: "Deploy full-stack apps in minutes",
      },
    ],
    recommendText: "Recommended",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For personal projects and small-scale applications.",

    buttonText: "Contact us",
    buttonUrl: "https://www.google.com",
    price: {
      primaryText: "$100",
      secondaryText: "per month",
    },
    items: [
      {
        primaryText: "Deploy full-stack apps in minutes",
      },
    ],
  },
];

export const PricingTableExample = () => {
  return (
    <div>
      <Button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="p-2 mb-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        Toggle theme
      </Button>
      <PricingTable products={products} showFeatures={true}>
        <PricingCard productId="hobby" />
        <PricingCard productId="pro" />
        <PricingCard productId="enterprise" />
      </PricingTable>
    </div>
  );
};
