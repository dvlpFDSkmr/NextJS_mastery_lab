import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import styles from "../../styles/Product.module.css";
import ProductCard from "@/components/ProductCard";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [category, setcategory] = useState<string>("all");
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
          return;
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

  const filteredProducts: Product[] = products.filter((product) => {
    const inputFilter: boolean = product.title.toLowerCase().includes(searchInput.trim().toLowerCase());
    const categoryFilter: boolean = category === "all" ? true : product.category === category;

    return inputFilter && categoryFilter;
  });

  function handleClick() {
    setSearchInput("");
    setcategory("all");
  }

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
    <div>
      <div className={styles.filterSection}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
        />
        <select name="category" value={category} onChange={(e) => setcategory(e.target.value)}>
          <option value="all">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="groceries">Groceries</option>
          <option value="furniture">Furniture</option>
        </select>

        <button onClick={handleClick}>Clear All Filters</button>
      </div>

      <div className={styles.products}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)
        ) : (
          <h1>No products found...</h1>
        )}
      </div>
    </div>
  );
}

export default Products;
