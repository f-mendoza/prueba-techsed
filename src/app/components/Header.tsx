"use client";
import { ShoppingCart } from "lucide-react";
import Drawer from "./Drawer";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const handleClose = () => setOpen(false);
  return (
    <header className="bg-blue-900 flex w-full h-20 border-bottom shadow-xl flex items-center justify-end fixed top-0">
      <button
        className="border border-blue-500 bg-blue-700 hover:bg-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-8"
        onClick={() => setOpen(true)}
        data-action="open-cart"
      >
        <ShoppingCart color="#fff" />
        <span className="absolute top-100 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
          {cart.items.length}
        </span>
      </button>

      <Drawer open={open} onClose={handleClose} />
    </header>
  );
}

export default Header;
