import { useState } from "react";
import axios from "axios";
import { ProductFormValues } from "../types/ProductFormValues";

export const useAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api_url = process.env.REACT_APP_API_URL;

  const addProduct = async (product: ProductFormValues) => {
    console.log("Adding product hook:", product);
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      await axios.post(`${api_url}/products`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de l’ajout");
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error };
};
