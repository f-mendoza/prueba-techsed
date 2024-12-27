import ProductDetail from "./components/ProductDetail";
import Product from "./types/Product";

export default function Home() {
  const products: Product[] = [
    // Producto por pallet con stock
    {
      id: "100012",
      title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
      description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
      price: 60588,
      listingPrice: 67320,
      stock: 5,
      salesUnit: "group",
      measurementUnit: "pallet",
      imagePath: "/pallet.webp",
      unitPrice: 306,
      unitValue: 198,
    },
    // Producto por área con stock
    {
      id: "2060",
      title: "Cerámico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
      description:
        "Cerámica esmaltada 36x36, terminación brillante, transito medio, liso, Colores disponibles: Negro",
      price: 13031,
      stock: 5,
      salesUnit: "area",
      measurementUnit: "m2",
      imagePath: "/ceramico_azabache.webp",
      unitPrice: 651.55,
      unitValue: 2.68,
    },
    // Producto por unidad con stock
    {
      id: "10035",
      title: "Hierro 25 mm x 12 m Acindar",
      description: "HIERRO 25 MM X 12M",
      price: 76293,
      listingPrice: 89757,
      stock: 5,
      imagePath: "/hierro.webp",
      salesUnit: "unit",
    },
    // Producto por bolsa sin stock
    {
      id: "40001",
      title: "Cemento Portland 50kg",
      description: "Bolsa de cemento Portland de 50kg",
      price: 1000,
      listingPrice: 1200,
      stock: 0,
      salesUnit: "group",
      measurementUnit: "bolson",
      imagePath: "/cemento_portland.jpg",
      unitValue: 1,
    },

    // Producto por bolsa con stock
    {
      id: "40002",
      title: "Cemento Loma Negra 50kg",
      description: "Bolsa de cemento Loma Negra de 50kg",
      price: 1200,
      stock: 50,
      salesUnit: "group",
      measurementUnit: "bolson",
      imagePath: "/cemento_loma_negra.jpg",
      unitValue: 50,
    },
    // Producto por área sin stock
    {
      id: "2061",
      title: "Piso flotante 1,5m x 1,5m",
      description: "Caja de pisos flotantes, rendimiento de 2,25m2",
      price: 7000,
      stock: 0,
      salesUnit: "area",
      measurementUnit: "m2",
      imagePath: "/piso_flotante.jpg",
      unitValue: 2.25,
    },
    // Producto por metro lineal con stock
    {
      id: "30010",
      title: "Caño PVC 3 metros",
      description: "Caño de PVC, diámetro de 50mm, largo 3m",
      price: 500,
      stock: 10,
      salesUnit: "area",
      measurementUnit: "m",
      imagePath: "/cano_pvc.webp",
      unitValue: 3,
    },
    // Producto por pallet sin stock
    {
      id: "100013",
      title: "Ladrillo hueco 12cm x 18cm x 33cm (Pallet de 144u)",
      description: "Ladrillo hueco 12cm x 18cm x 33cm - Pallet: 144 unidades",
      price: 72000,
      stock: 0,
      salesUnit: "group",
      measurementUnit: "pallet",
      imagePath: "/pallet.webp",
      unitPrice: 500,
      unitValue: 144,
    },
  ];

  return (
    // En la pagina cargo todos los productos con el componente Product Detail
    <div className="flex flex-col items-center gap-5 mt-32">
      {products.map((product) => (
        <ProductDetail product={product} key={product.id}></ProductDetail>
      ))}
    </div>
  );
}
