import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
}

export const getProducts = async () => {
  const { data } = await axios.get<{ products: Product[] }>(
    'https://dummyjson.com/products',
  );
  return data;
};

export const searchProducts = async (query: string) => {
  if (!query.trim()) {
    return { products: [] };
  }

  const { data } = await axios.get<{ products: Product[] }>(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
  );
  return data;
};
