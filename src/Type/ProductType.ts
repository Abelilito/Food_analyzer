export type Product = {
  id: string;
  product_name_fr: string;
  quantity_imported?: string;
  nutrition_grades?: string;
  image_url?: string;
  code?: string;
  nutriments: { proteins: number, "energy-kcal": number, sugars: number, salt: string, fat: string }
};
