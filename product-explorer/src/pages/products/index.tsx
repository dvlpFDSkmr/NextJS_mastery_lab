import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import styles from '../../styles/Product.module.css'
import ProductCard from "@/components/ProductCard";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [retry, setRetry] = useState<number>(0);

  useEffect(() => {
    async function getProductData() {
      setIsLoading(true);
      setError(false);
      try {
        const apiResponse = await fetch(`https://dummyjson.com/products`);
        const data = await apiResponse.json();
        if (!apiResponse.ok) {
          setIsLoading(false);
          setError(true);
        }
        setIsLoading(false);
        setProducts(data.products);
      } catch {
        setIsLoading(false);
        setError(true);
        throw new Error(`fetching error`);
      }
    }

    getProductData();
  }, [retry]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Error....</h1>
        <button onClick={() => setRetry((p) => p + 1)}>Retry</button>
      </div>
    );
  }

  return (
    <div className= {styles.products}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Products;
