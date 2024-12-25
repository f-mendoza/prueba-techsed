import { ShoppingCart } from "lucide-react";
import Drawer from "./Drawer";

function Header() {
  return (
    <header className="bg-blue-900 flex w-full h-20 border-bottom shadow-xl flex items-center justify-end">
      <button className="border border-blue-500 hover:bg-blue-500 mr-8 p-2 rounded-full">
        <ShoppingCart color="#fff" />
        <Drawer open={true} />
      </button>
    </header>
  );
}

export default Header;
