import { useState, useEffect } from 'react';
import { getProducts, type Product } from '../../services/productsApi';
import { ProductSearchForm } from '../ProductSearchForm/ProductSearchForm';
import { ProductsList } from '../ProductList/ProductList';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (searchWord: string) => {
    setSearchQuery(searchWord);
  };

  useEffect(() => {
    const showProducts = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setNoResults(false);
        const options = searchQuery ? { searchQuery } : {};
        const { products } = await getProducts(options);
        if (products.length === 0) {
          setNoResults(true);
        }
        setProducts(products);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    showProducts();
  }, [searchQuery]);
  return (
    <>
      <h1>Список продуктів</h1>
      <ProductSearchForm onSearch={handleSearch} />
      <ProductsList products={products} />
      {isLoading && <p>LOADING...</p>}
      {isError && <p>Opps! It's error!</p>}
      {noResults && <p>Результатів не знайдено</p>}
    </>
  );
};
