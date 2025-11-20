import { Product } from '../../Type/ProductType';
import { Nutriscore } from '../Nutriscrore/Nutriscore';
import NutrimentsBadge from '../NutrimentsBadge';

type FoodCardProps = {
  searchText: string;
  getProducts: Product[];
};

export const FoodCard = ({ searchText, getProducts }: FoodCardProps) => {
  if (!searchText || getProducts.length === 0) return null;

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
