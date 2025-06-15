export interface ProductItem {
  primaryText: string;
  secondaryText?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  everythingFrom?: string;

  buttonText?: string;
  buttonUrl?: string;

  recommendedText?: string;

  price: ProductItem;

  priceAnnual?: ProductItem;

  items: ProductItem[];
}
