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

  const hightlightWithLineNumbers = (input: string, language: any) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center dark:bg-zinc-900">
      <div className="h-full w-full flex flex-col items-center gap-4">
        <div className="px-8 py-4 flex w-full justify-between items-center">
          <div className={`${geistMono.className} text-2xl font-bold`}>
            pricecn
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center px-8 max-w-7xl">
          <div className="flex gap-6 flex-col md:flex-row md:gap-12 justify-between w-full">
            <div className="flex flex-col gap-8 w-full justify-center max-w-[500px]">
              <div className="flex flex-col gap-2 md:gap-4">
                <h1
                  className={`${geist.className} text-2xl md:text-4xl font-bold tracking-tight`}
                >
                  Beautiful, customizable, pricing components
                </h1>
                <p className="text-muted-foreground text-sm">
                  A collection of React components that automatically generate
                  based on a JSON config. Open source and free to use.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <CommandBar />
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
            <div className="flex flex-col w-full relative rounded-md max-w-[700px]">
              {error ? (
                <div className="bg-red-600 translate-y-2 pb-2 rounded-t-lg text-white h-10 items-center justify-center flex top-0 right-0 w-full z-100 text-sm">
                  Invalid JSON
                </div>
              ) : (
                <div className="h-10 translate-y-2 flex items-center pb-3 text-sm bg-transparent text-muted-foreground z-0">
                  Try me
                  <span className="hidden sm:inline">
                    &nbsp;with your own products
                  </span>
                  ! &nbsp;
                  <span className="translate-y-1 ml-1">↴</span>
                </div>
              )}
              <div className="overflow-scroll z-10 max-h-[450px] rounded-md border bg-zinc-900 shadow-lg shadow-black/60 border-zinc-700 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#18181b] [&::-webkit-scrollbar-track]:rounded-md [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-md overflow-x-hidden">
                <style>
                  {`
                    .editorLineNumber {
                    position: absolute;
                    left: 0px;
                    color: #666;
                    text-align: right;
                    width: 25px;
                    font-weight: 100;
                    }
                  
                  `}
                </style>
                <Editor
                  value={customConfig}
                  onValueChange={handleConfigChange}
                  highlight={(code) =>
                    hightlightWithLineNumbers(code, languages.js)
                  }
                  padding={10}
                  textareaClassName="focus:outline-none !pl-12"
                  preClassName="!pl-12"
                  style={{
                    // fontFamily: geistMono.className,
                    fontFamily: "monospace",
                    fontSize: 11,
                    // backgroundColor: "#18181b",
                    caretColor: "white",
                    color: "white",
                    // boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",

                    // padding: "24px",
                    // paddingTop: "0px",
                  }}
                />
              </div>
            </div>
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
