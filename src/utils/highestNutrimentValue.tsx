import { Product } from "@/Type/ProductType";

export function highestNutrimentValue(products: Product[]) {
  const highestProtein = products.reduce((max, item) => {
    return item.nutriments.proteins > max.nutriments.proteins ? item : max
  });

  const highestKcal = products.reduce((max, item) => {  
    return item.nutriments["energy-kcal"] > max.nutriments["energy-kcal"] ?  item : max
  });

  const highestSugars = products.reduce((max, item) => {  
    return item.nutriments.sugars > max.nutriments.sugars ?  item : max
  });

  const highestSalt = products.reduce((max, item) => {  
    return item.nutriments.salt > max.nutriments.salt ?  item : max
  });

  const highestFat = products.reduce((max, item) => {  
    return item.nutriments.fat > max.nutriments.fat ?  item : max
  });

  return { highestProtein, highestKcal, highestSugars, highestSalt, highestFat }
}