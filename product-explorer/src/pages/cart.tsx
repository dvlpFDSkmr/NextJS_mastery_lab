import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import styles from "../styles/Cart.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const cartCTX = useContext(CartContext);

  if (!cartCTX) return null;
  const { cartItems, subtotal, increaseQuantity, decreaseQuantity, clearCart } = cartCTX;

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Nothing here BUDDY !!</h1>
        <h5>
          Hit the road dude, do some <Link href="/products">Shopping</Link>{" "}
        </h5>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.product.id} className={styles.cartProd}>
          <Image src={item.product.thumbnail} alt={item.product.title} width={70} height={70}/>
          <h3>{item.product.title}</h3>
          <p>Price: ${item.product.price.toFixed(2)}</p>
          <p><i>Quantity: {item.quantity}</i></p>

          <button onClick={() => increaseQuantity(item.product.id)}>➕</button>
          <button onClick={() => decreaseQuantity(item.product.id)}>➖</button>
        </div>
      ))}

      <h2>Subtotal: ${subtotal}</h2>
      <div className={styles.cartActions}>
          <button onClick={clearCart}>Clear Cart</button>
          <button>Checkout</button>
      </div>
    </div>
  );
}
