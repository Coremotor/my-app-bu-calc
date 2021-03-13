export type TBJEProduct = {
  id: string;
  caloriesInProduct: string;
  carbohydratesInProduct: string;
  BJEInAddedProduct: number
};

export type TBJEProductState = {
  bjeProducts: TBJEProduct[];
};
