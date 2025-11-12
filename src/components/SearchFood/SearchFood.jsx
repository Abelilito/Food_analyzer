import React, { useEffect, useState } from "react";
import { fetchFood } from "../../Data/GetFood";
import { SearchForm } from "../SearchForm/SearchForm";
import { FoodCard } from "../FoodCard/FoodCard";

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
    return <div className="flex justify-center">Chargement...</div>;
  }
  if (isError) {
    return <div className="flex justify-center">Erreur : que ce t'a fait</div>;
  }

  console.log(getFood.getProducts);

  return (
    <>
      <header className="w-full sticky top-0 bg-white py-8 px-4">
        <SearchForm  formAction={onSubmit} value={searchText} onchangeFn={(e) => setSearchText(e.target.value)}/>
      </header>
      
      <div className="flex flex-col items-center w-full gap-16 px-4">
        <FoodCard searchText={searchText} getProducts={getFood.products}/>
      </div>
    </>
  );
};
