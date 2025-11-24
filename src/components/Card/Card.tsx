import { productName } from "@/utils/productName"
import Score from "../Score"
import { Nutriscore } from "../Nutriscrore/Nutriscore"
import NutrimentsBadge from "../NutrimentsBadge"
import { Product } from "@/Type/ProductType"

type CardType = {
  item: Product;
  products: Product[];
}

export const Card = ({ item, products }: CardType) => {
  return (
    <div className="flex flex-row gap-8 items-center">
      <div className="h-[100px] overflow-hidden flex">
        <img
          src={item.image_url}
          title={item.product_name_fr}
          alt={item.product_name_fr}
        />
      </div>

      <div className="flex flex-col justify-around gap-[5px] w-full">
        <div className="font-bold text-[15px] flex justify-between gap-4">
          {productName(item)}
          <Score nutriscore={item.nutrition_grades} sugarLevel={item.nutriments.sugars} />
        </div>
        
        <div className="flex gap-4 items-center">
          <Nutriscore nutriscore={item.nutrition_grades} />
          <NutrimentsBadge getProducts={products} productId={item.id} />
        </div>
      </div>
    </div>
  )
}
