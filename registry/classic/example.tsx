"use client";
import { Button } from "@/components/ui/button";
import { PricingCard, PricingTable, Product } from "./pricing-table";

// export const products: Product[] = [
//   {
//     id: "hobby",
//     name: "Hobby",
//     description: "For personal projects and small-scale applications.",
//     buttonText: "Get started",

//     price: {
//       primaryText: "Free",
//     },
//     items: [
//       {
//         primaryText: "Deploy full-stack apps in minutes",
//       },
//     ],
//   },
//   {
//     id: "pro",
//     name: "Pro",
//     description: "For personal projects and small-scale applications.",
//     buttonText: "Get started",
//     buttonUrl: "https://www.google.com",

//     price: {
//       primaryText: "$30",
//       secondaryText: "per month",
//     },
//     priceAnnual: {
//       primaryText: "$120",
//       secondaryText: "per year",
//     },
//     items: [
//       {
//         primaryText: "Deploy full-stack apps in minutes",
//       },
//     ],
//     recommendedText: "Recommended",
//   },
//   {
//     id: "enterprise",
//     name: "Enterprise",
//     description: "For personal projects and small-scale applications.",

//     buttonText: "Contact us",
//     buttonUrl: "https://www.google.com",
//     price: {
//       primaryText: "$100",
//       secondaryText: "per month",
//     },
//     items: [
//       {
//         primaryText: "Deploy full-stack apps in minutes",
//       },
//     ],
//   },
// ];
export const products: Product[] = [
  {
    id: "hobby",
    name: "Hobby",
    description: "For personal projects and small-scale applications.",
    price: { primaryText: "Free", secondaryText: "up to 3 users" },
    buttonText: "Start deploying",
    items: [
      {
        primaryText: "Deploy full-stack apps in minutes",
      },
      {
        primaryText: "Fully-managed datastores",
      },
      {
        primaryText: "Custom domains",
      },
      {
        primaryText: "Global CDN & regional hosting",
      },
      {
        primaryText: "Get security out of the box",
      },
      {
        primaryText: "Email support",
      },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "For teams building production applications.",
    recommendedText: "Best Value",
    price: {
      primaryText: "$19",
      secondaryText: "per user/month plus compute costs*",
    },
    priceAnnual: {
      primaryText: "$190",
      secondaryText: "per user/year plus compute costs*",
    },
    buttonText: "Select plan",
    everythingFrom: "Hobby",
    items: [
      {
        primaryText: "10 team members included",
        secondaryText: "Then $20 per member",
      },
      {
        primaryText: "500 GB of bandwidth included",
      },
      {
        primaryText: "Unlimited projects & environments",
      },
      {
        primaryText: "Horizontal autoscaling",
      },
      {
        primaryText: "Test with preview environments",
      },
      {
        primaryText: "Isolated environments",
      },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For mission critical applications with complex needs.",
    price: { primaryText: "Custom" },
    buttonText: "Get in touch",
    everythingFrom: "Organization",
    items: [
      {
        primaryText: "Centralized team management",
      },
      {
        primaryText: "Guest users",
      },
      {
        primaryText: "SAML SSO & SCIM",
      },
      {
        primaryText: "Guaranteed uptime",
      },
      {
        primaryText: "Premium support",
      },
      {
        primaryText: "Customer success",
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
