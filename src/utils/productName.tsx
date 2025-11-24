import { Product } from "@/Type/ProductType";

export function productName(product: Product) {
  return product.quantity_imported
  ? `${product.product_name_fr} - ${product.quantity_imported}`
  : product.product_name_fr
}
