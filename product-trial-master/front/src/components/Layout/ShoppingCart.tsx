import { useEffect, useRef, useState } from "react";
import { Item } from "../../types/Item";
import { Badge } from 'primereact/badge';

type CartItem = Item & { quantity: number };

const ShoppingCart = ({ selectedItems }: { selectedItems: Item[] }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const removeItem = (id: number) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found && found.quantity > 1) {
        return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  useEffect(() => {
    const map = new Map<number, CartItem>();
    selectedItems.forEach(item => {
      if (map.has(item.id)) {
        map.get(item.id)!.quantity += 1;
      } else {
        map.set(item.id, { ...item, quantity: 1 });
      }
    });
    setItems(Array.from(map.values()));
  }, [selectedItems]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        setBtnClicked(false);
      }
    };
    if (btnClicked) {
      window.addEventListener("pointerdown", handlePointerDown);
    }
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [btnClicked]);

  return (
    <>
      {btnClicked && (
        <div
          ref={cartRef}
          className="fixed top-0 right-0 w-80 bg-white shadow-lg p-4 z-50"
        >
          <h2 className="text-lg font-bold mb-4">Mon Panier</h2>
          <ul>
            {items.length === 0 ? (
              <li className="text-gray-500">Votre panier est vide</li>
            ) : (
              items.map((item) => (
                <li key={item.id} className="flex justify-between mb-2 items-center">
                  <span>{item.name}</span>
                  <span>{item.price} €</span>
                  <span>x{item.quantity}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                  >
                    {item.quantity > 1 ? (
                      <i className="pi pi-minus"></i>
                    ) : (
                      <i className="pi pi-trash"></i>
                    )}
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="mt-4">
            <span className="font-bold">
              Total:{" "}
              {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}{" "}
              €
            </span>
            <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
              Commander
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setBtnClicked(true)}>
        <div className="relative inline-block ">
          <i className="pi pi-shopping-cart text-4xl mr-3"></i>
          <Badge
            value={items.reduce((sum, i) => sum + i.quantity, 0)}
            severity="success"
            className="absolute -top-2 -right-2 ml-2"
          />
        </div>
        <span className="sr-only">Open shopping cart</span>
      </button>
    </>
  );
};

export default ShoppingCart;
