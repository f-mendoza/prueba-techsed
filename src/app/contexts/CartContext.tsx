"use client";
import Cart from "../types/Cart";
import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Product from "../types/Product";

// Declaro el contexto del carrito
const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Creo un "wrapper" del carrito como un componente renderizado por el cliente, asi puedo
  // utilizar React Context en el layout, un componente renderizado por el servidor
  const [cart, setCart] = useState<Cart>({
    id: uuidv4(),
    items: [],
    createdAt: new Date(),
    // Declaro las funciones vacias en principio
    updateItem: (product: Product, quantity: number) => {},
    isInCart: (product: Product) => false,
  });

  // Agrega un producto al carrito si no existe con anterioridad,
  // Actualiza su cantidad en caso de estar,
  // Elimina del carrito en caso de que la cantidad sea 0
  const updateItem = (product: Product, quantity: number) => {
    let idx = cart.items.findIndex((item) => item.product === product);

    let updatedItems = [...cart.items];

    if (idx !== -1) {
      if (quantity > 0) {
        // Si el item existe, y la cantidad es > 0 actualizo la cantidad
        updatedItems[idx].quantity = quantity;
      } else {
        // Si la cantidad es <= a 0 entonces lo elimino del array
        updatedItems.splice(idx, 1);
      }
    } else {
      // Si el item no existe en el array, lo agrego solo si la cantidad > 0
      if (quantity > 0) updatedItems = [...cart.items, { product, quantity }];
    }
    setCart({
      id: cart.id,
      items: updatedItems,
      createdAt: cart.createdAt,
      updateItem: cart.updateItem,
      isInCart: cart.isInCart,
    });
  };

  // Devuelve true si el producto existe en el carrito
  const isInCart = (product: Product) => {
    let idx = cart.items.findIndex((item) => item.product === product);
    return idx !== -1;
  };

  // Agrego ambas funciones declaradas al state del carrito
  cart.updateItem = updateItem;
  cart.isInCart = isInCart;

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
    throw new Error(
      "No se encontró el Context: useCart tiene que ser usado dentro de un CartProvider"
    );
  }
  return context;
};
