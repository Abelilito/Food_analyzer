import React, { useEffect, useState } from "react";
import { fetchFood } from "../../Data/GetFood";
import { Nutriscore } from "../Nutriscrore/Nutriscore";

export const SearchFood = () => {
  const [searchText, setSearchText] = useState("");
  const [getFood, setGetFood] = useState([]);
  const [getCode, setGetCode] = useState("");
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      let response = await fetchFood(searchText);
      setGetFood(response);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function onSubmit() {
    setIsLoading(true);
    getData();
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  if (isError) {
    return <div>Erreur : que ce t'a fait</div>;
  }

  console.log(getFood);

  return (
    <div className="flex flex-col items-center w-full">
      <form action={onSubmit}>
        <input
          name="food_name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Recherche</button>
      </form>

      <div className="w-full grid justify-center gap-4 grid-cols-[repeat(auto-fit,100%)] md:grid-cols-[repeat(auto-fit,40rem)]">
        {searchText && getFood.products?.map((product, index) =>
          product.product_name_fr && (
            <label
              htmlFor={product.id}
              className="
                block box-content p-4 rounded-[10px] cursor-pointer border-2 border-solid border-transparent
                has-[>input:checked]:border-[#E1DCCF]
              "
              key={index}
              onClick={() => setGetCode(product.code)}
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
    </div>
  );
};
