import { useOutletContext } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { Item } from '../types/Item';
import { LayoutContextType } from '../types/LayoutContext';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../types/JwtPayload';
import { useState } from 'react';
import { Product } from '../types/Product';
import { ProductFormValues } from '../types/ProductFormValues';
import ProductFormWrapper from '../components/forms/ProductFormWrapper';

const Products = () => {
  const {
    addToCart,
    wishlist,
    addToWishList,
    removeFromWishList
  } = useOutletContext<LayoutContextType>();

const { products, loading, error, refetch } = useProducts();

  const { deleteProduct } = useDeleteProduct();

  const isAdmin = jwtDecode<JwtPayload>(localStorage.getItem('token') || '').email === 'admin@admin.com';

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingProduct, setEditingProduct] = useState<ProductFormValues | undefined>(undefined);


  const isInWishlist = (id: number) => wishlist.some(item => item.id === id);

  const toggleWishlist = (item: Item) => {
    isInWishlist(item.id) ? removeFromWishList(item.id) : addToWishList(item);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    await refetch(); 
  };

  const handleEdit = (product: Product) => {
    setFormMode('edit');
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = async () => {
    await refetch();
    setShowForm(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setFormMode('create');
              setEditingProduct(undefined);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
                        <i className="pi pi-plus mr-2"></i>
 Ajouter un produit
          </button>
        </div>
      )}

      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-md relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        aria-label="Fermer"
      >
        <i className="pi pi-times text-xl" />
      </button>
      <ProductFormWrapper
        mode={formMode}
        initialData={editingProduct}
        onSuccess={handleFormSuccess}
      />
    </div>
  </div>
)}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => {
          const inWishlist = isInWishlist(product.id);

          return (
            <div key={product.id} className="border p-4 rounded shadow-md relative">
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => handleEdit(product)}>
                    <i className="pi pi-pencil text-blue-600 hover:text-blue-800"></i>
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    <i className="pi pi-trash text-red-500 hover:text-red-700"></i>
                  </button>
                </div>
              )}

              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
              <p className="font-semibold mt-2">{product.price} €</p>

              <div className="flex items-center gap-2 mt-4">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => addToCart(product)}
                >
                  Ajouter au panier
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="px-2 py-1 rounded-full"
                  title={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <i className={`pi ${inWishlist ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-500'} text-xl`} />
                </button>

                <span className="text-xs">Statut: {product.inventoryStatus}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
