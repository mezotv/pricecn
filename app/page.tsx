import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Pricing } from "@/registry/autumn/pricing";
import { products } from "@/registry/autumn/pricecn.config";

export default function Home() {
  return (
    <div className="max-w-full mx-auto flex flex-col min-h-svh gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg bg-black min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple hello world component
            </h2>
            <OpenInV0Button name="hello-world" className="w-fit" />
          </div>
          <div className="p-6">
            <Pricing
              showFeatures={true}
              products={products}
              variant="basic"
              className="dark"
            />
          </div>
        </div>
        <div className="p-6">
          <Pricing
            showFeatures={true}
            products={products}
            variant="basic"
            className="light"
          />
        </div>
        <div className="p-6 bg-black">
          <Pricing
            showFeatures={true}
            products={products}
            variant="dev"
            className="dark"
          />
        </div>
        <div className="p-6">
          <Pricing
            showFeatures={true}
            products={products}
            variant="dev"
            className="light"
          />
        </div>

        {/* <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A contact form with Zod validation.
            </h2>
            <OpenInV0Button name="example-form" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[500px] relative">
            <ExampleForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A complex component showing hooks, libs and components.
            </h2>
            <OpenInV0Button name="complex-component" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <PokemonPage />
          </div>
        </div> */}
      </main>
    </div>
  );
}
