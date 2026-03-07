import { useState, useEffect } from 'react';
import {
  getProducts,
  type Product,
  searchProducts,
} from '../../services/productsApi';
import { ProductSearchForm } from '../ProductSearchForm/ProductSearchForm';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const showSearchProducts = async (searchWord: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setNoResults(false);
      const { products } = await searchProducts(searchWord);
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

  useEffect(() => {
    const showProducts = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        console.log('✅ isLoading = true');
        const { products } = await getProducts();
        setProducts(products);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
        console.log('✅ isLoading = false');
      }
    };
    showProducts();
  }, []);
  return (
    <>
      <h1>Список продуктів</h1>
      <ProductSearchForm onSearch={showSearchProducts} />
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul>
      {isLoading && <p>LOADING...</p>}
      {isError && <p>Opps! It's error!</p>}
      {noResults && <p>Результатів не знайдено</p>}
    </>
  );
};
