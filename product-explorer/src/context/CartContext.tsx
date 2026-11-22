import { useCallback, useMemo, useState } from "react";
import type { CartItem, CartContextType, CartProviderProps } from "./Cartcontext";
import type { Product } from "../types/product";
import CartContext from "./Cartcontext";

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existingProd = prev.find((item) => item.product.id === product.id);

      if (existingProd) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value : CartContextType  = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [cartItems, itemCount, subtotal, addToCart, increaseQuantity, decreaseQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
