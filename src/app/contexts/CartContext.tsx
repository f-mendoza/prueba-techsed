"use client";
import Cart from "../types/Cart";
import { createContext, useState, useContext } from "react";
import Product from "../types/Product";

// Declaro el contexto del carrito
const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Creo un "wrapper" del carrito como un componente renderizado por el cliente, asi puedo
  // utilizar React Context en el layout, un componente renderizado por el servidor
  const [cart, setCart] = useState<Cart>({
    id: crypto.randomUUID(),
    items: [],
    createdAt: new Date(),
  });

  const updateItem = (product: Product, quantity: number) => {
    let idx = cart.items.findIndex((item) => item.product === product);

    let updatedItems;

    if (idx !== -1) {
      // Update existing item
      updatedItems = [...cart.items];
      updatedItems[idx].quantity = quantity;
    } else {
      // Add new item
      updatedItems = [...cart.items, { product, quantity }];
    }
    setCart({
      id: cart.id,
      items: updatedItems,
      createdAt: cart.createdAt,
    });
  };

  return (
    <CartContext.Provider value={{ ...cart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  // Para utilizar el contexto dentro del componente que necesite
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart tiene que ser usado dentro de un CartProvider");
  }
  return context;
};
