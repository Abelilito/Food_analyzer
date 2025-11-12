// FoodCard.tsx
import { Product } from '../../Type/ProductType';
import { Nutriscore } from '../Nutriscrore/Nutriscore';

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
            className="block box-content p-4 rounded-[10px] cursor-pointer border-2 border-solid border-transparent has-[>input:checked]:border-[#E1DCCF]"
            key={product.id}
          >
            <input type="checkbox" id={product.id} name={product.id} className="absolute hidden" />
            <div className="flex flex-row gap-8">
              <div className="h-[100px] overflow-hidden flex">
                <img
                  src={product.image_url}
                  title={product.product_name_fr}
                  alt={product.product_name_fr}
                />
              </div>

              <div className="flex flex-col justify-around">
                <div className="font-bold text-[15px]">
                  {product.quantity_imported
                    ? `${product.product_name_fr} - ${product.quantity_imported}`
                    : product.product_name_fr}
                </div>

                <Nutriscore nutriscore={product.nutrition_grades} />
              </div>
            </div>
          </label>
        ) : null
      )}
    </div>
  );
};
