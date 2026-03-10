import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface GetProductsOptions {
  searchQuery?: string;
}

export const getProducts = async (options: GetProductsOptions = {}) => {
  const { searchQuery } = options;
  let url = 'https://dummyjson.com/products';
  if (searchQuery?.trim()) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
  }
  const { data } = await axios.get<{ products: Product[] }>(url);
  return data;
};
