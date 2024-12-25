"use client";

import Image from "next/image";
import UnitCounter from "./UnitCounter";
import GroupCounter from "./GroupCounter";
import AreaCounter from "./AreaCounter";
import Product from "../types/Product";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

interface ProductProps {
  product: Product;
  className?: string;
}

const ProductDetail: React.FC<ProductProps> = ({ product, className }) => {
  const [quantity, setQuantity] = useState(0);
  const cart = useCart();
  let offDiscount: number = 0;
  const priceFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  if (product.listingPrice) {
    // Calculo el porcentaje de descuento de una oferta para mostrar el chip
    offDiscount =
      100 - Number((product.price / product.listingPrice).toFixed(2)) * 100;
  }

  const handleQuantityUpdate = (value: number) => {
    setQuantity(value);
    let existe = false;
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].product == product) {
        console.log("Existe en el cart");
        cart.items[i].quantity = value;
        existe = true;
      }
    }

    if (!existe) {
      console.log("No existe en el cart, agregando...");
      cart.items = [...cart.items, { product: product, quantity: value }];
    }
    console.log(cart);
    console.log("Nuevo valor (" + product.title + ") : " + value);
  };

  return (
    <div className={`${className} flex border items-center w-1/2 py-5`}>
      <Image src="/pallet.webp" width={300} height={300} alt="Imagen"></Image>
      <div className="flex flex-col ml-8">
        <p className="text-gray-400 text-xs">SKU: {product.id}</p>
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <div className="flex items-center gap-1 text-sm mt-1">
          <p className="flex gap-3">
            {product.stock > 0 ? (
              <>
                <CircleCheck className="text-green-400" size={15} /> Stock
                disponible
              </>
            ) : (
              <>
                <CircleX className="text-red-400" size={15} /> Stock no
                disponible
              </>
            )}
          </p>
        </div>
        <div className="flex items-center mt-4 gap-1">
          <div className="flex flex-col">
            <span className="text-xl font-bold">
              {priceFormat.format(product.price)}
            </span>
            {product.unitValue !== undefined && (
              <span className="text-xs font-bold text-gray-600">
                PU: ${product.unitValue}
              </span>
            )}
            {product.listingPrice !== undefined && (
              <span className="text-gray-400 line-through">
                {priceFormat.format(product.listingPrice)}
              </span>
            )}
          </div>
          {offDiscount > 0 && (
            <span className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-lg">
              {offDiscount}% OFF
            </span>
          )}
        </div>
        {product.salesUnit === "group" && product.unitValue !== undefined ? (
          <GroupCounter
            unitsPerGroup={product.unitValue}
            maxStock={product.stock}
            onUpdate={handleQuantityUpdate}
            className="mt-3"
          />
        ) : product.salesUnit === "area" &&
          product.unitValue !== undefined &&
          product.measurementUnit !== undefined ? (
          <AreaCounter
            unit={product.measurementUnit}
            areaPerUnit={product.unitValue}
            onUpdate={handleQuantityUpdate}
            maxStock={product.stock}
            className="mt-3"
          />
        ) : (
          <UnitCounter
            value={0}
            maxUnits={product.stock}
            onUpdate={handleQuantityUpdate}
            minUnits={0}
            steps={1}
            className="mt-3"
          />
        )}

        <p className="text-gray-400 my-2">{product.description}</p>
        <button className="text-center bg-blue-900 text-white font-bold rounded-xl py-2 mb-3 w-80">
          Comprar ahora
        </button>
        <button className="text-center border border-blue-900 text-blue-900 font-bold rounded-xl py-2 mb-3 w-80">
          Eliminar del carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
