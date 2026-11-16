'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem('cart') || '[]')); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem('cart', JSON.stringify(items)); } catch {} }, [items]);

  const add = (product, color, size) => setItems((cur) => {
    const key = `${product.id}|${color}|${size}`;
    const found = cur.find((i) => i.key === key);
    return found ? cur.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)) : [...cur, { key, product, color, size, qty: 1 }];
  });
  const remove = (key) => setItems((cur) => cur.filter((i) => i.key !== key));
  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.qty * i.product.price, 0);
  return <CartContext.Provider value={{ items, add, remove, count, total }}>{children}</CartContext.Provider>;
}
