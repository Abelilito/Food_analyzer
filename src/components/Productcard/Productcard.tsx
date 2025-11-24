import { Product } from '../../Type/ProductType';
import { Nutriscore } from '../Nutriscrore/Nutriscore';
import NutrimentsBadge from '../NutrimentsBadge';
import { productName } from '@/utils/productName';
import Score from '../Score';

type ProductCardProps = {
  searchText: string;
  getProducts: Product[];
  isSelected: (id: string) => boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProductCard = ({ searchText, getProducts, isSelected, handleChange }: ProductCardProps) => {
  if (!searchText || getProducts.length === 0) return null;
  console.log(getProducts);
  

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
            <input 
              type="checkbox"
              id={product.id}
              name={product.id}
              className="absolute hidden"
              checked={isSelected(product.id)}
              onChange={(e) => handleChange(e)}
            />

            <div className="flex flex-row gap-8 items-center">
              <div className="h-[100px] overflow-hidden flex">
                <img
                  src={product.image_url}
                  title={product.product_name_fr}
                  alt={product.product_name_fr}
                />
              </div>

              <div className="flex flex-col justify-around gap-[5px] w-full">
                <div className="font-bold text-[15px] flex justify-between gap-4">
                  {productName(product)}
                  <Score nutriscore={product.nutrition_grades} sugarLevel={product.nutriments.sugars} />
                </div>
                
                <div className="flex gap-4 items-center">
                  <Nutriscore nutriscore={product.nutrition_grades} />
                  <NutrimentsBadge getProducts={getProducts} productId={product.id} />
                </div>
              </div>
            </div>
          </label>
        ) : null
      )}
    </div>
  );
};
