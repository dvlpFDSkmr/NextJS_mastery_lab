import { createContext } from "react";
import type { Product } from "../types/product";

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

const CartContext = createContext<CartContextType | null>(null);

export default CartContext;
