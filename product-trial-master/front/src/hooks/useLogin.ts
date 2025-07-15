import { useState } from "react";
import axios from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api_url = process.env.REACT_APP_API_URL;
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${api_url}/token`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      return token;
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur de connexion");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
