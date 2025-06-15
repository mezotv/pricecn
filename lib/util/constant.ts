import type { Product } from "@/types/product";

export interface ProductsSchema {
  "$schema": string;
  products: Product[];
}

export const products: ProductsSchema = {
  "$schema": "https://www.pricecn.com/schemas/pricing.schema.json",
  "products": [
    {
      "id": "hobby",
      "name": "Hobby",
      "description": "For personal projects and small-scale applications.",
      "price": { "primaryText": "Free", "secondaryText": "up to 3 users" },
      "buttonText": "Start deploying",
      "items": [
        { "primaryText": "Deploy full-stack apps in minutes" },
        { "primaryText": "Fully-managed datastores" },
        { "primaryText": "Custom domains" },
        { "primaryText": "Global CDN & regional hosting" },
        { "primaryText": "Get security out of the box" },
        { "primaryText": "Email support" }
      ]
    },
    {
      "id": "professional",
      "name": "Pro",
      "description": "For teams building production applications.",
      "recommendedText": "Best Value",
      "price": {
        "primaryText": "$19",
        "secondaryText": "per user/month plus compute costs*"
      },
      "priceAnnual": {
        "primaryText": "$190",
        "secondaryText": "per user/year plus compute costs*"
      },
      "buttonText": "Select plan",
      "everythingFrom": "Hobby",
      "items": [
        {
          "primaryText": "10 team members included",
          "secondaryText": "Then $20 per member"
        },
        { "primaryText": "500 GB of bandwidth included" },
        { "primaryText": "Unlimited projects & environments" },
        { "primaryText": "Horizontal autoscaling" },
        { "primaryText": "Test with preview environments" },
        { "primaryText": "Isolated environments" }
      ]
    },
    {
      "id": "enterprise",
      "name": "Enterprise",
      "description": "For mission critical applications with complex needs.",
      "price": { "primaryText": "Custom", "secondaryText": "pricing for your team" },
      "buttonText": "Get in touch",
      "everythingFrom": "Organization",
      "items": [
        { "primaryText": "Centralized team management" },
        { "primaryText": "Guest users" },
        { "primaryText": "SAML SSO & SCIM" },
        { "primaryText": "Guaranteed uptime" },
        { "primaryText": "Premium support" },
        { "primaryText": "Customer success" }
      ]
    }
  ]
}