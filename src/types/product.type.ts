export type ProductSegmentType = 'drink' | 'food' | 'both';

export type CreateProductType = {
  name: string;
  price: number;
  type: ProductSegmentType;
};

export type ProductType = CreateProductType & {
  id: string;
};
