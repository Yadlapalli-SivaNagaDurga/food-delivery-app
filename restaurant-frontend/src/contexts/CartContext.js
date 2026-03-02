import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart")) || {};
      setCart(stored);
    } catch (e) {
      setCart({});
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(stored);
    } catch (e) {
      setOrders([]);
    }
  }, []);

  const normalizeId = (item) => {
    return item.id ?? item._id ?? item.foodItemId ?? Math.random().toString(36).slice(2);
  };

  const addItem = (item) => {
    setCart((prev) => {
      const updated = { ...prev };
      const id = normalizeId(item);

      if (updated[id]) {
        updated[id].qty += 1;
      } else {
        updated[id] = { ...item, id, qty: 1 };
      }

      return updated;
    });
  };

  const decreaseItem = (itemId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;

      if (updated[itemId].qty <= 1) {
        delete updated[itemId];
      } else {
        updated[itemId].qty -= 1;
      }

      return updated;
    });
  };

  const clearCart = () => setCart({});

  // Place an order: record it locally (and later backend can sync)
  const placeOrder = ({ userEmail, items, totalAmount }) => {
    const id = `ORD_${Date.now().toString(36)}`;
    const order = {
      id,
      userEmail: userEmail || localStorage.getItem("userEmail") || "guest@example.com",
      items: items || Object.values(cart || {}),
      totalAmount: typeof totalAmount === "number" ? totalAmount : (items || Object.values(cart || {})).reduce((s, i) => s + (i.qty || 0) * (Number(i.price) || 0), 0),
      status: "PLACED",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => {
      const next = [order, ...prev];
      try {
        localStorage.setItem("orders", JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      try {
        window.dispatchEvent(new Event("ordersUpdated"));
      } catch (e) {
        // ignore
      }
      return next;
    });

    // keep cart persistence/clearing to caller
    return order;
  };

  const updateOrder = (id, changes) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, ...changes } : o));
      try {
        localStorage.setItem("orders", JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      try {
        window.dispatchEvent(new Event("ordersUpdated"));
      } catch (e) {}
      return next;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, decreaseItem, clearCart, orders, placeOrder, updateOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
