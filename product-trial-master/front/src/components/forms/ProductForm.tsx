import { useForm } from 'react-hook-form';
import { ProductFormValues } from '../../types/ProductFormValues';
import { useEffect } from 'react';

type ProductFormProps = {
  initialData?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
};

const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormValues>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Nom du produit</label>
        <input
          {...register("name", { required: "Nom requis" })}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block">Description</label>
        <textarea
          {...register("description", { required: "Description requise" })}
          className="w-full border p-2 rounded"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block">Catégorie</label>
        <input
          {...register("category", { required: "Catégorie requise" })}
          className="w-full border p-2 rounded"
        />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
      <div>
        <label className="block">Code produit</label>
        <input
          {...register("code", { required: "Code requis" })}
          className="w-full border p-2 rounded"
        />
        {errors.code && <p className="text-red-500">{errors.code.message}</p>}
      </div>

      <div>
        <label className="block">Prix (€)</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: "Prix requis", valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block">Image (URL)</label>
        <input
          {...register("image", { required: "Image requise" })}
          className="w-full border p-2 rounded"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default ProductForm;
