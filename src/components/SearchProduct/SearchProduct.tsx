import React, { useEffect, useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { ProductCard } from "../Productcard/Productcard";
import { BeatLoader } from "react-spinners";
import { fetchProducts } from "../../data/fetchProducts";
import { Product } from "../../Type/ProductType";
import { useSelectableList } from "@/hooks/useSelectableList";
import ProductComparator from "../ProductComparator";

export const SearchProduct = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedItems, toggleItem, isSelected } = useSelectableList<Product>();

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

  console.log(products);
  

  return (
    <>
      <header className="w-full sticky top-0 bg-white py-8 px-4">
        <SearchForm
          onSubmit={onSubmit}
          value={searchText}
          onChangeFn={(e) => setSearchText(e.target.value)}
        />
        {selectedItems.length > 1 && <ProductComparator productsSelected={selectedItems} />}
      </header>

      <div className="flex flex-col items-center w-full gap-16 px-4">
        <ProductCard searchText={searchText} getProducts={products} isSelected={isSelected} handleChange={handleChange} />
      </div>
    </>
  );
};
