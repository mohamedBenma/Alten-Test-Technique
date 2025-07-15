// hooks/useWishlist.ts
import { useEffect, useState } from "react";
import { Item } from "../types/Item";
import axios from "axios";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Item[]>([]);

  const token = localStorage.getItem("token");
  const api_url = process.env.REACT_APP_API_URL;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get<Item[]>(`${api_url}/user/wishlist`, {
        headers,
      });
      setWishlist(res.data);
    } catch (err) {
      console.error("Erreur récupération wishlist", err);
    }
  };

  const addToWishList = async (item: Item) => {
    try {
      await axios.post(
        "http://localhost:4000/user/wishlist/add",
        { productId: item.id },
        { headers }
      );
      setWishlist((prev) => [...prev, item]);
    } catch (err) {
      console.error("Erreur ajout wishlist", err);
    }
  };

  const removeFromWishList = async (id: number) => {
    try {
      await axios.post(
        "http://localhost:4000/user/wishlist/remove",
        { productId: id },
        { headers }
      );
      setWishlist((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Erreur suppression wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return {
    wishlist,
    addToWishList,
    removeFromWishList,
  };
};
