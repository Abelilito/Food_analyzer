import { Product } from "@/Type/ProductType";

export function highestNutrimentValue(products: Product[]) {
  const getHighestNutrient = (products: Product[], key: keyof Product["nutriments"]) => {
  if (!products.length) return null;
  const firstValue = products[0].nutriments[key];
  if (products.every(p => p.nutriments[key] === firstValue)) return null;
  return products.reduce((max, item) => item.nutriments[key] > max.nutriments[key] ? item : max, products[0]);
}

  const highestProtein = getHighestNutrient(products, "proteins");

  const highestKcal = getHighestNutrient(products, "energy-kcal"); 

  const highestSugars = getHighestNutrient(products, "sugars");

  const highestSalt = getHighestNutrient(products, "salt");

  const highestFat = getHighestNutrient(products, "fat");

  return { highestProtein, highestKcal, highestSugars, highestSalt, highestFat }
}
