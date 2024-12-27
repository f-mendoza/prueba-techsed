type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  listingPrice?: number;
  stock: number;
  salesUnit: "group" | "unit" | "area";
  measurementUnit?: "m2" | "m" | "pallet" | "bolson";
  imagePath?: string; // Path de una imagen del producto
  unitPrice?: number; // Precio unitario del producto
  unitValue?: number;
};

export default Product;
