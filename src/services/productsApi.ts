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

  const baseUrl = 'https://dummyjson.com/products';
  const url = searchQuery?.trim() ? `${baseUrl}/search` : baseUrl;

  const params: Record<string, string> = {};
  if (searchQuery?.trim()) {
    params.q = searchQuery;
  }

  const { data } = await axios.get<{ products: Product[] }>(url, { params });
  return data;
};
