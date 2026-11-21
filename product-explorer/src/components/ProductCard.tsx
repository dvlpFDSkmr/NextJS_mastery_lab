import type { Product } from "@/types/product";
import Image from "next/image";
import styles from "@/styles/Card.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { title, price, category, thumbnail, rating } = product;

  return (
    <div className={styles.productCard}>
      <Image src={thumbnail} alt={title} width={200} height={200} />
      <h4>{title}</h4>
      <p>Category: {category}</p>
      <p className={styles.price}>${price}</p>
      <p>
        Rating: <b>{rating}</b>
      </p>
      <div className={styles.btn}>
        <button type="button">Details</button>
        <button type="button">Add to Cart</button>
      </div>
    </div>
  );
}
