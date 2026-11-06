import React from 'react';
import { CartContext } from './cart-context';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats_cart', []);
  const [orders, setOrders] = useLocalStorage('campuseats_orders', []);

 
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id);
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prevCart, { item, qty: 1 }];
    });
  };

  const changeQty = (itemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            const newQty = line.qty + delta;
            return newQty > 0 ? { ...line, qty: newQty } : null;
          }
          return line;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
  };

  const placeOrder = (details) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      total,
      ...details
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}