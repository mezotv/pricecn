"use client";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandBar } from "@/components/landing/command-bar";
import { Geist_Mono, Geist } from "next/font/google";
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
import { products } from "@/registry/classic/example";

import {
  PricingDialog as PricingDialogDev,
  PricingDialogTitle as PricingDialogTitleDev,
  Information as InformationDev,
  PriceItem as PriceItemDev,
  QuantityInput as QuantityInputDev,
  PricingDialogFooter as PricingDialogFooterDev,
  TotalPrice as TotalPriceDev,
  PricingDialogButton as PricingDialogButtonDev,
} from "@/registry/dev/pricing-dialog";
import {
  PricingDialog as PricingDialogClassic,
  PricingDialogTitle as PricingDialogTitleClassic,
  Information as InformationClassic,
  PriceItem as PriceItemClassic,
  QuantityInput as QuantityInputClassic,
  PricingDialogFooter as PricingDialogFooterClassic,
  TotalPrice as TotalPriceClassic,
  PricingDialogButton as PricingDialogButtonClassic,
} from "@/registry/classic/pricing-dialog";
import {
  PricingDialog as PricingDialogClean,
  PricingDialogTitle as PricingDialogTitleClean,
  Information as InformationClean,
  PriceItem as PriceItemClean,
  QuantityInput as QuantityInputClean,
  PricingDialogFooter as PricingDialogFooterClean,
  TotalPrice as TotalPriceClean,
  PricingDialogButton as PricingDialogButtonClean,
} from "@/registry/clean/pricing-dialog";

const dialogVariants = {
  dev: {
    PricingDialog: PricingDialogDev,
    PricingDialogTitle: PricingDialogTitleDev,
    Information: InformationDev,
    PriceItem: PriceItemDev,
    QuantityInput: QuantityInputDev,
    PricingDialogFooter: PricingDialogFooterDev,
    TotalPrice: TotalPriceDev,
    PricingDialogButton: PricingDialogButtonDev,
  },
  classic: {
    PricingDialog: PricingDialogClassic,
    PricingDialogTitle: PricingDialogTitleClassic,
    Information: InformationClassic,
    PriceItem: PriceItemClassic,
    QuantityInput: QuantityInputClassic,
    PricingDialogFooter: PricingDialogFooterClassic,
    TotalPrice: TotalPriceClassic,
    PricingDialogButton: PricingDialogButtonClassic,
  },
  clean: {
    PricingDialog: PricingDialogClean,
    PricingDialogTitle: PricingDialogTitleClean,
    Information: InformationClean,
    PriceItem: PriceItemClean,
    QuantityInput: QuantityInputClean,
    PricingDialogFooter: PricingDialogFooterClean,
    TotalPrice: TotalPriceClean,
    PricingDialogButton: PricingDialogButtonClean,
  },
};

import { CodeEditor } from "@/components/landing/code-editor";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [variant, setVariant] = React.useState("classic");
  const [error, setError] = React.useState(false);
  const [customConfig, setCustomConfig] = React.useState(
    JSON.stringify(products, null, 2)
  );
  const [currentProducts, setCurrentProducts] = React.useState(products);
  const [quantity, setQuantity] = React.useState(1);

  const handleConfigChange = (value: string) => {
    try {
      setCustomConfig(value);
      const parsed = JSON.parse(value);
      setCurrentProducts(parsed);
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

  const {
    PricingDialog,
    PricingDialogTitle,
    Information,
    PriceItem,
    QuantityInput,
    PricingDialogFooter,
    TotalPrice,
    PricingDialogButton,
  } = dialogVariants[variant];

  return (
    <div className="h-full w-full flex flex-col justify-center items-center dark:bg-black">
      <div className="h-full w-full flex flex-col items-center gap-4 px-4 sm:px-8">
        <div className="py-4 flex w-full justify-between items-center">
          <div className={`${geistMono.className} text-2xl font-bold`}>
            pricecn
          </div>
        </div>
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
                  onClick={() => {
                    window.open("https://docs.pricecn.com", "_blank");
                  }}
                >
                  <Link href="https://docs.pricecn.com" target="_blank">
                    Docs
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      "https://github.com/useautumn/pricecn",
                      "_blank"
                    );
                  }}
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
                    "bg-white bg-gradient-to-br from-background to-stone-50 dark:from-background/95 dark:to-background"
                )}
                products={currentProducts}
                showFeatures={true}
              >
                {currentProducts.map((product) => (
                  <PricingCard key={product.id} productId={product.id} />
                ))}
              </PricingTable>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div
                  className={cn(
                    "w-full max-w-xl border bg-background",
                    variant === "classic" && "rounded-lg",
                    variant === "clean" && "rounded-md",
                    variant === "dev" && "border border-primary"
                  )}
                >
                  <PricingDialogTitle className="text-xl font-bold px-6">
                    You've hit your credit limit
                  </PricingDialogTitle>
                  <Information>
                    You're out of credits in the Free plan. Upgrade to Pro to
                    get access to 2000 credits per month and more.
                  </Information>
                  <div className="px-2 pb-2 sm:px-6 pt-4 sm:pb-6">
                    <PricingTable
                      className={cn(
                        variant === "classic" &&
                          "shadow-none dark:bg-zinc-900 bg-stone-100"
                      )}
                      products={currentProducts}
                      uniform={true}
                      showFeatures={false}
                    >
                      {currentProducts.slice(1).map((product) => (
                        <PricingCard key={product.id} productId={product.id} />
                      ))}
                    </PricingTable>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-full h-fit max-w-xl border bg-background text-sm",
                    variant === "classic" && "rounded-lg",
                    variant === "clean" && "rounded-md",
                    variant === "dev" && "border border-primary"
                  )}
                >
                  <PricingDialogTitle className="text-xl font-bold px-6">
                    Upgrade to Pro
                  </PricingDialogTitle>
                  <Information>
                    By clicking confirm, you will subscribe to Pro and the
                    following amount will be charged:
                  </Information>
                  <PriceItem>
                    <span>Subscription</span>
                    <span>$10.00 per month</span>
                  </PriceItem>
                  <PriceItem>
                    <span>Credits</span>
                    <span>2000 included per month, then $0.001 each</span>
                  </PriceItem>
                  <PriceItem>
                    <span>Seats</span>
                    <QuantityInput
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value));
                      }}
                    >
                      <span className="truncate">x $20 each</span>
                    </QuantityInput>
                  </PriceItem>
                  <PricingDialogFooter>
                    <TotalPrice>
                      <span>Due Today</span>
                      <span>${10 + quantity * 20}</span>
                    </TotalPrice>
                    <PricingDialogButton>Confirm</PricingDialogButton>
                  </PricingDialogFooter>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
        <div className="w-full py-6 flex justify-center items-center gap-1.5 text-sm text-muted-foreground">
          Made with ❤️ by{" "}
          <a href="https://useautumn.com" target="_blank" className="underline">
            Autumn
          </a>
        </div>
      </div>
    </div>
  );
}
