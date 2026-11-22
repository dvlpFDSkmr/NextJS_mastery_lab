import { createContext, useState, useCallback, useMemo } from "react";
import type { Product } from "../types/product";

// 1. Types
export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

export type CartProviderProps = { children: React.ReactNode };

// 2. Context Creation
export const CartContext = createContext<CartContextType | null>(null);

// 3. Provider Component
export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existingProd = prev.find((item) => item.product.id === product.id);

      if (existingProd) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
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
        .filter((item) => item.quantity > 0) // Quantity 0 hote hi item remove
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // Calculations
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // 4. Memoized Value
  const value: CartContextType = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [cartItems, itemCount, subtotal, addToCart, increaseQuantity, decreaseQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}