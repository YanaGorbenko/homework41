import axios from 'axios';
const api = axios.create({
  baseURL: 'https://dummyjson.com/products',
});
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
}

export const getProducts = async (searchWord: string) => {
  const url = searchWord ? '/search' : '/';

  const { data } = await api.get<{ products: Product[] }>(url, {
    params: searchWord ? { q: searchWord.trim() } : undefined,
  });

  return data;
};
