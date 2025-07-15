import { useState, useRef, useEffect } from 'react';
import { Item } from '../../types/Item';
import { Badge } from 'primereact/badge';

const WishList = ({ items, onRemove }: { items: Item[], onRemove: (id: number) => void }) => {
  const [open, setOpen] = useState(false);
  const wishlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div ref={wishlistRef} className="fixed top-0 right-0 w-80 bg-white shadow-lg p-4 z-50">
          <h2 className="text-lg font-bold mb-4">Ma Liste d'envies</h2>
          <ul>
            {items.length === 0 ? (
              <li className="text-gray-500">Votre liste est vide</li>
            ) : (
              items.map(item => (
                <li key={item.id} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <button onClick={() => onRemove(item.id)}>
                    <i className="pi pi-trash text-red-600"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <button onClick={() => setOpen(true)}>
        <div className="relative inline-block">
          <i className="pi pi-heart text-3xl"></i>
          <Badge
            value={items.length}
            severity="info"
            className="absolute -top-2 -right-2"
          />
        </div>
        <span className="sr-only">Open wishlist</span>
      </button>
    </>
  );
};

export default WishList;
