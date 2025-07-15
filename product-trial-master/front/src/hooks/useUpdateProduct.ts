import { useState } from "react";
import axios from "axios";
import { ProductFormValues } from "../types/ProductFormValues";

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api_url = process.env.REACT_APP_API_URL;

  const updateProduct = async (id: number, product: ProductFormValues) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      await axios.patch(`${api_url}/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
};
