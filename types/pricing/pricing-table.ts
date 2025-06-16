import { Product } from "../product";

export interface PricingTableContextProps {
    isAnnual: boolean;
    setIsAnnual: (isAnnual: boolean) => void;
    products: Product[];
    showFeatures: boolean;
    uniform: boolean;
}

export interface PricingTableProps {
  children?: React.ReactNode;
  products?: Product[];
  showFeatures?: boolean;
  className?: string;
  uniform?: boolean;
}

export interface PricingCardProps {
  productId: string;
  className?: string;
  onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonProps?: React.ComponentProps<"button">;
}

export interface PricingItem {
  primaryText: string;
  secondaryText?: string;
}

export interface PricingFeatureListProps {
  items: PricingItem[];
  showIcon?: boolean;
  everythingFrom?: string;
  className?: string;
  translations?: {
    everythingFromPlus?: string;
  };
}

export interface PricingCardButtonProps extends React.ComponentProps<"button"> {
  recommended?: boolean;
  buttonUrl?: string;
}

export interface AnnualSwitchProps {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
  translations?: {
    monthly: string;
    annual: string;
  };
}

export interface RecommendedBadgeProps {
  recommended: string;
}
