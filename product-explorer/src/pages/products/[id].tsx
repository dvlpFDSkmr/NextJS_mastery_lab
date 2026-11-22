import { useRouter } from "next/router";
import type { Product } from "../../types/product";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Dynamic.module.css";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [retry, setRetry] = useState<number>(0);
  const router = useRouter();
  const cartCTX = useContext(CartContext)

  useEffect(() => {
    async function getProductData() {
      setIsLoading(true);
      setError(false);
      try {
        const apiResponse = await fetch(`https://dummyjson.com/products/${router.query.id}`);
        const data = await apiResponse.json();
        if (!apiResponse.ok) {
          setIsLoading(false);
          setError(true);
        }
        setIsLoading(false);
        setProduct(data);
      } catch {
        setIsLoading(false);
        setError(true);
        throw new Error(`fetching error`);
      }
    }

    getProductData();
  }, [retry, router.query.id]);

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

  if (!product) {
    return <p>Loading...</p>; // Ya tumhara <Loading /> component
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image src={product.thumbnail} alt={product.title} width={500} height={500} />
      </div>
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{product.title}</h1>
        {product.tags && product.tags.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", color:"blue" }}>
            {product.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        ) : (
          <p>No tags...</p>
        )}
        <p className={styles.price}>${product.price}</p>
        <p>
          Warrenty : <i>{product.warrantyInformation}</i>
        </p>
        <p className={styles.description}>{product.description}</p>
        {/* Pehle check karo ki reviews exist karte hain ya nahi */}
        {product.reviews && product.reviews.length > 0 ? (
          <div>
            <h3>Reviews :: </h3>
            {product.reviews.map((review, index) => (
              <div key={index} className={styles.reviewBOX}>
                <p>
                  <strong>Rating:</strong> {review.rating} ⭐
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
                <p>
                  <strong>By:</strong> {review.reviewerName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
        <button className={styles.button} onClick={()=>cartCTX?.addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
