import type { Product } from "@/types/product";
import Image from "next/image";
import styles from "@/styles/Card.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { title, price, category, thumbnail, rating } = product;
  const cartCTX = useContext(CartContext)
  const router = useRouter();

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
        <button type="button" onClick={()=>router.push(`/products/${product.id}`)}>Details</button>
        <button onClick={()=> cartCTX?.addToCart(product)} type="button" >Add to Cart</button>
      </div>
    </div>
  );
}
