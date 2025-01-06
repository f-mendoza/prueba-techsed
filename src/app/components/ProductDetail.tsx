"use client";

import Image from "next/image";
import UnitCounter from "./UnitCounter";
import GroupCounter from "./GroupCounter";
import AreaCounter from "./AreaCounter";
import Product from "../types/Product";
import { CircleCheck, CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import CounterProps from "../interfaces/CounterProps";

interface ProductProps {
  product: Product;
  className?: string;
}

const ProductDetail: React.FC<ProductProps> = ({ product, className }) => {
  const [quantity, setQuantity] = useState(0);
  const cart = useCart();
  const priceFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  // Si existe un listing price distinto al price del producto calculo el porcentaje de descuento de una oferta para mostrar el chip
  let offDiscount: number = 0;
  if (product.listingPrice) {
    offDiscount =
      100 - Number((product.price / product.listingPrice).toFixed(2)) * 100;
  }

  const handleQuantityUpdate = (value: number) => {
    if (value <= product.stock) {
      setQuantity(value);
      cart.updateItem(product, value);
    }
  };

  let counterProps: CounterProps = {
    value: quantity,
    stock: product.stock,
    measurementUnit: product.measurementUnit,
    unitValue: product.unitValue,
    className: "mt-3 lg:pl-4",
    onUpdate: handleQuantityUpdate,
  };

  let counters = {
    group: <GroupCounter {...counterProps} />,
    unit: <UnitCounter {...counterProps} />,
    area: <AreaCounter {...counterProps} />,
  };

  const renderCounter = () => {
    if (product.stock > 0) {
      return counters[product.salesUnit] ?? <></>;
    } else {
      return <></>;
    }
  };

  return (
    <div
      className={`${className} flex flex-col lg:flex-row border items-center w-3/4 md:w-1/2 py-5`}
      data-id={product.id}
    >
      {product.imagePath ? (
        // Si el producto tiene imagen lo cargo sino uso una por defecto
        <Image
          src={product.imagePath}
          width={1920}
          height={1080}
          className="w-full lg:w-80 h-auto max-w-60 object-contain pl-4"
          alt="Imagen"
        ></Image>
      ) : (
        <Image
          src="/no_image.jpg"
          width={1920}
          height={1080}
          className="w-full lg:w-80 h-auto max-w-60 object-contain pl-4"
          alt="Imagen"
        ></Image>
      )}

      <div className="flex flex-col items-center lg:items-start lg:pl-4 w-full">
        <p className="text-gray-400 text-xs self-start ml-4">
          SKU: {product.id}
        </p>
        <h2 className="text-xl font-semibold px-4">{product.title}</h2>
        <div className="flex items-center gap-1 text-sm mt-1 self-start ml-4">
          {/* Muestro si tengo stock o no del producto */}
          <p className="flex gap-3" data-item="stock">
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
        <div className="flex items-center mt-4 gap-1 self-start ml-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold">
              {priceFormat.format(product.price)}
            </span>
            {product.unitPrice !== undefined && (
              <span className="text-xs font-bold text-gray-600">
                PU: ${product.unitPrice}
              </span>
            )}
            {product.listingPrice !== undefined && (
              <span className="text-gray-400 line-through">
                {priceFormat.format(product.listingPrice)}
              </span>
            )}
          </div>

          {offDiscount > 0 && (
            // Muestro el descuento en un chip en caso de haberlo
            <span className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-lg">
              {offDiscount}% OFF
            </span>
          )}
        </div>

        {renderCounter()}

        <p className="text-gray-400 my-2 px-4">{product.description}</p>
        {product.stock > 0 ? (
          <>
            <button className="text-center bg-blue-900 text-white font-bold rounded-xl mb-3 py-2 w-5/6 lg:w-80 lg:self-start lg:ml-4 self-center">
              Comprar ahora
            </button>
            {cart.isInCart(product) ? (
              <button
                className="text-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-semibold rounded-xl py-2 mb-3 w-5/6 lg:w-80 lg:self-start lg:ml-4 self-center flex justify-center gap-2"
                onClick={() => handleQuantityUpdate(0)}
              >
                Eliminar del carrito <Trash2 />
              </button>
            ) : (
              <button
                className="text-center border border-blue-900 hover:bg-blue-900 hover:text-white transition-colors text-blue-900 font-semibold rounded-xl py-2 mb-3 w-5/6 lg:w-80 lg:self-start lg:ml-4 self-center flex justify-center gap-2"
                onClick={() => handleQuantityUpdate(1)}
              >
                Agregar al carrito <ShoppingCart />
              </button>
            )}
          </>
        ) : (
          <button
            className="text-center border border-gray-500 text-gray-500 font-normal rounded-xl py-2 mb-3 w-5/6 lg:w-80 lg:self-start lg:ml-4 self-center flex justify-center gap-2"
            disabled
          >
            Sin Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
