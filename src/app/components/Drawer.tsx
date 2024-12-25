"use client";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

const Drawer: React.FC<{ open: boolean }> = ({ open }) => {
  const cart = useCart();
  const [items, setItems] = useState(<></>);
  useEffect(() => {
    console.log("El carrito fue actualizado");
    console.log(cart);
    setItems(
      <>
        {cart.items.map((item) => {
          return (
            <tr className="w-full border-b last:border-b-0">
              <td className="pl-4 pb-3">
                <div className="flex flex-col text-left mt-2">
                  <h2 className="text-sm font-semibold">
                    {item.product.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    X{item.quantity} {item.product.price}
                  </p>
                </div>
              </td>
              <td className="text-sm font-semibold">
                {item.quantity * item.product.price}
              </td>
            </tr>
          );
        })}
      </>
    );
  }, [cart.items]);
  console.log(cart);
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white">
      <h1 className="font-semibold ml-4 text-left mt-4">Carrito de compras</h1>
      <table className="mt-3 w-full">
        <thead>
          <tr>
            <th className="text-left font-semibold pl-4">Producto</th>
            <th className="font-semibold">Subtotal</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default Drawer;
