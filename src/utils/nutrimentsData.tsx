import { Product } from "@/Type/ProductType";

export function nutrimentsData(item: Product) { 
  const data = [
    {
      nutriment: "Proteines",
      value: item.nutriments.proteins
    }, {
      nutriment: "Glucides",
      value: item.nutriments.carbohydrates
    }, {
      nutriment: "Fibres",
      value: item.nutriments.fiber
    }
  ];

  return { data }
}
