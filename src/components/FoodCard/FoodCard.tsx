import { CandyCane } from 'lucide-react';
import { Product } from '../../Type/ProductType';
import { Nutriscore } from '../Nutriscrore/Nutriscore';
import ToolTip from '../ToolTip';

type FoodCardProps = {
  searchText: string;
  getProducts: Product[];
};

export const FoodCard = ({ searchText, getProducts }: FoodCardProps) => {
  if (!searchText || getProducts.length === 0) return null;

  const highestProtein = getProducts.reduce((max, item) => {
    return item.nutriments.proteins > max.nutriments.proteins ? item : max
  });

  const highestKcal = getProducts.reduce((max, item) => {  
    return item.nutriments["energy-kcal"] > max.nutriments["energy-kcal"] ?  item : max
  });

  const highestSugars = getProducts.reduce((max, item) => {  
    return item.nutriments.sugars > max.nutriments.sugars ?  item : max
  });

  const kcalImg = <img src= "./kcal.png" className="w-[30px] object-contain" />
  const proteinImg = <img src= "./protein.png" className="w-10 object-contain" />

  function nutrimentsBadge(productId: string) {
    if (highestKcal || highestProtein || highestSugars) {
      return (
        <div className="mt-[15px] flex gap-4">
          {highestKcal.id === productId && <ToolTip icon={kcalImg} text="Ce produit est le moins calorique" />}
          {highestProtein.id === productId && <ToolTip icon={proteinImg} text="Ce produit est le plus riche en protéines" />}
          {highestSugars.id === productId && <ToolTip icon={<CandyCane color="#AD7F58" />} text="Ce produit est le plus riche en sucre" />}
        </div>
      )
    }
  }
  
  return (
    <div className="w-full grid justify-center gap-8 grid-cols-[repeat(auto-fit,100%)] md:grid-cols-[repeat(auto-fit,40rem)]">
      {getProducts.map((product) =>
        product.product_name_fr ? (
          <label
            htmlFor={product.id}
            className="
              block box-content p-4 rounded-[10px] cursor-pointer border-2 border-solid border-transparent 
              has-[>input:checked]:border-[#E1DCCF]
            "
            key={product.id}
          >
            <input type="checkbox" id={product.id} name={product.id} className="absolute hidden" />
            <div className="flex flex-row gap-8 items-center">
              <div className="h-[100px] overflow-hidden flex">
                <img
                  src={product.image_url}
                  title={product.product_name_fr}
                  alt={product.product_name_fr}
                />
              </div>

              <div className="flex flex-col justify-around gap-[5px]">
                <div className="font-bold text-[15px]">
                  {product.quantity_imported
                    ? `${product.product_name_fr} - ${product.quantity_imported}`
                    : product.product_name_fr}
                </div>
                
                <div className="flex gap-4 items-center">
                  <Nutriscore nutriscore={product.nutrition_grades} />
                  {nutrimentsBadge(product.id)}
                </div>
              </div>
            </div>
          </label>
        ) : null
      )}
    </div>
  );
};
