// import { type Product, } from '../../services/productsApi';

interface Props {
  onSearch: (searchWord: string) => void;
}

export const ProductSearchForm = ({ onSearch }: Props) => {
  const searchProduct = (formData: FormData) => {
    const product = formData.get('product-title') as string;
    if (!product.trim()) {
      return;
    }
    onSearch(product);
  };

  return (
    <form action={searchProduct}>
      <input type="text" name="product-title" />
      <button className="form-button">Пошук</button>
    </form>
  );
};
