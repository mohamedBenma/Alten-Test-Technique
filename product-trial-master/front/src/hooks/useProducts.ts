import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Product } from "../types/Product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const api_url = process.env.REACT_APP_API_URL;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<Product[]>(`${api_url}/products`);
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;
