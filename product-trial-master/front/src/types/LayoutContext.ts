import { Item } from './Item';

export type LayoutContextType = {
  addToCart: (item: Item) => void;
  addToWishList: (item: Item) => void;
  cart: Item[];
  wishlist: Item[];
  removeFromWishList: (id: number) => void;
  removeFromCart: (id: number) => void;
  deleteProduct: (id: number) => Promise<any>;
};

