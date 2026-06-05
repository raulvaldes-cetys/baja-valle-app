import { useContext, createContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

interface ProductCartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setProductQuantity: (productId: string, quantity: number) => void;
}

export const ProductCartContext = createContext<ProductCartContextType | undefined>(undefined);

export function ProductCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const setProductQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, Quantity: quantity } : item
      )
    );
  };

  return (
    <ProductCartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, setProductQuantity }}>
      {children}
    </ProductCartContext.Provider>
  );
}

export function useProductCart() {
  const context = useContext(ProductCartContext);
  if (!context) {
    throw new Error("useProductCart must be used within a ProductCartProvider");
  }
  return context;
}