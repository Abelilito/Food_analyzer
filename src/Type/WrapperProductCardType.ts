import { Product } from "./ProductType";

export type WrapperProductCardType = {
  searchText: string;
  getProducts: Product[];
  isSelected: (id: string) => boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
