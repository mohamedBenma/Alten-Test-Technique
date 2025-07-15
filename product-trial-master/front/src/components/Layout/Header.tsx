import { Item } from "../../types/Item";
import ShoppingCart from "./ShoppingCart";
import WishList from "./WishList";

const Header = ({
  cart,
  wishlist,
  onRemoveFromWishlist
}: {
  cart: Item[];
  wishlist: Item[];
  onRemoveFromWishlist: (id: number) => void;
}) => {
  return (
    <header className="flex items-center justify-between h-24 px-6 border-b border-gray-200">
      <img src="/assets/logo_alten.png" alt="logo" className="w-24" />
      <h1 className="text-2xl font-bold">ALTEN SHOP</h1>
      <WishList items={wishlist} onRemove={onRemoveFromWishlist} />
      <ShoppingCart selectedItems={cart} />
    </header>
  );
};

export default Header;
