interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

export interface PricingDialogProps extends BaseComponentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface PricingDialogTitleProps extends BaseComponentProps {}

export interface InformationProps extends BaseComponentProps {}

export interface PriceItemProps extends BaseComponentProps {}

export interface QuantityProps extends BaseComponentProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PricingDialogFooterProps extends BaseComponentProps {}

export interface TotalPriceProps extends BaseComponentProps {}