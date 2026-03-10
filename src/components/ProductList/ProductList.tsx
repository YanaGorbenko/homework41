import { type Product } from '../../services/productsApi';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <h3>{product.title}</h3>
        </li>
      ))}
    </ul>
  );
};
