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

  // console.log(getFood.products[0].code);
  console.log(getCode);

  return (
    <>
      <form action={onSubmit}>
        <input
          name="food_name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Recherche</button>
      </form>

      <div className="card-wrapper">
        {searchText &&
          getFood.products?.map((product, index) => (
            <label
              htmlFor={product.id}
              className="product-card"
              key={index}
              onClick={() => setGetCode(product.code)}
            >
              <input type="checkbox" id={product.id} name={product.id} />
              <div className="product-detail">
                <div className="flex flex-row jc-center">
                  <div className="img-wrapper">
                    <img src={product.image_url} />
                  </div>

                  <div className="product-name">{product.product_name}</div>
                </div>

                <div>
                  <Nutriscore nutriscore={product.nutrition_grades} />
                </div>
              </div>
            </label>
          ))}
      </div>
    </>
  );
};
