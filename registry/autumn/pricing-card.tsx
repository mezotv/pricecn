import { cn } from "@/lib/utils";
import { Product } from "./pricecn.config";
import { PricingCardButton } from "./pricing-card-button";
import { PricingFeatureList } from "./pricing-feature-list";
import { RecommendedBadge } from "./recommended-badge";

interface PricingCardProps {
  product: Product;
  font: string;
  showFeatures: boolean;
  isAnnual?: boolean;
}

export const PricingCardBasic = ({
  product,
  showFeatures,
  isAnnual,
}: PricingCardProps) => {
  const { name, price, priceAnnual, recommendText, buttonText, items } =
    product;
  return (
    <div className={cn("w-full h-full")}>
      <div
        className={cn(
          "h-full flex flex-col text-foreground p-6",
          recommendText &&
            "bg-stone-100 dark:bg-zinc-900 lg:outline lg:outline-1 lg:outline-border lg:-translate-y-8 lg:rounded-xl lg:pt-14 lg:pb-14 lg:h-[calc(100%+64px)] lg:shadow-xl lg:shadow-zinc-200 lg:dark:shadow-zinc-800"
        )}
      >
        <div className="flex flex-col h-full flex-grow">
          <div className="">
            <h2 className="text-2xl font-bold">{name}</h2>
            <div className="mt-2">
              <h3 className="font-semibold text-md">
                {isAnnual && priceAnnual
                  ? priceAnnual?.primaryText
                  : price.primaryText}{" "}
                {price.secondaryText && (
                  <span className="font-normal text-muted-foreground mt-1">
                    {isAnnual && priceAnnual
                      ? priceAnnual?.secondaryText
                      : price.secondaryText}
                  </span>
                )}
              </h3>
            </div>
          </div>
          {showFeatures && (
            <div className="flex-grow">
              <PricingFeatureList items={items} showIcon={true} />
            </div>
          )}
          <div className={cn("mt-2", recommendText && "")}>
            <PricingCardButton
              recommended={recommendText ? true : false}
              priceVariant="basic"
            >
              {buttonText}
            </PricingCardButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingCardDev = ({
  product,
  font,
  showFeatures,
}: PricingCardProps) => {
  const { name, price, recommendText, buttonText, items, description } =
    product;

  return (
    <div
      className="w-full outline outline-white
    relative flex flex-col h-full rounded-none z-0 text-foreground isolation-auto"
    >
      {recommendText && (
        <RecommendedBadge recommended={recommendText} position="top" />
      )}

      <div className="bg-background h-full">
        <div className={`flex flex-col gap-2 bg-primary/30 saturate-150 p-6`}>
          <h2 className={`text-xl ${font}`}>{name}</h2>
          <p className="text-sm h-12">{description}</p>
        </div>
        <div className="h-28 p-6 overflow-hidden">
          <h3 className={`text-3xl truncate ${font}`}>{price.primaryText}</h3>
          {price.secondaryText && (
            <p className="text-sm text-muted-foreground mt-1">
              {price.secondaryText}
            </p>
          )}
        </div>

        <div className="p-2">
          <PricingCardButton
            recommended={recommendText ? true : false}
            priceVariant="dev"
          >
            {buttonText}
          </PricingCardButton>
        </div>

        {showFeatures && (
          <div className="px-6">
            <PricingFeatureList items={items} showIcon={false} />
          </div>
        )}
      </div>
    </div>
  );
};
