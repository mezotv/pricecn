"use client";
import * as React from "react";
// import { OpenInV0Button } from "@/components/open-in-v0-button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CommandBar } from "@/components/command-bar";
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
import { products } from "@/registry/dev/pricecn.config";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prism-themes/themes/prism-vsc-dark-plus.css";

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

  const handleConfigChange = (value: string) => {
    try {
      setCustomConfig(value);
      const parsed = JSON.parse(value);
      setCurrentProducts(parsed);
      setError(false);
    } catch (e) {
      // Handle parse errors if needed
      console.warn("Invalid JSON");
      setError(true);
    }
  };

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center dark:bg-zinc-900">
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
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center">
          <div className="flex gap-12 px-8">
            <div className="flex flex-col gap-6 w-full ">
              <h1
                className={`${geist.className} text-4xl font-bold tracking-tight`}
              >
                Beautiful, customizable, pricing components
              </h1>
              <div className="flex justify-between items-center">
                <CommandBar />
              </div>
            </div>
            <div className="flex flex-col overflow-hidden w-full relative rounded-xl border p-4 pt-0 bg-accent border-primary/20">
              {error ? (
                <div className="bg-red-600 translate-y-2 pb-2 rounded-t-lg text-white h-10 items-center justify-center flex top-0 right-0 w-full z-100 text-sm">
                  Invalid JSON
                </div>
              ) : (
                <div className="h-10 translate-y-2 flex items-center pb-3 text-sm bg-accent text-muted-foreground ">
                  Try with your own products 👇
                </div>
              )}
              <div className="overflow-scroll max-h-[500px] rounded-md [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#18181b] [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-md">
                <Editor
                  value={customConfig}
                  onValueChange={handleConfigChange}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    // fontFamily: geistMono.className,
                    fontFamily: "monospace",
                    fontSize: 11,
                    backgroundColor: "#18181b",
                    caretColor: "white",
                    color: "white",

                    // padding: "24px",
                    // paddingTop: "0px",
                  }}
                />
              </div>
            </div>
          </div>
          <Tabs
            className="w-full p-10 max-w-7xl flex flex-col gap-6"
            value={variant}
            onValueChange={setVariant}
          >
            <div className="flex justify-between items-end">
              <div className="flex-1 mx-4"></div>

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

            <TabsContent value="classic">
              <PricingTableClassic
                variant={variant as "classic"}
                className=""
                products={currentProducts}
              >
                {currentProducts.map((product) => (
                  <PricingCardClassic
                    key={product.id}
                    productId={product.id}
                    showFeatures={true}
                  />
                ))}
              </PricingTableClassic>
            </TabsContent>
            <TabsContent value="clean">
              <PricingTableClean className="" products={currentProducts}>
                {currentProducts.map((product) => (
                  <PricingCardClean
                    key={product.id}
                    productId={product.id}
                    showFeatures={true}
                  />
                ))}
              </PricingTableClean>
            </TabsContent>
            <TabsContent value="dev">
              <PricingTableDev
                variant={variant as "dev"}
                className=""
                products={currentProducts}
              >
                {currentProducts.map((product) => (
                  <PricingCardDev
                    key={product.id}
                    productId={product.id}
                    showFeatures={true}
                  />
                ))}
              </PricingTableDev>
            </TabsContent>
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
