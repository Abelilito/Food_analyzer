// SearchFood.tsx
import React, { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { FoodCard } from "../FoodCard/FoodCard";
import { BeatLoader } from "react-spinners";
import { fetchFood } from "../../Data/getFood";
import { Product } from "../../Type/ProductType";

export const SearchFood = () => {
  const [searchText, setSearchText] = useState("");
  const [getFood, setGetFood] = useState<Product[]>([]);
  const [isError, setIsError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFood(searchText); 
      setGetFood(Array.isArray(response) ? response : response.products ?? []);
      setIsError(null);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#6d28d9" size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-2xl">
        Erreur : quelque chose s'est mal passé
      </div>
    );
  }

  return (
    <>
      <header className="w-full sticky top-0 bg-white py-8 px-4 flex flex-col items-center gap-8">
        <SearchForm
          onSubmit={onSubmit}
          value={searchText}
          onChangeFn={(e) => setSearchText(e.target.value)}
        />
        {/* {getFood.length > 0 && <Statistics />} */}
      </header>

      <div className="flex flex-col items-center w-full gap-16 px-4">
        <FoodCard searchText={searchText} getProducts={getFood} />
      </div>
    </>
  );
};
