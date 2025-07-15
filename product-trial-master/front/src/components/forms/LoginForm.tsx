import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      navigate("/home"); // Redirection après connexion réussie
    } catch {
      // Gestion de l'erreur déjà faite dans le hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded shadow space-y-4 mt-10">
      <h2 className="text-xl font-bold">Connexion</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "L'email est requis" })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Mot de passe"
          {...register("password", { required: "Le mot de passe est requis" })}
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
};

export default LoginForm;
