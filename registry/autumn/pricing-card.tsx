import { cn } from "@/lib/utils";
import { Product } from "./pricecn.config";
import { PricingCardButton } from "./pricing-card-button";
import { PricingFeatureList } from "./pricing-feature-list";
import { RecommendedBadge } from "./recommended-badge";

interface PricingCardProps {
  product: Product;
  font: string;
  showFeatures: boolean;
}

export const PricingCardBasic = ({
  product,
  showFeatures,
}: PricingCardProps) => {
  const { name, price, recommendText, buttonText, items } = product;
  return (
    <div
      className={cn(
        "h-full outline shadow-inner outline-1 outline-border flex flex-col h-full text-foreground p-6",
        recommendText && "bg-stone-100 dark:bg-zinc-900"
      )}
    >
      <div className="">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="mt-2">
          <h3 className="font-semibold text-md">
            {price.primaryText}{" "}
            {price.secondaryText && (
              <span className="font-normal text-muted-foreground mt-1">
                {price.secondaryText}
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

      <div className="mt-2">
        <PricingCardButton
          recommended={recommendText ? true : false}
          onClick={product.onClick}
        >
          {buttonText}
        </PricingCardButton>
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
            onClick={product.onClick}
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
