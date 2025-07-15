import { useForm } from "react-hook-form";

type ContactFormData = {
  email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Contact</h2>

      {isSubmitSuccessful && (
        <p className="text-green-600 mb-4">
          Demande de contact envoyée avec succès.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Champ email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "L'email est requis" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Champ message */}
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            rows={5}
            {...register("message", {
              required: "Le message est requis",
              maxLength: {
                value: 300,
                message: "Le message ne doit pas dépasser 300 caractères",
              },
            })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
