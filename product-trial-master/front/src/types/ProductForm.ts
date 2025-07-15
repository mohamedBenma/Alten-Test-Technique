import { Product } from "./Product";

export interface ProductForm{
     initialData?: Omit<Product, 'id'>;
      onSubmit: (data: Omit<Product, 'id'>) => void;
}