export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type MenuType = {
  productId: string;
  quantity: number;
  comment: string;
  price: number;
  name: string;
};