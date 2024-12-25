import Product from "./Product";

type Cart = {
  id: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  createdAt: Date;
  updateItem: (product: Product, quantity: number) => void;
};

export default Cart;