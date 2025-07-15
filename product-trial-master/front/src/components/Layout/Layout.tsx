
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';

const Layout = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const { wishlist, addToWishList, removeFromWishList } = useWishlist();
    const { deleteProduct } = useDeleteProduct();
    const navigate = useNavigate();
  

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
    return;
  }
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header
  cart={cart}
  wishlist={wishlist}
  onRemoveFromWishlist={removeFromWishList}
/>
      <div className="flex flex-1">
        <div className="w-1/5 border-r border-gray-300">
          <Sidebar />
        </div>
         <div className=" p-4 overflow-auto">
          <div className=" p-4 overflow-auto">
 <Outlet context={{
            cart,
            addToCart,
            removeFromCart,
            wishlist,
            addToWishList,
            removeFromWishList,
            deleteProduct
          }} />        </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
