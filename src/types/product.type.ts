export type CreateProductType = {
  name: string;
  price: number;
};

export type ProductType = CreateProductType & {
  id: string;
};
