import { Product } from "@/Type/ProductType";
import { highestNutrimentValue } from "./highestNutrimentValue";
import { nutrimentsImg } from "./nutrimentsImg";
import { NutrimentType } from "@/Type/NutrimentType";

export function comparisonNutriments(productsSelected: Product[]) {
  const { highestProtein, highestKcal, highestSugars, highestSalt, highestFat } = highestNutrimentValue(productsSelected);
  const { kcalImg, proteinImg, sugarImg, saltImg, fatImg } = nutrimentsImg();
  
  const safeNumber = (value: number | string | undefined): number => {
    if (value === undefined || value === null) return 0;
    return typeof value === 'number' ? value : parseFloat(value);
  }

  const safePercentage = (value: number | string | undefined, max: number | string | undefined): number => {
    const num = safeNumber(value);
    const maxNum = safeNumber(max);
    if (maxNum === 0) return 0;
    return (num / maxNum) * 100;
  }

  const getNutrimentStatus = (value: number, allValues: number[]): "max" | "multipleMax" | "normal" => {
    const maxValue = Math.max(...allValues);
    const maxCount = allValues.filter(v => v === maxValue).length;

    if (value === maxValue && maxCount > 1) return "multipleMax"; 
    if (value === maxValue) return "max"; 
    return "normal"; 
  }

  const allProteins = productsSelected.map(p => safeNumber(p.nutriments.proteins));
  const allCalories = productsSelected.map(p => safeNumber(p.nutriments["energy-kcal"]));
  const allSugars = productsSelected.map(p => safeNumber(p.nutriments.sugars));
  const allSalt = productsSelected.map(p => safeNumber(p.nutriments.salt));
  const allFat = productsSelected.map(p => safeNumber(p.nutriments.fat));

  const tableRowItems = (nutriments: Product["nutriments"]): (NutrimentType & {status: "max" | "multipleMax" | "normal"})[] => [
    {
      name: "Proteines",
      unit: "g",
      dataId: highestProtein?.id,
      img: proteinImg,
      nutrimentsValue: safeNumber(nutriments.proteins),
      percentage: safePercentage(nutriments.proteins, highestProtein?.nutriments.proteins),
      status: getNutrimentStatus(safeNumber(nutriments.proteins), allProteins)
    },
    {
      name: "Calories",
      unit: "kcal",
      dataId: highestKcal?.id,
      img: kcalImg,
      nutrimentsValue: safeNumber(nutriments["energy-kcal"]),
      percentage: safePercentage(nutriments["energy-kcal"], highestKcal?.nutriments["energy-kcal"]),
      status: getNutrimentStatus(safeNumber(nutriments["energy-kcal"]), allCalories)
    },
    {
      name: "Sucres",
      unit: "g",
      dataId: highestSugars?.id,
      img: sugarImg,
      nutrimentsValue: safeNumber(nutriments.sugars),
      percentage: safePercentage(nutriments.sugars, highestSugars?.nutriments.sugars),
      status: getNutrimentStatus(safeNumber(nutriments.sugars), allSugars)
    },
    {
      name: "Sels",
      unit: "g",
      dataId: highestSalt?.id,
      img: saltImg,
      nutrimentsValue: safeNumber(nutriments.salt),
      percentage: safePercentage(nutriments.salt, highestSalt?.nutriments.salt),
      status: getNutrimentStatus(safeNumber(nutriments.salt), allSalt)
    },
    {
      name: "Gras",
      unit: "g",
      dataId: highestFat?.id,
      img: fatImg,
      nutrimentsValue: safeNumber(nutriments.fat),
      percentage: safePercentage(nutriments.fat, highestFat?.nutriments.fat),
      status: getNutrimentStatus(safeNumber(nutriments.fat), allFat)
    }
  ]

  return { tableRowItems }
}
