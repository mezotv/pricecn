"use client";
import * as React from "react";
// import { OpenInV0Button } from "@/components/open-in-v0-button";
import { AnnualSwitch, Pricing } from "@/registry/autumn/pricing";
import { products } from "@/registry/autumn/pricecn.config";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandBar } from "@/components/command-bar";
import { Geist_Mono, Geist } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { PricingCard, PricingTable } from "@/registry/autumn/pricing-card";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [variant, setVariant] = React.useState("basic");

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#f9f9f9] dark:bg-zinc-900">
      <div className="h-full w-full flex flex-col items-center gap-4">
        <div className="px-8 py-4 flex w-full justify-between items-center">
          <div className={`${geistMono.className} text-2xl font-bold`}>
            pricecn
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Link href="/docs">Docs</Link>
            </Button>
            <Button variant="outline">
              <Link href="/docs">Github</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
              }}
              className="relative w-10 h-10 p-0"
            >
              <span className="sr-only">Toggle theme</span>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center">
          <Tabs
            className="w-full p-10 max-w-7xl flex flex-col gap-6"
            value={variant}
            onValueChange={setVariant}
          >
            <h1
              className={`${geist.className} text-4xl font-bold tracking-tight`}
            >
              Beautiful, customizable, pricing components
            </h1>
            <div className="flex justify-between items-end">
              <CommandBar />

              <TabsList>
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="dev">Dev</TabsTrigger>
              </TabsList>
            </div>
            {/* <Pricing
              showFeatures={true}
              products={products}
              variant={variant as "basic" | "dev"}
            /> */}
            <PricingTable variant={variant as "basic" | "dev"}>
              <PricingCard productId="hobby" />
              <PricingCard productId="organization" />
              <PricingCard productId="enterprise" />
            </PricingTable>
          </Tabs>
        </div>
        <div className="w-full py-6 flex justify-center items-center gap-1.5 text-sm text-muted-foreground">
          Made with ❤️ by Autumn
        </div>
      </div>

      {/* <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8"></main> */}
    </div>
  );
}

// <div className="flex flex-col gap-4 border rounded-lg bg-black min-h-[450px] relative">
//           <div className="flex items-center justify-between">
//             <h2 className="text-sm text-muted-foreground sm:pl-3">
//               A simple hello world component
//             </h2>
//             <OpenInV0Button name="hello-world" className="w-fit" />
//           </div>
//           <div className="p-6">
// <Pricing
//   showFeatures={true}
//   products={products}
//   variant="basic"
//   className="dark"
// />
//           </div>
//         </div>
//         <div className="p-6">
//           <Pricing
//             showFeatures={true}
//             products={products}
//             variant="basic"
//             className="light"
//           />
//         </div>
//         <div className="p-6 bg-black">
//           <Pricing
//             showFeatures={true}
//             products={products}
//             variant="dev"
//             className="dark"
//           />
//         </div>
//         <div className="p-6">
//           <Pricing
//             showFeatures={true}
//             products={products}
//             variant="dev"
//             className="light"
//           />
//         </div>
