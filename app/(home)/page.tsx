"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandBar } from "@/components/landing/command-bar";
import { Geist } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import {
  PricingCard as PricingCardClassic,
  PricingTable as PricingTableClassic,
} from "@/registry/classic/pricing-table";
import {
  PricingCard as PricingCardDev,
  PricingTable as PricingTableDev,
} from "@/registry/dev/pricing-table";
import {
  PricingCard as PricingCardClean,
  PricingTable as PricingTableClean,
} from "@/registry/clean/pricing-table";
import { products } from "@/lib/util/constant";

import { CodeEditor } from "@/components/landing/code-editor";
import { cn } from "@/lib/utils";
import { PricingDialogShowcase } from "@/components/pricecn/pricing-dialog-showcase";
import { useState } from "react";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [variant, setVariant] = useState("classic");
  const [error, setError] = useState(false);
  const [customConfig, setCustomConfig] = useState(
    JSON.stringify(products, null, 2)
  );
  const [currentProducts, setCurrentProducts] = useState(products.products);
  const [quantity, setQuantity] = useState(1);

  const handleConfigChange = (value: string) => {
    try {
      setCustomConfig(value);
      const parsed = JSON.parse(value);
      setCurrentProducts(parsed.products);
      setError(false);
    } catch (e: any) {
      console.warn("Invalid JSON", e);
      setError(true);
    }
  };

  const PricingTable =
    variant === "classic"
      ? PricingTableClassic
      : variant === "clean"
      ? PricingTableClean
      : PricingTableDev;

  const PricingCard =
    variant === "classic"
      ? PricingCardClassic
      : variant === "clean"
      ? PricingCardClean
      : PricingCardDev;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center dark:bg-black">
      <div className="h-full w-full flex flex-col items-center gap-4 px-4 sm:px-8">
        <div className="h-full w-full flex flex-col items-center max-w-7xl">
          <div className="flex gap-6 flex-col md:flex-row md:gap-12 justify-between w-full">
            <div className="flex flex-col gap-8 w-full justify-center max-w-[500px]">
              <div className="flex flex-col gap-2 md:gap-4">
                <h1
                  className={`${geist.className} text-2xl md:text-4xl font-bold tracking-tight`}
                >
                  Beautiful, customizable, pricing components
                </h1>
                <p className="text-muted-foreground text-sm">
                  A collection of shadcn pricing components that can be
                  automatically generated from a JSON schema. Fully
                  customizable, open-source and free forever.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <CommandBar variant={variant} />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                >
                  <Link href="/docs">
                    Docs
                  </Link>
                </Button>
                <Button
                  variant="outline"
                >
                  <Link
                    href="https://github.com/useautumn/pricecn"
                    target="_blank"
                  >
                    Github
                  </Link>
                </Button>
              </div>
            </div>

            <CodeEditor
              customConfig={customConfig}
              handleConfigChange={handleConfigChange}
              error={error}
            />
          </div>
          <Tabs
            className="w-full py-10 max-w-7xl flex flex-col gap-6"
            value={variant}
            onValueChange={setVariant}
          >
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    document.documentElement.classList.toggle("dark");
                  }}
                  className="relative w-9 h-9 p-0 border-4 border-muted rounded-xl"
                >
                  <span className="sr-only">Toggle theme</span>
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                <TabsList>
                  <TabsTrigger value="classic">Classic</TabsTrigger>
                  <TabsTrigger value="clean">Clean</TabsTrigger>
                  <TabsTrigger value="dev">Dev</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="flex flex-col gap-16">
              <PricingTable
                className={cn(
                  variant === "classic" &&
                    "bg-white bg-linear-to-br from-background to-stone-50 dark:from-background/95 dark:to-background"
                )}
                products={currentProducts}
                showFeatures={true}
              >
                {currentProducts.map((product) => (
                  <PricingCard key={product.id} productId={product.id} />
                ))}
              </PricingTable>
              <PricingDialogShowcase
                variant={variant as "classic" | "clean" | "dev"}
                currentProducts={currentProducts}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </Tabs>
        </div>
        <div className="w-full py-6 flex justify-center items-center gap-1.5 text-sm text-muted-foreground">
          Made with ❤️ by{" "}
          <a href="https://useautumn.com" target="_blank" className="underline">
            Autumn
          </a>
          and
          <a href="https://github.com/mezotv" target="_blank" className="underline">
            Dominik
          </a>
        </div>
      </div>
    </div>
  );
}
