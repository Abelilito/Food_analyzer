import { Nutriscore } from '../Nutriscrore/Nutriscore'

export const FoodCard = ({searchText, getProducts}) => {
  console.log(searchText);
  
  return (
    <div className="w-full grid justify-center gap-8 grid-cols-[repeat(auto-fit,100%)] md:grid-cols-[repeat(auto-fit,40rem)]">
      {searchText && getProducts?.map((product, index) =>
        product.product_name_fr && (
          <label
            htmlFor={product.id}
            className="
              block box-content p-4 rounded-[10px] cursor-pointer border-2 border-solid border-transparent
              has-[>input:checked]:border-[#E1DCCF]
            "
            key={index}
            // onClick={() => setGetCode(product.code)}
          >
            <input
              type="checkbox"
              id={product.id}
              name={product.id}
              className="absolute hidden"
            />
            <div className="flex flex-row gap-8">
              <div className="h-[100px] overflow-hidden flex">
                <img
                  src={product.image_url}
                  title={product.product_name_fr}
                />
              </div>

              <div className="flex flex-col justify-around">
                <div className="font-bold text-[15px]">
                  { product.quantity_imported ? `${product.product_name_fr} - ${product.quantity_imported}` : product.product_name_fr}
                </div>

                <Nutriscore nutriscore={product.nutrition_grades} />
              </div>
            </div>
          </label>
        )
      )}
    </div>
  )
}
