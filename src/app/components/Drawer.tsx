"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const cart = useCart();
  const [total, setTotal] = useState(0);
  const priceFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const [items, setItems] = useState(<></>);
  useEffect(() => {
    setItems(
      <>
        {cart.items.map((item) => {
          return (
            <tr
              className="w-full border-b"
              key={item.product.id}
              data-id={item.product.id}
            >
              <td className="pl-4 pb-3">
                <div className="flex flex-col text-left mt-2">
                  <h2 className="text-sm font-semibold">
                    {item.product.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    X{item.quantity} - {priceFormat.format(item.product.price)}
                  </p>
                </div>
              </td>
              <td className="text-sm font-semibold pr-4">
                {priceFormat.format(item.quantity * item.product.price)}
              </td>
            </tr>
          );
        })}
      </>
    );

    setTotal(() => {
      let totalAmmount = 0;
      cart.items.map((item) => {
        totalAmmount += item.product.price * item.quantity;
      });
      return totalAmmount;
    });
  }, [cart.items]);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        open ? "" : "translate-x-full"
      }`}
      data-item="cart-drawer"
    >
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-semibold ml-4 text-left">Carrito de compras</h1>
        <button
          className="mr-4"
          onClick={() => onClose()}
          data-action="close-cart"
        >
          <X />
        </button>
      </div>

      <table className="mt-3 w-full" data-item="cart-table">
        <thead>
          <tr>
            <th className="text-left font-semibold pl-4">Producto</th>
            <th className="font-semibold pr-4">Subtotal</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
        <tfoot>
          <tr>
            <td className="font-bold pt-2 text-left pl-4">Total</td>
            <td className="font-bold pt-2 pr-4 text-center">
              {priceFormat.format(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Drawer;
