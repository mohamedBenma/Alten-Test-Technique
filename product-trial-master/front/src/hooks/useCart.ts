import { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "../types/Item";

export const useCart = () => {
  const [cart, setCart] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${api_url}/user/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } catch (err) {
        setError("Impossible de charger le panier");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCart();
  }, [token]);

  const addToCart = async (item: Item) => {
    try {
      await axios.post(
        "http://localhost:4000/user/cart/add",
        { productId: item.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prev) => [...prev, item]);
    } catch (err) {
      setError("Erreur lors de l'ajout au panier");
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await axios.post(
        "http://localhost:4000/user/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      setError("Erreur lors de la suppression du panier");
    }
  };

  return { cart, loading, error, addToCart, removeFromCart };
};
