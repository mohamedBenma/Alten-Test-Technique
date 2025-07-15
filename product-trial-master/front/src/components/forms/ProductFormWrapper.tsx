import ProductForm from './ProductForm';
import { useAddProduct } from '../../hooks/useAddProduct';
import { useUpdateProduct } from '../../hooks/useUpdateProduct';
import { ProductFormValues } from '../../types/ProductFormValues';

type Props = {
  mode: 'create' | 'edit';
  initialData?: ProductFormValues;
  onSuccess: () => void; 
};

const ProductFormWrapper = ({ mode, initialData, onSuccess }: Props) => {
  console.log('ProductFormWrapper rendered with mode:', mode, 'and initialData:', initialData);
  const { addProduct } = useAddProduct();
  const { updateProduct } = useUpdateProduct();

  const handleSubmit = async (data: ProductFormValues) => {
     const defaultValues = {
    ...data,
    shellId: 15,
    internalReference: 'REF-123-456',
    rating: 3,
  };
    if (mode === 'create') {
      console.log('Submitting new product:', data);
      await addProduct(defaultValues);
    } else if (mode === 'edit' && initialData) {
      console.log('Updating product:', data);
      await updateProduct(initialData.id!, data);
    }

    onSuccess();
  };

  return <ProductForm initialData={initialData} onSubmit={handleSubmit} />;
};

export default ProductFormWrapper;
