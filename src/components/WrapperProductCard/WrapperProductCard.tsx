import { WrapperProductCardType } from '@/Type/WrapperProductCardType';
import ProductCard from '../ProductCard';

export const WrapperProductCard = ({ searchText, getProducts, isSelected, handleChange }: WrapperProductCardType) => {
  if (!searchText || getProducts.length === 0) return null;

  return (
    <div className="
      w-full grid justify-center gap-8 grid-cols-[repeat(auto-fit,100%)] md:grid-cols-[repeat(auto-fit,40rem)]
    ">
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
            <ProductCard products={getProducts} item={product} />            
          </label>
        ) : null
      )}
    </div>
  );
};
