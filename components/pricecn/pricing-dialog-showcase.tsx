import { cn } from "@/lib/utils";
import {
  PricingTable as PricingTableClassic,
  PricingCard as PricingCardClassic,
} from "@/registry/classic/pricing-table";
import {
  PricingTable as PricingTableClean,
  PricingCard as PricingCardClean,
} from "@/registry/clean/pricing-table";
import {
  PricingTable as PricingTableDev,
  PricingCard as PricingCardDev,
} from "@/registry/dev/pricing-table";
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
    PricingTable: PricingTableDev,
    PricingCard: PricingCardDev,
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
    PricingTable: PricingTableClassic,
    PricingCard: PricingCardClassic,
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
    PricingTable: PricingTableClean,
    PricingCard: PricingCardClean,
  },
};

export const PricingDialogShowcase = ({
  variant,
  currentProducts,
  quantity,
  setQuantity,
}: {
  variant: "classic" | "clean" | "dev";
  currentProducts: any[];
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  const {
    PricingDialogTitle,
    Information,
    PriceItem,
    QuantityInput,
    PricingDialogFooter,
    TotalPrice,
    PricingDialogButton,
    PricingTable,
    PricingCard,
  } = dialogVariants[variant];

  const products = currentProducts.slice(1).map((product) => ({
    ...product,
    recommendedText: undefined,
  }));
  // console.log(products);
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <div
        className={cn(
          "w-full max-w-xl border bg-background",
          variant === "classic" && "rounded-lg",
          variant === "clean" && "rounded-md",
          variant === "dev" && "border border-primary"
        )}
      >
        <PricingDialogTitle className="text-xl font-bold px-6">
          Want more credits?
        </PricingDialogTitle>
        <Information>
          You are out of credits in the Free plan. Upgrade to Pro to get access
          to 2000 credits per month and more.
        </Information>
        <div className="px-2 pb-2 sm:px-6 pt-4 sm:pb-6">
          <PricingTable
            className={cn(
              variant === "classic" &&
                "shadow-none dark:bg-zinc-900 bg-stone-100"
            )}
            products={products}
            uniform={true}
            showFeatures={false}
          >
            {products.map((product) => (
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
          By clicking confirm, you will subscribe to Pro and the following
          amount will be charged:
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
          <PricingDialogButton onClick={() => {}}>Confirm</PricingDialogButton>
        </PricingDialogFooter>
      </div>
    </div>
  );
};
