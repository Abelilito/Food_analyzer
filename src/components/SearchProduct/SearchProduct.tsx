import React, { useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { BeatLoader } from "react-spinners";
import { Product } from "../../Type/ProductType";
import { useSelectableList } from "@/hooks/useSelectableList";
import ProductComparator from "../ProductComparator";
import { fetchProducts } from "@/Data/fetchProducts";
import Recommendation from "../Recommendation";
import { WrapperProductCard } from "../WrapperProductCard/WrapperProductCard";

export const SearchProduct = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedItems, toggleItem, isSelected } = useSelectableList<Product>();
  const unHealthy = selectedItems.find(item => item.nutriments.sugars > 10);
  const healthyProduct = products.find(item => item.nutriments.sugars < 10);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts(searchText); 
      setProducts(Array.isArray(response) ? response : response.products ?? []);
      setIsError(null);
    } catch (error) {
      setIsError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const checked = e.currentTarget.checked;
    const selectedItem = products.find((el) => el.id === id);
    
    if (!selectedItem) return;
    toggleItem(selectedItem, checked);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FEFDFC]">
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
  
  const recommendation = () => {
    if (selectedItems.length >= 1 && unHealthy) {
      if (!healthyProduct) return null;
      return (
        <Recommendation products={products} item={healthyProduct} />
      );
    }
  }
  
  return (
    <div>
      <header className="w-full sticky top-0 py-8 px-4 md:px-20 bg-[#FEFDFC] border border-solid border-b-[#F6EEE7]">
        <div className="flex justify-between flex-col md:flex-row gap-4">
          <img src="./logo.svg" className="w-[200px]" />
          <SearchForm
            onSubmit={onSubmit}
            onChangeFn={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 items-center">   
          {recommendation()}
          {selectedItems.length > 1 && <ProductComparator productsSelected={selectedItems} />}
        </div>
      </header>

      <div className="flex flex-col items-center w-full gap-16 px-4 bg-[#FEFDFC] py-8">
        <WrapperProductCard
          searchText={searchText}
          getProducts={products}
          isSelected={isSelected}
          handleChange={handleChange} 
        />
      </div>
    </div>
  );
};
