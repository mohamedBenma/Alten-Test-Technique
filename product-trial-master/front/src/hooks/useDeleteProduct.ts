import axios from "axios";
import { useState } from "react";

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api_url = process.env.REACT_APP_API_URL;

  const deleteProduct = async (id: number) => {
    console.log("Deleting product with ID:", id);
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${api_url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
};
