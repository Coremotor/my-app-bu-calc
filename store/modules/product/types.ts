export type TProduct = {
  id: string;
  inOneXE: string;
  inOneHundredGrams: string;
  totalWeightProduct: string;
  XEInAddedProduct: number
};

export type TProductState = {
  products: TProduct[];
};
