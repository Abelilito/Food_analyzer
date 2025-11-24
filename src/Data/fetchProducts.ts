export const fetchProducts = async (searchText: string) => {
  try {
    const response = await fetch(
      "https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&search_terms=" +
        searchText +
        "&sort_by=Popularity&page_size=20",
      {
        method: "GET",
        headers: {
          "User-Agent": "FoodAnalyzer/0.1 (ilitoabel@gmail.com)",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};
