import ProductDetail from "./components/ProductDetail";
import Product from "./types/Product";

export default function Home() {
  const products: Product[] = [
    {
      id: "100012",
      title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
      description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
      price: 60588,
      listingPrice: 67320,
      stock: 5,
      salesUnit: "group",
      measurementUnit: "pallet",
      unitValue: 198,
    },
    {
      id: "2060",
      title: "Cerámico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
      description:
        "Cerámica esmaltada 36x36, terminación brillante, transito medio, liso, Colores disponibles: Negro",
      price: 13031,
      stock: 5,
      salesUnit: "area",
      measurementUnit: "m2",
      unitValue: 2.68,
    },
    {
      id: "10035",
      title: "Hierro 25 mm x 12 m Acindar",
      description: "HIERRO 25 MM X 12M",
      price: 76293,
      listingPrice: 89757,
      stock: 5,
      salesUnit: "unit",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-5 mt-12">
      {products.map((product) => (
        <ProductDetail product={product}></ProductDetail>
      ))}
    </div>
  );
}
